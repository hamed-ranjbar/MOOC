import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlLineBreak'
})
export class HtmlLineBreakPipe implements PipeTransform {

  transform(text: string): string {
    return text.replace(/\n/g,'<br/>');
  }

}
