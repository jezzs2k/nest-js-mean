import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { EnumToArray } from "src/shared/utilities/enum-to-array";
import { ToDoLevel } from "../todo-level.enum";

export class TodoParams {
    @ApiProperty() content: string;
    @ApiPropertyOptional({ enum: EnumToArray(ToDoLevel), example: ToDoLevel.Nomal }) level: ToDoLevel;
}