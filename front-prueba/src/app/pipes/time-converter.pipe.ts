import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConverter',
  standalone: true
})
export class TimeConverterPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (isNaN(value!) || value! < 0) {
      return 'Invalid input';
    }

    const hours = Math.floor(value! / 60);
    const minutes = value! % 60;

    return `${hours}h ${minutes}m`;
  }

}
