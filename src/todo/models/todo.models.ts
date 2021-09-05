import { ModelType, prop } from "typegoose";

import { BaseModel, schemaOptions } from "src/shared/base.model";
import { ToDoLevel } from "./todo-level.enum";

export class Todo extends BaseModel<Todo> {
    @prop({ required: [true, 'Content is required'] })
    content: string;

    @prop({ enum: ToDoLevel, default: ToDoLevel.Nomal })
    level: ToDoLevel;

    @prop({ default: false })
    isCompleted: boolean;

    static get model(): ModelType<Todo> {
        return new Todo().getModelForClass(Todo, { schemaOptions })
    }

    static get modelName(): string {
        return this.model.modelName;
    }
}