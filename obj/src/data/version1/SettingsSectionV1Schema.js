"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSectionV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class SettingsSectionV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('parameters', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withOptionalProperty('update_time', null); //TypeCode.DateTime);
    }
}
exports.SettingsSectionV1Schema = SettingsSectionV1Schema;
//# sourceMappingURL=SettingsSectionV1Schema.js.map