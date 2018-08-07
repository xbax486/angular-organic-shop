import { AuthService } from 'shared/services/auth/auth.service';
import { OrderService } from 'shared/services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  orders$;

  constructor(private authService: AuthService, private orderService: OrderService) {}

  async ngOnInit() {
    this.orders$ = await this.authService.user$.pipe(
      switchMap(user => this.orderService.getOrdersByUser(user.uid))
    );
  }
}
