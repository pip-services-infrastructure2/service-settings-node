import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from './ISettingsPersistence';
export declare class SettingsMongoDbPersistence extends IdentifiableMongoDbPersistence<SettingsSectionV1, string> implements ISettingsPersistence {
    constructor();
    private static mapToPublic;
    private static fieldFromPublic;
    private static mapFromPublic;
    protected convertToPublic(value: any): any;
    protected convertFromPublic(value: any): any;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SettingsSectionV1>>;
    set(correlationId: string, item: SettingsSectionV1): Promise<SettingsSectionV1>;
    modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams): Promise<SettingsSectionV1>;
}
