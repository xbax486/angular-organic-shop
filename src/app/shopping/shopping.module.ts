/* Modules */
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from 'shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

/* Components */
import { ProductsComponent } from './components/products/products.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ViewOrderDetailsComponent } from "./components/view-order-details/view-order-details.component";
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';

// Guards
import { AuthGuard } from 'shared/guards/auth/auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule.forChild([
      // routes requires normal login
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent, 
        canActivate: [AuthGuard]
      }
    ]),
  ],
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    OrderDetailsComponent,
    ViewOrderDetailsComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent
  ],
  exports: [
    ViewOrderDetailsComponent
  ],
  providers: [
    AuthGuard
  ],
  entryComponents: [
    OrderDetailsComponent
  ],
})
export class ShoppingModule { }
