import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Sorting {
  directSort(collection: any[], property: string) {
    if (property in collection[0]) {
      collection.sort((first, second) =>
        0 - (first[property] > second[property] ? 1 : -1));
    }
  }

  descendingSort(collection: any[], property: string) {
    if (property in collection[0]) {
      collection.sort((first, second) =>
        0 - (first[property] < second[property] ? 1 : -1));
    }
  }
}
