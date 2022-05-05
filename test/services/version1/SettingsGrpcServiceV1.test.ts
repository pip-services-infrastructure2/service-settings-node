const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { SettingsMemoryPersistence } from '../../../src/persistence/SettingsMemoryPersistence';
import { SettingsController } from '../../../src/logic/SettingsController';
import { SettingsGrpcServiceV1 } from '../../../src/services/version1/SettingsGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SettingsGrpcServiceV1', ()=> {
    let service: SettingsGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        service = new SettingsGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-settings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-settings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-settings', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/settings_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).settings_v1.Settings;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', async () => {
        // Create one section
        let response = await new Promise<any>((resolve, reject) => {
            client.set_section(
                {
                    id: 'test.1',
                    parameters: ConfigParams.fromTuples(
                        'key1', 'value11',
                        'key2', 'value12'
                    )
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let parameters = response ? response.parameters : null;

        assert.isObject(parameters);
        assert.equal('value11', parameters.key1);

        // Create another section
        response = await new Promise<any>((resolve, reject) => {
            client.modify_section(
                {
                    id: 'test.2',
                    update_parameters: ConfigParams.fromTuples(
                        'key1', 'value21'
                    ),
                    increment_parameters: ConfigParams.fromTuples(
                        'key2', 1
                    )
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        parameters = response ? response.parameters : null;

        assert.isObject(parameters);
        assert.equal('value21', parameters.key1);
        assert.equal('1', parameters.key2);

        // Get second section
        response = await new Promise<any>((resolve, reject) => {
            client.get_section_by_id(
                {
                    id: 'test.2'
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        parameters = response ? response.parameters : null;

        assert.isObject(parameters);
        assert.equal('value21', parameters.key1);
        assert.equal('1', parameters.key2);

        // Get all sections
        response = await new Promise<any>((resolve, reject) => {
            client.get_sections(
                {
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let page = response ? response.page : null;

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get all section ids
        response = await new Promise<any>((resolve, reject) => {
            client.get_section_ids(
                {
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        page = response ? response.page : null;

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    });

});
