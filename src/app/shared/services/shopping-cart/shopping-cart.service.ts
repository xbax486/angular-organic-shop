import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import { ShoppingCartItem } from "shared/models/shopping-cart-item";
import { take, map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private angularFireDataBase: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.angularFireDataBase.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(map((cart: ShoppingCart) => new ShoppingCart(cart['items'])));
  }

  async addToCart(product: Product) {
    this.updateShoppingCartItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateShoppingCartItem(product, -1);
  }

  async clearShoppingCart() {
    let cartId = await this.getOrCreateCartId();
    this.angularFireDataBase.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.angularFireDataBase.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCartItems(cartId: string, productKey: string) {
    return this.angularFireDataBase.object('/shopping-carts/' + cartId + '/items/' + productKey);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateShoppingCartItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$: AngularFireObject<{}> = this.getCartItems(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(
      (item: ShoppingCartItem) => {
        let quantity = (item ? item.quantity : 0) + change;
        if (quantity === 0) item$.remove();
        else {
          item$.update(
            {
              title: product.title,
              price: product.price,
              category: product.category,
              imageUrl: product.imageUrl,
              quantity: quantity
            }
          );
        }
      }
    )
  }
}
