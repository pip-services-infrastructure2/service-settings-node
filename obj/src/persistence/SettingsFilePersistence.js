"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const SettingsMemoryPersistence_1 = require("./SettingsMemoryPersistence");
class SettingsFilePersistence extends SettingsMemoryPersistence_1.SettingsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.SettingsFilePersistence = SettingsFilePersistence;
//# sourceMappingURL=SettingsFilePersistence.js.map