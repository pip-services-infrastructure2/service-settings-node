import { SettingsFilePersistence } from '../../src/persistence/SettingsFilePersistence';
import { SettingsPersistenceFixture } from './SettingsPersistenceFixture';

suite('SettingsFilePersistence', ()=> {
    let persistence: SettingsFilePersistence;
    let fixture: SettingsPersistenceFixture;
    
    setup(async () => {
        persistence = new SettingsFilePersistence('./data/settings.test.json');

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