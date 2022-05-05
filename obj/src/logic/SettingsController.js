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
exports.SettingsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const SettingsSectionV1_1 = require("../data/version1/SettingsSectionV1");
const SettingsCommandSet_1 = require("./SettingsCommandSet");
class SettingsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(SettingsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new SettingsCommandSet_1.SettingsCommandSet(this);
        return this._commandSet;
    }
    getSectionIds(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this._persistence.getPageByFilter(correlationId, filter, paging);
            let data = page != null ? page.data.map(d => d.id) : null;
            let result = new pip_services3_commons_nodex_3.DataPage(data, page.total);
            return result;
        });
    }
    getSections(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getSectionById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this._persistence.getOneById(correlationId, id);
            let parameters = item != null ? item.parameters : null;
            parameters = parameters || new pip_services3_commons_nodex_1.ConfigParams();
            return parameters;
        });
    }
    setSection(correlationId, id, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = new SettingsSectionV1_1.SettingsSectionV1(id, parameters);
            item = yield this._persistence.set(correlationId, item);
            return item.parameters;
        });
    }
    modifySection(correlationId, id, updateParams, incrementParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this._persistence.modify(correlationId, id, updateParams, incrementParams);
            return item.parameters;
        });
    }
}
exports.SettingsController = SettingsController;
SettingsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-settings:persistence:*:*:1.0');
//# sourceMappingURL=SettingsController.js.map