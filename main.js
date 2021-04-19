const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(currentCart, container = '.products') {
        this.container = container;
        this.currentCart = currentCart;
        this.block = document.querySelector(this.container);
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            this.block.insertAdjacentHTML('beforeend', productObj.render());
        }
        this.initClick();
        
    }

    initClick() {
        this.block.addEventListener('click', (event) => {
            this.ClickHandler(event);
        });
    }
    
    ClickHandler(event) {
        if (event.target.className === 'buy-btn') this.ClickHandlerAddToCart(event)
        else {
            return
        };
    }

    ClickHandlerAddToCart(event) {
        //проверяем наличие товара в корзине
        let productNew = this.currentCart.goodsInCart.find(el => el.id === +event.target.parentNode.parentNode.dataset.id);
        console.log(productNew)

        if (productNew === undefined) {
            let productCatalogItem = this.allProducts.find(el => el.id === +event.target.parentNode.parentNode.dataset.id);
            console.log('productCatalogItem', productCatalogItem, event.target.parentNode.parentNode.dataset.id, this.allProducts);
            this.currentCart.goodsInCart.push({
                id: productCatalogItem.id,
                price: productCatalogItem.price,
                title: productCatalogItem.title,
                quantity: 1,
            })
            console.log('currentCart.goodsInCart', this.currentCart.goodsInCart)
        }
        else {
            let index = this.currentCart.goodsInCart.indexOf(productNew);
            if (~index) {
                this.currentCart.goodsInCart[index].quantity += 1;
            }
        }
        this.currentCart.init();
    }
}

class ProductItem {
    constructor(product, img = '') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;

    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}



class Cart {
    constructor(cartItem) {
        this.cartItem = cartItem;
        this.goodsInCart = [];

    }
    init() {
        let cartList = document.querySelector('.cart-list');
        if (cartList !== null) cartList.remove(); //очистка корзины
        console.log('this.cartList', cartList);
        this.cartBlock = document.querySelector('.cart');
        this.cartBlock.textContent = "Корзина:";
        this.cartListBlock = document.createElement('div');
        this.cartBlock.appendChild(this.cartListBlock);
        this.cartListBlock.classList.add('cart-list');

        // this.cartButton = document.querySelector('.cart-button');
        // this.cartButton.addEventListener('click', this.clearCart.bind(this));

        this.render();
        this.showCartClick();
        this.showCartClickHandler();
    }

    render() {

        let cartList = document.querySelector('.cart-list');
        console.log('this.cartList2', cartList);
        for (let product of this.goodsInCart) {
            const cartObj = new CartItem(product);
            console.log(cartObj.render());
            cartList.insertAdjacentHTML('afterbegin', cartObj.render());
        }

    }

    showCartClick() {
        document.querySelector('.btn-cart').addEventListener('click', (event) => {
            this.showCartClickHandler(event);
        });
    }

    showCartClickHandler(event){
        let showCart = document.querySelector('.cart');
        showCart.style.display = 'block'; 
    }
            
    
    countCartPrice() {

    }
    countQuantity() {

    }
    clearCart() {

    }

}


class CartItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.quantity = product.quantity;

    }

    add() {

    }
    delete() {

    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <p>количество: ${this.quantity}</p>
                </div>
            </div>`
    }
}

let currentCart = new Cart();
let list = new ProductsList(currentCart);