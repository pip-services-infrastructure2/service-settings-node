import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { SettingsMemoryPersistence } from './SettingsMemoryPersistence';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';

export class SettingsFilePersistence extends SettingsMemoryPersistence {
	protected _persister: JsonFilePersister<SettingsSectionV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<SettingsSectionV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}