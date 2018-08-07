import { ShoppingCart } from "./shopping-cart";

export class Order {
    datePlaced: number;
    items: any[];
    totalPrice: number = 0;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.totalItems.map(
            item => {
                return {
                    product: {
                        title: item.title,
                        price: item.price,
                        category: item.category,
                        imageUrl: item.imageUrl
                    },
                    quantity: item.quantity,
                    totalPrice: item.totalPrice
                };
            }
        );

        for (let item in this.items) {
            this.totalPrice += this.items[item].totalPrice;
        }
    }
}