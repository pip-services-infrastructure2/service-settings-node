import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from '../persistence/ISettingsPersistence';
import { ISettingsController } from './ISettingsController';
import { SettingsCommandSet } from './SettingsCommandSet';

export class SettingsController implements IConfigurable, IReferenceable, ICommandable, ISettingsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-settings:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(SettingsController._defaultConfig);
    private _persistence: ISettingsPersistence;
    private _commandSet: SettingsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ISettingsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new SettingsCommandSet(this);
        return this._commandSet;
    }

    public async getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<string>> {
        let page = await this._persistence.getPageByFilter(correlationId, filter, paging);

        let data = page != null ? page.data.map(d => d.id) : null;
        let result = new DataPage<string>(data, page.total);
        return result
    }

    public async getSections(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SettingsSectionV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getSectionById(correlationId: string, id: string): Promise<ConfigParams> {
        let item = await this._persistence.getOneById(correlationId, id);
        let parameters = item != null ? item.parameters : null;
        parameters = parameters || new ConfigParams();
        return parameters;
    }

    public async setSection(correlationId: string, id: string, parameters: ConfigParams): Promise<ConfigParams> {
        let item = new SettingsSectionV1(id, parameters);
        item = await this._persistence.set(correlationId, item);
        return item.parameters;
    }

    public async modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams): Promise<ConfigParams> {
        let item = await this._persistence.modify(correlationId, id, updateParams, incrementParams);
        return item.parameters;
    }
    
}
