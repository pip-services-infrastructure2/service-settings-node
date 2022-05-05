"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class SettingsCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/settings');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-settings', 'controller', 'default', '*', '1.0'));
    }
}
exports.SettingsCommandableGrpcServiceV1 = SettingsCommandableGrpcServiceV1;
//# sourceMappingURL=SettingsCommandableGrpcServiceV1.js.map