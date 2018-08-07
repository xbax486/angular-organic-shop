import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { ShoppingCartService } from 'shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  currentCategory: string;
  productFilterShow = false;
  shoppingCart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.shoppingCart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          this.productFilterShow = true;
          return this.activatedRoute.queryParamMap;
        })
      )
      .subscribe(
        params => {
          this.currentCategory = params.get('category');
          this.applyFilter();
        }
      );
  }

  private applyFilter() {
    this.filteredProducts = (this.currentCategory) ?
      this.products.filter(p => p.category === this.currentCategory) :
      this.products;
  }
}
