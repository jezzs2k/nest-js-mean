import { ApiProperty } from '@nestjs/swagger';
import { SchemaOptions } from 'mongoose';
import { Typegoose, prop, pre } from 'typegoose';

@pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = new Date(Date.now());

    next();
})
export class BaseModel<T> extends Typegoose {
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

export const schemaOptions: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true,
}