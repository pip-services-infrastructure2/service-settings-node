"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_9 = require("pip-services3-commons-nodex");
class SettingsCommandSet extends pip_services3_commons_nodex_2.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetSectionIdsCommand());
        this.addCommand(this.makeGetSectionsCommand());
        this.addCommand(this.makeGetSectionByIdCommand());
        this.addCommand(this.makeSetSectionCommand());
        this.addCommand(this.makeModifySectionCommand());
    }
    makeGetSectionIdsCommand() {
        return new pip_services3_commons_nodex_3.Command("get_section_ids", new pip_services3_commons_nodex_6.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_8.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_9.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_4.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_5.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getSectionIds(correlationId, filter, paging);
        }));
    }
    makeGetSectionsCommand() {
        return new pip_services3_commons_nodex_3.Command("get_sections", new pip_services3_commons_nodex_6.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_8.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_9.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_4.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_5.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getSections(correlationId, filter, paging);
        }));
    }
    makeGetSectionByIdCommand() {
        return new pip_services3_commons_nodex_3.Command("get_section_by_id", new pip_services3_commons_nodex_6.ObjectSchema(true)
            .withRequiredProperty('id', pip_services3_commons_nodex_7.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsNullableString("id");
            return yield this._logic.getSectionById(correlationId, id);
        }));
    }
    makeSetSectionCommand() {
        return new pip_services3_commons_nodex_3.Command("set_section", new pip_services3_commons_nodex_6.ObjectSchema(true)
            .withRequiredProperty('id', pip_services3_commons_nodex_7.TypeCode.String)
            .withRequiredProperty('parameters', pip_services3_commons_nodex_7.TypeCode.Map), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsNullableString("id");
            let parameters = pip_services3_commons_nodex_1.ConfigParams.fromValue(args.getAsObject("parameters"));
            return yield this._logic.setSection(correlationId, id, parameters);
        }));
    }
    makeModifySectionCommand() {
        return new pip_services3_commons_nodex_3.Command("modify_section", new pip_services3_commons_nodex_6.ObjectSchema(true)
            .withRequiredProperty('id', pip_services3_commons_nodex_7.TypeCode.String)
            .withOptionalProperty('update_parameters', pip_services3_commons_nodex_7.TypeCode.Map)
            .withOptionalProperty('increment_parameters', pip_services3_commons_nodex_7.TypeCode.Map), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsNullableString("id");
            let updateParams = pip_services3_commons_nodex_1.ConfigParams.fromValue(args.getAsObject("update_parameters"));
            let incrementParams = pip_services3_commons_nodex_1.ConfigParams.fromValue(args.getAsObject("increment_parameters"));
            return yield this._logic.modifySection(correlationId, id, updateParams, incrementParams);
        }));
    }
}
exports.SettingsCommandSet = SettingsCommandSet;
//# sourceMappingURL=SettingsCommandSet.js.map