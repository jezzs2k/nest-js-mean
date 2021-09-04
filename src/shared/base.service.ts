import 'automapper-ts/dist/automapper';
import { Document, Model, Types } from 'mongoose';

export class BaseService<T extends Document> {
    protected _model: Model<T>;
    protected _mapper: AutoMapperJs.AutoMapper;

    private get modelName(): string {
        return this._model.modelName;
    };

    private get viewModeName(): string {
        return `${this._model.modelName}Vm`;
    };

    async map<K>(
        object: Partial<T> | Partial<T>[],
        isArray: boolean = false,
        sourceKey?: string,
        destrinationKey?: string,
    ): Promise<K> {
        const _sourceKey = isArray ? `${sourceKey || this.modelName}[]` : sourceKey || this.modelName;
        const _detrinationKey = isArray ? `${destrinationKey || this.viewModeName}[]` : destrinationKey || this.viewModeName;

        return this._mapper.map(_sourceKey, _detrinationKey, object);
    };

    async findAll(filter = {}): Promise<T[]> {
        return this._model.find(filter).exec();
    };

    async findOne(filter = {}): Promise<T> {
        return this._model.findOne(filter).exec();
    };

    async findById(id: string): Promise<T> {
        return this._model.findById(this.toObjectId(id));
    };

    async create(item: T): Promise<T> {
        return this._model.create(item);
    };

    async delete(id: string): Promise<T> {
        return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    };

    async update(id: string, item): Promise<T> {
        return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec()
    }

    private toObjectId(id: string): Types.ObjectId {
        return new Types.ObjectId(id);
    }
}