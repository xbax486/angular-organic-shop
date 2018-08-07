import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  getAll() {
    return this.angularFireDatabase.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map(items => {
          return items.map(item => {
            const data = item.payload.val();
            const key = item.payload.key;
            return { key, ...data };
          });
        })
      );
  }
}
