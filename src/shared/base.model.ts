import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface BaseModel extends Document {
    createdAt?: Date;
    updatedAr?: Date;
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