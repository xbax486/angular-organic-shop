import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from 'shared/services/category/category.service';
import { ProductService } from 'shared/services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy {
  categories$;
  product: Product;
  subscription: Subscription;
  id;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    
    this.categories$ = this.categoryService.getAll();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id) {
      this.subscription = this.productService.getProduct(this.id).valueChanges()
      .subscribe(returnedProduct => this.product = returnedProduct);
    }
  }

  save(product) {
    if(this.id) {
      this.productService.updateProduct(this.id, this.product);
    }
    else {
      this.productService.create(product);
    }

    this.router.navigate(['admin/products']);
  }

  delete() {
    if(!confirm('Are you sure to delete this product?')) 
      return;
    
    this.productService.deleteProduct(this.id);
    this.router.navigate(['admin/products']);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
