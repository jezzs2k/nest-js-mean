import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, InstanceType } from 'typegoose';
import { BaseService } from 'src/shared/base.service';
import { MapperService } from 'src/shared/mapper/mapper.service';
import { News } from './models/news.model';
import { NewsParams } from './models/view-modals/news-params.model';

@Injectable()
export class NewsService extends BaseService<InstanceType<News>> {
  constructor(
    @InjectModel(News.modelName)
    private readonly _newsModel: ModelType<InstanceType<News>>,
    private readonly _mapperService: MapperService,
  ) {
    super();

    this._model = _newsModel;
    this._mapper = _mapperService.mapper;
  }

  async createNews(params: NewsParams[]): Promise<News[]> {
    try {
      console.log(this._model);

      const result = await this._model.insertMany(params, {
        // ordered: false,
      });
      return result;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
