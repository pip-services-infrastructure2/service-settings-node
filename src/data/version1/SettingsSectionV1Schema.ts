import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class SettingsSectionV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('id', TypeCode.String);
        this.withOptionalProperty('parameters', TypeCode.Map);
        this.withOptionalProperty('update_time', null); //TypeCode.DateTime);
    }
}