import { CommandSet } from 'pip-services3-commons-nodex';
import { ISettingsController } from './ISettingsController';
export declare class SettingsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ISettingsController);
    private makeGetSectionIdsCommand;
    private makeGetSectionsCommand;
    private makeGetSectionByIdCommand;
    private makeSetSectionCommand;
    private makeModifySectionCommand;
}
