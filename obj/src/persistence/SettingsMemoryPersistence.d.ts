import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from './ISettingsPersistence';
export declare class SettingsMemoryPersistence extends IdentifiableMemoryPersistence<SettingsSectionV1, string> implements ISettingsPersistence {
    constructor();
    private matchString;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SettingsSectionV1>>;
    set(correlationId: string, item: SettingsSectionV1): Promise<SettingsSectionV1>;
    modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams): Promise<SettingsSectionV1>;
}
