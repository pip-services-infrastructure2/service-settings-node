import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { SettingsServiceFactory } from '../build/SettingsServiceFactory';

export class SettingsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("settings", "Settings function");
        this._dependencyResolver.put('controller', new Descriptor('service-settings', 'controller', 'default', '*', '*'));
        this._factories.add(new SettingsServiceFactory());
    }
}

export const handler = new SettingsLambdaFunction().getHandler();