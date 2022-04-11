import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city',
  pure: true,
})
export class CityPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let fmt = args[0]; // short, long
    let short, long;

    switch (value) {
      case 'São Paulo':
        long = 'Guarulhos Airport';
        short = 'GRU';
        break;
      case 'Rio de Janeiro':
        long = 'Santos Dumont Airport';
        short = 'SDU';
        break;
      default:
        long = short = 'GRU';
    }

    if (fmt == 'short') return short;
    return long;
  }
}
