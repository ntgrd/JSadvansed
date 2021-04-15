class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; 
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, img: 'img/card-1.png' },
            { id: 2, title: 'Mouse', price: 20, img: 'img/card-2.png' },
            { id: 3, title: 'Keyboard', price: 200, img: 'img/card-3.png' },
            { id: 4, title: 'Gamepad', price: 50, img: 'img/card-4.png' },
        ];
    }
    countGoodsPrice() {
        return this.goods.reduce((accum, element) => accum + element.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
            //            block.innerHTML += productObj.render();
        }
    }
}

class ProductItem {
    constructor(product, img) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;

    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.render();

console.log(list.countGoodsPrice());

class Cart {
    constructor(cartItem) {
        this.cartItem = cartItem;
        this.goodsInCart =[];

    }
    countCartPrice() {

    }
    countQuantity() {

    }
    clearCart() {

    }

}


class CartItem {
    constructor(product, quantity) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.quantity = quantity;

    }

    add() {

    }
    delete() {

    }
    render() {

    }
}







