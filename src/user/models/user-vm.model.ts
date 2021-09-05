import { ApiProperty } from '@nestjs/swagger'

import { BaseModelVm } from "src/shared/base.model";
import { EnumToArray } from 'src/shared/utilities/enum-to-array';
import { UserRole } from "./user-role.enum";

export class UserVm extends BaseModelVm {
    @ApiProperty() username: string;
    @ApiProperty() firstName?: string;
    @ApiProperty() lastName?: string;
    @ApiProperty() fullName?: string;
    @ApiProperty({ enum: EnumToArray(UserRole) }) role?: UserRole;
};