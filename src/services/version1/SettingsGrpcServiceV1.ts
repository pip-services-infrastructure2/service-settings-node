const services = require('../../../../src/protos/settings_v1_grpc_pb');
const messages = require('../../../../src/protos/settings_v1_pb');

import { IReferences, ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { ISettingsController } from '../../logic/ISettingsController';
import { SettingsGrpcConverterV1 } from './SettingsGrpcConverterV1';

export class SettingsGrpcServiceV1 extends GrpcService {
    private _controller: ISettingsController;
	
    public constructor() {
        super(services.SettingsService);
        this._dependencyResolver.put('controller', new Descriptor("service-settings", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<ISettingsController>('controller');
    }
    
    private async getSectionIds(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        SettingsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = SettingsGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.SettingsIdPageReply();

        try {
            let result = await this._controller.getSectionIds(correlationId, filter, paging);
            let page = SettingsGrpcConverterV1.fromSettingsIdPage(result);
            response.setPage(page);
        } catch(err) {
            let error = SettingsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getSections(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        SettingsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = SettingsGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.SettingsSectionPageReply();

        try {
            let result = await this._controller.getSections(correlationId, filter, paging);
            let page = SettingsGrpcConverterV1.fromSettingsSectionPage(result);
            response.setPage(page);
        } catch(err) {
            let error = SettingsGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async getSectionById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();

        let response = new messages.SettingsParamsReply();

        try {
            let result = await this._controller.getSectionById(correlationId, id);
            SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
        } catch(err) {
            let error = SettingsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async setSection(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        let params = ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(call.request.getParametersMap()));

        let response = new messages.SettingsParamsReply();

        try {
            let result = await this._controller.setSection(correlationId, id, params);
            SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
        } catch(err) {
            let error = SettingsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async modifySection(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        let updateParams = ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(call.request.getUpdateParametersMap()));
        let incrementParams = ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(call.request.getIncrementParametersMap()));

        let response = new messages.SettingsParamsReply();

        try {
            let result = await this._controller.modifySection(
                correlationId,
                id, updateParams, incrementParams
            );
            SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
        } catch(err) {
            let error = SettingsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
        
    }

    public register() {
        this.registerMethod(
            'get_section_ids', 
            null,
            this.getSectionIds
        );

        this.registerMethod(
            'get_sections', 
            null,
            this.getSections
        );

        this.registerMethod(
            'get_section_by_id', 
            null,
            this.getSectionById
        );

        this.registerMethod(
            'set_section', 
            null,
            this.setSection
        );

        this.registerMethod(
            'modify_section', 
            null,
            this.modifySection
        );

    }
}
