import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shoppingCart: ShoppingCart;
  cart$;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
