"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SettingsCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/settings');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-settings', 'controller', 'default', '*', '1.0'));
    }
}
exports.SettingsCommandableHttpServiceV1 = SettingsCommandableHttpServiceV1;
//# sourceMappingURL=SettingsCommandableHttpServiceV1.js.map