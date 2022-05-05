"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsGrpcConverterV1 = void 0;
const messages = require('../../../../src/protos/settings_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
class SettingsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_5.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        SettingsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: SettingsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_6.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject == 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (typeof map.set == 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        SettingsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_nodex_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromSettingsSection(section) {
        if (section == null)
            return null;
        let obj = new messages.SettingsSection();
        obj.setId(section.id);
        obj.setUpdateTime(pip_services3_commons_nodex_3.StringConverter.toString(section.update_time));
        SettingsGrpcConverterV1.setMap(obj.getParametersMap(), section.parameters);
        return obj;
    }
    static toSettingsSection(obj) {
        if (obj == null)
            return null;
        let section = {
            id: obj.getId(),
            update_time: pip_services3_commons_nodex_4.DateTimeConverter.toDateTime(obj.getUpdateTime()),
            parameters: pip_services3_commons_nodex_2.ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(obj.getParametersMap()))
        };
        return section;
    }
    static fromSettingsSectionPage(page) {
        if (page == null)
            return null;
        let obj = new messages.SettingsSectionPage();
        obj.setTotal(page.total);
        let data = page.data.map(SettingsGrpcConverterV1.fromSettingsSection);
        obj.setDataList(data);
        return obj;
    }
    static toSettingsSectionPage(obj) {
        if (obj == null)
            return null;
        let data = obj.getDataList().map(SettingsGrpcConverterV1.toSettingsSection);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
    static fromSettingsIdPage(page) {
        if (page == null)
            return null;
        let obj = new messages.SettingsIdPage();
        obj.setTotal(page.total);
        obj.setDataList(page.data);
        return obj;
    }
    static toSettingsIdPage(obj) {
        if (obj == null)
            return null;
        let page = {
            total: obj.getTotal(),
            data: obj.getDataList()
        };
        return page;
    }
}
exports.SettingsGrpcConverterV1 = SettingsGrpcConverterV1;
//# sourceMappingURL=SettingsGrpcConverterV1.js.map