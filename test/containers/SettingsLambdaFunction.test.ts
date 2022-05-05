const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { SettingsLambdaFunction } from '../../src/container/SettingsLambdaFunction';

suite('SettingsLambdaFunction', ()=> {
    let lambda: SettingsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-settings:persistence:memory:default:1.0',
            'controller.descriptor', 'service-settings:controller:default:default:1.0'
        );

        lambda = new SettingsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        // Create one section
        let parameters = await lambda.act(
            {
                role: 'settings',
                cmd: 'set_section',
                id: 'test.1',
                parameters: ConfigParams.fromTuples(
                    'key1', 'value11',
                    'key2', 'value12'
                )
            }
        );

        assert.isObject(parameters);
        assert.equal('value11', parameters.key1);

        // Create another section
        parameters = await lambda.act(
            {
                role: 'settings',
                cmd: 'modify_section',
                id: 'test.2',
                update_parameters: ConfigParams.fromTuples(
                    'key1', 'value21'
                ),
                increment_parameters: ConfigParams.fromTuples(
                    'key2', 1
                )
            }
        );

        assert.isObject(parameters);
        assert.equal('value21', parameters.key1);
        assert.equal('1', parameters.key2);

        // Get second section
        parameters = await lambda.act(
            {
                role: 'settings',
                cmd: 'get_section_by_id',
                id: 'test.2'
            }
        );

        // Get all sections
        let page = await lambda.act(
            {
                role: 'settings',
                cmd: 'get_sections'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get all section ids
        page = await lambda.act(
            {
                role: 'settings',
                cmd: 'get_section_ids'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    });
});