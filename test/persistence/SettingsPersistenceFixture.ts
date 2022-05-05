const assert = require('chai').assert;

import { ConfigParams, PagingParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';

import { SettingsSectionV1 } from '../../src/data/version1/SettingsSectionV1';
import { ISettingsPersistence } from '../../src/persistence/ISettingsPersistence';

export class SettingsPersistenceFixture {
    private _persistence: ISettingsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async testGetAndSet() {
        let settings = await this._persistence.set(
            null,
            new SettingsSectionV1(
                'test.1',
                ConfigParams.fromTuples(
                    'key1', 'value11',
                    'key2', 'value12'
                )
            )
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('value11', settings.parameters.getAsString('key1'));

        settings = await this._persistence.set(
            null,
            new SettingsSectionV1(
                'test.2',
                ConfigParams.fromTuples(
                    'key1', 'value21',
                    'key2', 'value22'
                )
            )
        );

        assert.isObject(settings);
        assert.equal('test.2', settings.id);
        assert.equal('value21', settings.parameters.getAsString('key1'));

        settings = await this._persistence.getOneById(
            null,
            'test.1'
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('value11', settings.parameters.getAsString('key1'));

        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'id_starts', 'test'
            ),
            null
        );

        assert.lengthOf(page.data, 2);
    }    

    public async testSetParameter() {
        let settings = await this._persistence.modify(
            null,
            'test.1',
            ConfigParams.fromTuples('key1', 'value11a'),
            null
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('value11a', settings.parameters.getAsString('key1'));

        settings = await this._persistence.modify(
            null,
            'test.1',
            ConfigParams.fromTuples('key1', 'value11b'),
            null
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('value11b', settings.parameters.getAsString('key1'));

        settings = await this._persistence.getOneById(
            null,
            'test.1'
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('value11b', settings.parameters.getAsString('key1'));

        settings = await this._persistence.modify(
            null,
            'test.1',
            ConfigParams.fromTuples('key1.key11', 'value11a'),
            null
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('value11a', settings.parameters.getAsString('key1.key11'));
    }

    public async testIncrementParameter() {
        let settings = await this._persistence.modify(
            null,
            'test.1',
            null,
            ConfigParams.fromTuples('key1', 1)
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('1', settings.parameters.getAsString('key1'));

        settings = await this._persistence.modify(
            null,
            'test.1',
            null,
            ConfigParams.fromTuples('key1', 2)
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('3', settings.parameters.getAsString('key1'));

        settings = await this._persistence.getOneById(
            null,
            'test.1'
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('3', settings.parameters.getAsString('key1'));
    }

    public async testGetSections() {
        let settings = await this._persistence.set(
            null,
            new SettingsSectionV1(
                'test.1',
                ConfigParams.fromTuples(
                    'key1', 'value11',
                    'key2', 'value12'
                )
            )
        );

        assert.isObject(settings);
        assert.equal('test.1', settings.id);
        assert.equal('value11', settings.parameters.getAsString('key1'));

        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams(0, 10, true)
        );

        assert.lengthOf(page.data, 1);
    }   

}
