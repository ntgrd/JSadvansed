const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        userSearch: '',
        filtered: [],
        goods: [],
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        // addProduct(element) {
        //     this.getJson(`${API}/addToBasket.json`)
        //         .then(data => {
        //             if (data.result === 1) {
        //                 let productId = +element.dataset['id'];
        //                 let find = this.products.find(product => product.id_product === productId);
        //                 if (find) {
        //                     find.quantity++;
        //                     this._updateCart(find);
        //                 } else {
        //                     let product = {
        //                         id_product: productId,
        //                         price: +element.dataset['price'],
        //                         product_name: element.dataset['name'],
        //                         quantity: 1
        //                     };
        //                     this.goods = [product];
        //                 }
        //             } else {
        //                 alert('Error');
        //             }
        //         })
        // },
        filter() {
            console.log(this.userSearch);
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        },
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                this.filtered = this.products;
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
    }
})  