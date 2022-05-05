"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SettingsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/settings');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-settings', 'controller', 'default', '*', '1.0'));
    }
}
exports.SettingsHttpServiceV1 = SettingsHttpServiceV1;
//# sourceMappingURL=SettingsHttpServiceV1.js.map