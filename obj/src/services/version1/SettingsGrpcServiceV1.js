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
exports.SettingsGrpcServiceV1 = void 0;
const services = require('../../../../src/protos/settings_v1_grpc_pb');
const messages = require('../../../../src/protos/settings_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const SettingsGrpcConverterV1_1 = require("./SettingsGrpcConverterV1");
class SettingsGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.SettingsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_2.Descriptor("service-settings", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getSectionIds(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_3.FilterParams();
            SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.SettingsIdPageReply();
            try {
                let result = yield this._controller.getSectionIds(correlationId, filter, paging);
                let page = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromSettingsIdPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getSections(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_3.FilterParams();
            SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.SettingsSectionPageReply();
            try {
                let result = yield this._controller.getSections(correlationId, filter, paging);
                let page = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromSettingsSectionPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getSectionById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let id = call.request.getId();
            let response = new messages.SettingsParamsReply();
            try {
                let result = yield this._controller.getSectionById(correlationId, id);
                SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
            }
            catch (err) {
                let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    setSection(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let id = call.request.getId();
            let params = pip_services3_commons_nodex_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(call.request.getParametersMap()));
            let response = new messages.SettingsParamsReply();
            try {
                let result = yield this._controller.setSection(correlationId, id, params);
                SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
            }
            catch (err) {
                let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    modifySection(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let id = call.request.getId();
            let updateParams = pip_services3_commons_nodex_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(call.request.getUpdateParametersMap()));
            let incrementParams = pip_services3_commons_nodex_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(call.request.getIncrementParametersMap()));
            let response = new messages.SettingsParamsReply();
            try {
                let result = yield this._controller.modifySection(correlationId, id, updateParams, incrementParams);
                SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
            }
            catch (err) {
                let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_section_ids', null, this.getSectionIds);
        this.registerMethod('get_sections', null, this.getSections);
        this.registerMethod('get_section_by_id', null, this.getSectionById);
        this.registerMethod('set_section', null, this.setSection);
        this.registerMethod('modify_section', null, this.modifySection);
    }
}
exports.SettingsGrpcServiceV1 = SettingsGrpcServiceV1;
//# sourceMappingURL=SettingsGrpcServiceV1.js.map