import { ApiProperty } from '@nestjs/swagger';

export class NewsParams {
  @ApiProperty() title: string;
  @ApiProperty() dateString: string;
  @ApiProperty() content: string;
  @ApiProperty() detail: string;
  @ApiProperty() newId: string;
  @ApiProperty() timeLocaleOfNews: number;
}
