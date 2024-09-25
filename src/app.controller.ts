import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getColorPaletteHTML(@Query('data') contextData: string) {
    if (!contextData || contextData === '') {
      throw new BadRequestException('No data provided');
    }
    return this.appService.getColorPaletteHTML(contextData);
  }

  @Get('/json')
  getColorPaletteJSON(@Query('data') contextData: string) {
    if (!contextData || contextData === '') {
      throw new BadRequestException('No data provided');
    }
    return this.appService.getColorPaletteJSON(contextData);
  }
}
