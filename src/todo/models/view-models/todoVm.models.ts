import { ApiProperty } from "@nestjs/swagger";
import { BaseModelVm } from "src/shared/base.model";
import { EnumToArray } from "src/shared/utilities/enum-to-array";
import { ToDoLevel } from "../todo-level.enum";

export class TodoVm extends BaseModelVm {
    @ApiProperty()
    content: string;
    @ApiProperty({ enum: EnumToArray(ToDoLevel) })
    level: ToDoLevel;
    @ApiProperty()
    isCompleted: boolean;
}