import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product/product.service';
import { Subscription } from 'rxjs';
import { DataTableResource } from "angular5-data-table";
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  subscription: Subscription;
  
  dataTableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(returnedProducts => {
        this.products = returnedProducts;

        this.initializeDataTable(returnedProducts);
      });
  }

  private initializeDataTable(products: any[]) {
    this.dataTableResource = new DataTableResource(products);
    this.dataTableResource.query({ offset: 0 }).then(items => this.items = items);
    this.dataTableResource.count().then(itemCount => this.itemCount = itemCount);
  }

  reloardItems(params) {
    if(!this.dataTableResource) return;

    this.dataTableResource.query(params).then(items => this.items = items);
  }

  filterProduct(filterTitle: string) {
    let filteredProducts = (filterTitle) ? 
      this.products.filter(p => p.title.toLowerCase().includes(filterTitle.toLowerCase())) :
      this.products;
    this.initializeDataTable(filteredProducts);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
