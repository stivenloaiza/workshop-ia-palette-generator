import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AppService {
  async getPaletteIA(
    dataContext: string,
    typeData: string,
  ): Promise<string | Record<any, any>> {
    const genAI = new GoogleGenerativeAI(
      'AIzaSyDQDFt2lmPJ92aFOseX7VMts2_aPgyyvOI',
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    let prompt: string;
    if (typeData === 'json') {
      prompt =
        'Crea una paleta de 5 colores.\n' +
        'Generar estos 5 colores en un JSON.\n' +
        'Entregame solo el JSON sin comentarios ni nada adicional.\n' +
        'El contexto para generar los 5 colores es este: (utiliza este contexto solo para generar los colores.)\n' +
        '---\n ' +
        `${dataContext}`;
      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } else if (typeData === 'html') {
      prompt =
        'Crea una paleta de 5 colores.\n' +
        'Generar estos 5 colores aplicados en un HTML que tenga un appbar que diga Tu paleta de colores para: y el titulo segun el contexto, ademas agrega componentes basicos con cards, textos y botones bonitos, ademas en un componente ubica los 5 colores con su hexadecimal.\n' +
        'Entregame solo el HTML sin comentarios ni nada adicional.\n' +
        'El contexto para generar los 5 colores es este: (utiliza este contexto solo para generar los colores.)\n' +
        '---\n ' +
        `${dataContext}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } else {
      throw new BadRequestException('Type of return is not supported.');
    }
  }

  getColorPaletteJSON(dataContext: string) {
    return this.getPaletteIA(dataContext, 'json');
  }

  getColorPaletteHTML(dataContext: string) {
    return this.getPaletteIA(dataContext, 'html');
  }
}
