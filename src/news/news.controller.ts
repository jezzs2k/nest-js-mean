import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiException } from 'src/shared/api-exception.model';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { GetOperationId } from 'src/shared/utilities/get-operation-id';
import { UserRole } from 'src/user/models/user-role.enum';
import { News } from './models/news.model';
import { NewsParams } from './models/view-modals/news-params.model';
import { NewsVm } from './models/view-modals/newVm.models';
import { NewsService } from './news.service';

@Controller('news')
@ApiTags(News.modelName)
// @ApiBearerAuth()
export class NewsController {
  constructor(private readonly _newsService: NewsService) {}

  @Post()
  // @Roles(UserRole.User, UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), new RolesGuard(new Reflector()))
  @ApiResponse({ status: HttpStatus.CREATED, type: [NewsVm] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(News.modelName, 'Create'))
  async createNews(@Body() news: NewsParams[]): Promise<NewsVm[]> {
    if (!news) {
      throw new HttpException(
        'News params have been required!',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const result = await this._newsService.createNews(news);

      return this._newsService.map<NewsVm[]>(result, true);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
