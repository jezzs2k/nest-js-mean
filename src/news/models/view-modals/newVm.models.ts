import { ApiProperty } from '@nestjs/swagger';

import { BaseModelVm } from 'src/shared/base.model';

export class NewsVm extends BaseModelVm {
  @ApiProperty() title: string;
  @ApiProperty() content: string;
  @ApiProperty() detail: string;
  @ApiProperty() newId: string;
  @ApiProperty() timeLocaleOfNews: Number;
  @ApiProperty() dateString: string;
}
