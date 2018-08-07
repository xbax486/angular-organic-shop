import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  create(product) {
    return this.angularFireDatabase.list('/products').push(product);
  }

  getAll() {
    return this.angularFireDatabase.list('/products')
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

  getProduct(id): AngularFireObject<Product> {
    return this.angularFireDatabase.object('/products/' + id);
  }

  updateProduct(id, product) {
    return this.angularFireDatabase.object('/products/' + id).update(product);
  }

  deleteProduct(id) {
    return this.angularFireDatabase.object('/products/' + id).remove();
  }
}
