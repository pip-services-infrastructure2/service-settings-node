import { ProcessContainer } from 'pip-services3-container-nodex';

import { SettingsServiceFactory } from '../build/SettingsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class SettingsProcess extends ProcessContainer {

    public constructor() {
        super("settings", "Settings microservice");
        this._factories.add(new SettingsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }
}
