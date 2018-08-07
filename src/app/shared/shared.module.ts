/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from "angular5-data-table";
import { CustomFormsModule } from "ng2-validation";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

/* Components */
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductQuantityComponent } from "./components/product-quantity/product-quantity.component";

/* Services */
import { AuthService } from "./services/auth/auth.service";
import { UserService } from "./services/user/user.service";
import { CategoryService } from "./services/category/category.service";
import { ProductService } from "./services/product/product.service";
import { ShoppingCartService } from "./services/shopping-cart/shopping-cart.service";
import { OrderService } from "./services/order/order.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    NgbModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,

    CommonModule,
    FormsModule,
    DataTableModule,
    CustomFormsModule,
    NgbModule.forRoot().ngModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
