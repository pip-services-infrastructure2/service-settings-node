import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsController } from './ISettingsController';
export declare class SettingsController implements IConfigurable, IReferenceable, ICommandable, ISettingsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<string>>;
    getSections(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SettingsSectionV1>>;
    getSectionById(correlationId: string, id: string): Promise<ConfigParams>;
    setSection(correlationId: string, id: string, parameters: ConfigParams): Promise<ConfigParams>;
    modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams): Promise<ConfigParams>;
}
