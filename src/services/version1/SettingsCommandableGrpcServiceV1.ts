import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class SettingsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/settings');
        this._dependencyResolver.put('controller', new Descriptor('service-settings', 'controller', 'default', '*', '1.0'));
    }
}