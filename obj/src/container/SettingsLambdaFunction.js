"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.SettingsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const SettingsServiceFactory_1 = require("../build/SettingsServiceFactory");
class SettingsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("settings", "Settings function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-settings', 'controller', 'default', '*', '*'));
        this._factories.add(new SettingsServiceFactory_1.SettingsServiceFactory());
    }
}
exports.SettingsLambdaFunction = SettingsLambdaFunction;
exports.handler = new SettingsLambdaFunction().getHandler();
//# sourceMappingURL=SettingsLambdaFunction.js.map