import { SettingsMemoryPersistence } from '../../src/persistence/SettingsMemoryPersistence';
import { SettingsPersistenceFixture } from './SettingsPersistenceFixture';

suite('SettingsMemoryPersistence', ()=> {
    let persistence: SettingsMemoryPersistence;
    let fixture: SettingsPersistenceFixture;
    
    setup(async () => {
        persistence = new SettingsMemoryPersistence();
        fixture = new SettingsPersistenceFixture(persistence);
        
        await persistence.open(null);
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