import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class SettingsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/settings');
        this._dependencyResolver.put('controller', new Descriptor('service-settings', 'controller', 'default', '*', '1.0'));
    }
}