import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from './ISettingsPersistence';

export class SettingsMemoryPersistence 
    extends IdentifiableMemoryPersistence<SettingsSectionV1, string> 
    implements ISettingsPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let idStarts = filter.getAsNullableString('id_starts');

        return function (item: SettingsSectionV1): boolean {
            if (search != null && !this.matchString(item.id, search))
                return false;
            if (id != null && id != item.id)
                return false;
            if (idStarts != null && !item.id.startsWith(idStarts))
                return false;
            return true;
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SettingsSectionV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async set(correlationId: string, item: SettingsSectionV1): Promise<SettingsSectionV1> {

        if (item == null) {
            return;
        }

        // Update time
        item.update_time = new Date();

        return await super.set(correlationId, item);
    }

    public async modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams): Promise<SettingsSectionV1> {

        let index = this._items.map((x) => { return x.id; }).indexOf(id);

        let item: SettingsSectionV1 = index >= 0 
            ? this._items[index] : new SettingsSectionV1(id);

        // Update parameters
        if (updateParams) {
            for (let key in updateParams) {
                if (updateParams.hasOwnProperty(key))
                    item.parameters.setAsObject(key, updateParams[key]);
            }
        }

        // Increment parameters
        if (incrementParams) {
            for (let key in incrementParams) {
                if (incrementParams.hasOwnProperty(key)) {
                    let increment = incrementParams.getAsLongWithDefault(key, 0);
                    let value = item.parameters.getAsLongWithDefault(key, 0);
                    value += increment;
                    item.parameters.setAsObject(key, value);
                }
            }
        }

        // Update time
        item.update_time = new Date();

        if (index < 0) this._items.push(item);

        this._logger.trace(correlationId, "Modified item by %s", id);

        await this.save(correlationId);

        return item;
    }
}
