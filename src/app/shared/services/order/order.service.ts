import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private angularFireDatabase: AngularFireDatabase, 
    private shoppingCartService: ShoppingCartService) {}

  async placeOrder(order) {
    let result = await this.angularFireDatabase.list('/orders').push(order);
    this.shoppingCartService.clearShoppingCart();
    return result;
  }

  getOrders() {
    return this.angularFireDatabase.list('/orders').valueChanges();
  }

  getOrdersByUser(userId) {
    return this.angularFireDatabase.list('/orders', 
      order => order.orderByChild('userId').equalTo(userId)).valueChanges();
  }

  getOrderById(orderId) {
    return this.angularFireDatabase.object('/orders/' + orderId).valueChanges();
  }
}
