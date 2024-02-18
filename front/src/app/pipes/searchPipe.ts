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
        if (item.hasOwnProperty(key)) {
          if (Array.isArray(item[key])) {
            // If item[key] is an array
            for (let listItem of item[key]) {
              if (typeof listItem === 'string' && listItem.toLowerCase().includes(searchText)) {
                return true;
              }
            }
          } else if (typeof item[key] === 'string' && item[key].toLowerCase().includes(searchText)) {
            for (let key in item) {
              if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
                // If item[key] is a string property
                if (item[key].toLowerCase().includes(searchText)) {
                  return true;
                }
              }
            }
            return true;
          }
        }
      }
      return false;
    });
  }
}