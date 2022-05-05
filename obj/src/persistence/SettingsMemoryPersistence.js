"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const SettingsSectionV1_1 = require("../data/version1/SettingsSectionV1");
class SettingsMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let idStarts = filter.getAsNullableString('id_starts');
        return function (item) {
            if (search != null && !this.matchString(item.id, search))
                return false;
            if (id != null && id != item.id)
                return false;
            if (idStarts != null && !item.id.startsWith(idStarts))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
    set(correlationId, item) {
        const _super = Object.create(null, {
            set: { get: () => super.set }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null) {
                return;
            }
            // Update time
            item.update_time = new Date();
            return yield _super.set.call(this, correlationId, item);
        });
    }
    modify(correlationId, id, updateParams, incrementParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this._items.map((x) => { return x.id; }).indexOf(id);
            let item = index >= 0
                ? this._items[index] : new SettingsSectionV1_1.SettingsSectionV1(id);
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
            if (index < 0)
                this._items.push(item);
            this._logger.trace(correlationId, "Modified item by %s", id);
            yield this.save(correlationId);
            return item;
        });
    }
}
exports.SettingsMemoryPersistence = SettingsMemoryPersistence;
//# sourceMappingURL=SettingsMemoryPersistence.js.map