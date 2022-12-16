const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { SettingsMemoryPersistence } from '../../../src/persistence/SettingsMemoryPersistence';
import { SettingsController } from '../../../src/logic/SettingsController';
import { SettingsCommandableHttpServiceV1 } from '../../../src/services/version1/SettingsCommandableHttpServiceV1';

let restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SettingsCommandableHttpServiceV1', ()=> {
    let service: SettingsCommandableHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        service = new SettingsCommandableHttpServiceV1();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-settings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-settings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-settings', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

   
    test('CRUD Operations', async () => {
        // Create one section
        let parameters = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/settings/set_section',
                {
                    id: 'test.1',
                    parameters: ConfigParams.fromTuples(
                        'key1', 'value11',
                        'key2', 'value12'
                    )
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(parameters);
        assert.equal('value11', parameters.key1);

        // Create another section
        parameters = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/settings/modify_section',
                {
                    id: 'test.2',
                    update_parameters: ConfigParams.fromTuples(
                        'key1', 'value21'
                    ),
                    increment_parameters: ConfigParams.fromTuples(
                        'key2', 1
                    )
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(parameters);
        assert.equal('value21', parameters.key1);
        assert.equal('1', parameters.key2);

        // Get second section
        parameters = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/settings/get_section_by_id',
                {
                    id: 'test.2'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(parameters);
        assert.equal('value21', parameters.key1);
        assert.equal('1', parameters.key2);

        // Get all sections
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/settings/get_sections',
                null,
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get all section ids
        page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/settings/get_section_ids',
                null,
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    });

});