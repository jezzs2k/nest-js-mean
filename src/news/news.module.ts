import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News } from './models/news.model';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.modelName, schema: News.model.schema },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
