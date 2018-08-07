import { Component, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('currentCategory') currentCategory;
  @Input('productFilterShow') productFilterShow;
  
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  }
}
