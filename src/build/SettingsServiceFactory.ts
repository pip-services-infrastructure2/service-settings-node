import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { SettingsMongoDbPersistence } from '../persistence/SettingsMongoDbPersistence';
import { SettingsFilePersistence } from '../persistence/SettingsFilePersistence';
import { SettingsMemoryPersistence } from '../persistence/SettingsMemoryPersistence';
import { SettingsController } from '../logic/SettingsController';
import { SettingsHttpServiceV1 } from '../services/version1/SettingsHttpServiceV1';
import { SettingsCommandableGrpcServiceV1 } from '../services/version1/SettingsCommandableGrpcServiceV1';
import { SettingsGrpcServiceV1 } from '../services/version1/SettingsGrpcServiceV1';

export class SettingsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-settings", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-settings", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-settings", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-settings", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-settings", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-settings", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-settings", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-settings", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SettingsServiceFactory.MemoryPersistenceDescriptor, SettingsMemoryPersistence);
		this.registerAsType(SettingsServiceFactory.FilePersistenceDescriptor, SettingsFilePersistence);
		this.registerAsType(SettingsServiceFactory.MongoDbPersistenceDescriptor, SettingsMongoDbPersistence);
		this.registerAsType(SettingsServiceFactory.ControllerDescriptor, SettingsController);
		this.registerAsType(SettingsServiceFactory.HttpServiceDescriptor, SettingsHttpServiceV1);
		this.registerAsType(SettingsServiceFactory.CommandableGrpcServiceDescriptor, SettingsCommandableGrpcServiceV1);
		this.registerAsType(SettingsServiceFactory.GrpcServiceDescriptor, SettingsGrpcServiceV1);
	}
	
}
