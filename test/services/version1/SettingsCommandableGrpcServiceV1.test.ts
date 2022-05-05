const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// let services = require('../../../../src/protos/settings_v1_grpc_pb');
// let messages = require('../../../../src/protos/settings_v1_pb');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { SettingsMemoryPersistence } from '../../../src/persistence/SettingsMemoryPersistence';
import { SettingsController } from '../../../src/logic/SettingsController';
import { SettingsCommandableGrpcServiceV1 } from '../../../src/services/version1/SettingsCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SettingsCommandableGrpcServiceV1', ()=> {
    let service: SettingsCommandableGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        service = new SettingsCommandableGrpcServiceV1();
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
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', async () => {
        // Create one section
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/settings.set_section',
                    args_empty: false,
                    args_json: JSON.stringify({
                        id: 'test.1',
                        parameters: ConfigParams.fromTuples(
                            'key1', 'value11',
                            'key2', 'value12'
                        )
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let parameters = JSON.parse(response.result_json);

        assert.isObject(parameters);
        assert.equal('value11', parameters.key1);

        // Create another section
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/settings.modify_section',
                    args_empty: false,
                    args_json: JSON.stringify({
                        id: 'test.2',
                        update_parameters: ConfigParams.fromTuples(
                            'key1', 'value21'
                        ),
                        increment_parameters: ConfigParams.fromTuples(
                            'key2', 1
                        )
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        parameters = JSON.parse(response.result_json);

        assert.isObject(parameters);
        assert.equal('value21', parameters.key1);
        assert.equal('1', parameters.key2);

        // Get second section
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/settings.get_section_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        id: 'test.2'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        parameters = JSON.parse(response.result_json);

        assert.isObject(parameters);
        assert.equal('value21', parameters.key1);
        assert.equal('1', parameters.key2);

        // Get all sections
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/settings.get_sections',
                    args_empty: false,
                    args_json: JSON.stringify({})
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get all section ids
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/settings.get_section_ids',
                    args_empty: false,
                    args_json: JSON.stringify({})
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        page = JSON.parse(response.result_json);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    });

});
