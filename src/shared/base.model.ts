import { ApiProperty } from '@nestjs/swagger';
import { SchemaOptions } from 'mongoose';
import { Typegoose, prop } from 'typegoose';
export class BaseModel extends Typegoose {
    @prop({ default: Date.now() })
    createdAt?: Date;

    @prop({ default: Date.now() })
    updatedAr?: Date;

    id?: string;
};

export class BaseModelVm {
    @ApiProperty({
        type: "Date",
    })
    createdAt?: Date;

    @ApiProperty({
        type: "Date",
    })
    updatedAt?: Date;

    @ApiProperty({
        type: "string",
    })
    id?: string;
};

export const schemaOption: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true,
}