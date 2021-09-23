import { prop, ModelType } from 'typegoose';
import { BaseModel, schemaOptions } from 'src/shared/base.model';

export class News extends BaseModel<News> {
  @prop({ required: [true, 'Title is required'] })
  title: string;
  @prop({ required: [true, 'Content is required'] })
  content: string;
  @prop({ required: false })
  image: string;
  @prop({ required: false })
  dateString: string;
  @prop({ required: [true, 'NewId is required'] })
  newId: string;
  @prop({ required: false })
  timeLocaleOfNews: number;
  @prop({ required: false })
  detail: string;

  static get model(): ModelType<News> {
    return new News().getModelForClass(News, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
