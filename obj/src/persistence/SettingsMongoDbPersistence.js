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
exports.SettingsMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class SettingsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('settings');
    }
    static mapToPublic(map) {
        if (map == null)
            return null;
        for (let field in map) {
            if (map.hasOwnProperty(field) && field.indexOf('_dot_') >= 0) {
                let value = map[field];
                field = field.replace('_dot_', '.');
                map[field] = value;
            }
        }
        return map;
    }
    static fieldFromPublic(field) {
        if (field == null)
            return null;
        field = field.replace('.', '_dot_');
        return field;
    }
    static mapFromPublic(map) {
        if (map == null)
            return null;
        for (let field in map) {
            if (map.hasOwnProperty(field) && field.indexOf('.') >= 0) {
                let value = map[field];
                field = field.replace('.', '_dot_');
                map[field] = value;
            }
        }
        return map;
    }
    // Convert object to JSON format
    convertToPublic(value) {
        if (value == null)
            return null;
        let parameters = SettingsMongoDbPersistence.mapToPublic(value.parameters);
        parameters = pip_services3_commons_nodex_1.ConfigParams.fromValue(parameters);
        value = {
            id: value._id,
            parameters: parameters,
            update_time: value.update_time
        };
        value = super.convertToPublic(value);
        return value;
    }
    convertFromPublic(value) {
        if (value == null)
            return null;
        let parameters = SettingsMongoDbPersistence.mapFromPublic(value.parameters);
        value = {
            _id: value.id,
            parameters: parameters,
            update_time: value.update_time
        };
        value = super.convertFromPublic(value);
        return value;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_2.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            criteria.push({ _id: { $regex: searchRegex } });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let idStarts = filter.getAsNullableString('id_starts');
        if (idStarts != null) {
            let idStartsRegex = new RegExp("^" + idStarts, "i");
            criteria.push({ _id: { $regex: idStartsRegex } });
        }
        return criteria.length > 0 ? { $and: criteria } : {};
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
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null) {
                return;
            }
            let parameters = item.parameters.getAsObject();
            parameters = SettingsMongoDbPersistence.mapFromPublic(parameters);
            let partial = {
                $set: {
                    parameters: parameters,
                    update_time: new Date()
                }
            };
            let result = yield this._collection.findOneAndUpdate({ _id: item.id }, partial, { returnOriginal: false, upsert: true });
            this._logger.trace(correlationId, "Set in %s with id = %s", this._collection, item.id);
            let newItem = result ? this.convertToPublic(result.value) : null;
            // if (newItem == null) {
            //     newItem = _.clone(item);
            //     newItem.update_time = now;
            // }
            return newItem;
        });
    }
    modify(correlationId, id, updateParams, incrementParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let partial = {
                $set: {
                    update_time: new Date()
                }
            };
            // Update parameters
            if (updateParams) {
                for (let key in updateParams) {
                    if (updateParams.hasOwnProperty(key)) {
                        partial.$set = partial.$set || {};
                        let field = 'parameters.' + SettingsMongoDbPersistence.fieldFromPublic(key);
                        partial.$set[field] = updateParams[key];
                    }
                }
            }
            // Increment parameters
            if (incrementParams) {
                for (let key in incrementParams) {
                    if (incrementParams.hasOwnProperty(key)) {
                        partial.$inc = partial.$inc || {};
                        let increment = incrementParams.getAsLongWithDefault(key, 0);
                        let field = 'parameters.' + SettingsMongoDbPersistence.fieldFromPublic(key);
                        partial.$inc[field] = increment;
                    }
                }
            }
            let result = yield this._collection.findOneAndUpdate({ _id: id }, partial, { returnOriginal: false, upsert: true });
            this._logger.trace(correlationId, "Modified in %s by %s", this._collection, id);
            let newItem = result ? this.convertToPublic(result.value) : null;
            return newItem;
        });
    }
}
exports.SettingsMongoDbPersistence = SettingsMongoDbPersistence;
//# sourceMappingURL=SettingsMongoDbPersistence.js.map