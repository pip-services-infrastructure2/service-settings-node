"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const SettingsServiceFactory_1 = require("../build/SettingsServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class SettingsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("settings", "Settings microservice");
        this._factories.add(new SettingsServiceFactory_1.SettingsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.SettingsProcess = SettingsProcess;
//# sourceMappingURL=SettingsProcess.js.map