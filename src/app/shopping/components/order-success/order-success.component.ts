import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'shared/services/order/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit{
  orderId: string;
  order;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private orderService: OrderService, 
    private router: Router) {
  }

  async ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    let order$ = await this.orderService.getOrderById(this.orderId);
    order$.subscribe(order => this.order = order);
  }

  returnToProducts() {
    this.router.navigate(['/products']);
  }
}
