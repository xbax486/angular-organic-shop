import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    totalItems: ShoppingCartItem[] = [];

    constructor(private items: { [productId: string]: ShoppingCartItem }) {
        this.items = items || {};

        for (let productId in items) {
            let item = items[productId];
            this.totalItems.push(new ShoppingCartItem({...item, key: productId}));
        }
    }

    get totalItemsQuantity() {
        return this.getTotals('quantity');
    }

    get totalPrice() {
        return this.getTotals('totalPrice');
    }

    private getTotals(key) {
        let count = 0;
        for (let productId in this.totalItems) {
            count += this.totalItems[productId][key];
        }
        return count;
    }

    getQuantity(product: Product) {
        let items = this.items[product.key];
        return items ? items.quantity : 0;
    }
}