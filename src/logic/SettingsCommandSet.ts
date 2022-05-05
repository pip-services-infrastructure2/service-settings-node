import { ConfigParams } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { ISettingsController } from './ISettingsController';

export class SettingsCommandSet extends CommandSet {
    private _logic: ISettingsController;

    constructor(logic: ISettingsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetSectionIdsCommand());
		this.addCommand(this.makeGetSectionsCommand());
		this.addCommand(this.makeGetSectionByIdCommand());
		this.addCommand(this.makeSetSectionCommand());
		this.addCommand(this.makeModifySectionCommand());
    }

	private makeGetSectionIdsCommand(): ICommand {
		return new Command(
			"get_section_ids",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getSectionIds(correlationId, filter, paging);
			}
		);
	}

	private makeGetSectionsCommand(): ICommand {
		return new Command(
			"get_sections",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getSections(correlationId, filter, paging);
			}
		);
	}

	private makeGetSectionByIdCommand(): ICommand {
		return new Command(
			"get_section_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let id = args.getAsNullableString("id");
				return await this._logic.getSectionById(correlationId, id);
            }
		);
	}

	private makeSetSectionCommand(): ICommand {
		return new Command(
			"set_section",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String)
				.withRequiredProperty('parameters', TypeCode.Map),
            async (correlationId: string, args: Parameters) => {
                let id = args.getAsNullableString("id");
                let parameters = ConfigParams.fromValue(args.getAsObject("parameters"));
				return await this._logic.setSection(correlationId, id, parameters);
            }
		);
	}

	private makeModifySectionCommand(): ICommand {
		return new Command(
			"modify_section",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String)
				.withOptionalProperty('update_parameters', TypeCode.Map)
				.withOptionalProperty('increment_parameters', TypeCode.Map),
            async (correlationId: string, args: Parameters) => {
                let id = args.getAsNullableString("id");
                let updateParams = ConfigParams.fromValue(args.getAsObject("update_parameters"));
                let incrementParams = ConfigParams.fromValue(args.getAsObject("increment_parameters"));
				return await this._logic.modifySection(correlationId, id, updateParams, incrementParams);
            }
		);
	}

}