import { ConfigParams } from 'pip-services3-commons-nodex';

import { SettingsMongoDbPersistence } from '../../src/persistence/SettingsMongoDbPersistence';
import { SettingsPersistenceFixture } from './SettingsPersistenceFixture';

suite('SettingsMongoDbPersistence', ()=> {
    let persistence: SettingsMongoDbPersistence;
    let fixture: SettingsPersistenceFixture;

    setup(async () => {
        var MONGO_DB = process.env["MONGO_DB"] || "test";
        var MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "settings";
        var MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
        var MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
        var MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

        var dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );

        persistence = new SettingsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new SettingsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });

    test('Get and set', async () => {
        await fixture.testGetAndSet();
    });

    test('Set parameter', async () => {
        await fixture.testSetParameter();
    });

    test('Increment parameter', async () => {
        await fixture.testIncrementParameter();
    });

});