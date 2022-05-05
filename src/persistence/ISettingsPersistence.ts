import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IGetter } from 'pip-services3-data-nodex';
import { ISetter } from 'pip-services3-data-nodex';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';

export interface ISettingsPersistence extends IGetter<SettingsSectionV1, string>, ISetter<SettingsSectionV1> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SettingsSectionV1>>;
    
    getOneById(correlationId: string, id: string): Promise<SettingsSectionV1>;
    
    set(correlationId: string, item: SettingsSectionV1): Promise<SettingsSectionV1>;

    modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams): Promise<SettingsSectionV1>;
}
