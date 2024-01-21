import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Vérifiez chaque propriété de l'objet
      for (let key in item) {
        if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
          if (item[key].toLowerCase().includes(searchText)) {
            return true;
          }
        }
      }
      return false;
    });
  }
}