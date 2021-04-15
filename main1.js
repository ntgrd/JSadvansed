const products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'img/card-1.png' },
    { id: 2, title: 'Mouse', price: 20, img: 'img/card-1.png' },
    { id: 3, title: 'Keyboard', price: 200, img: 'img/card-1.png' },
    { id: 4, title: 'Gamepad', price: 50, img: 'img/card-1.png' },
];
//Функция для формирования верстки каждого товара
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src=${item.img} alt="photo">
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
    //если тип разделителя не задан, то элементы массива разделяются зяпятой, поэтому для того чтобы ее убрать, нам необходимо в качестве разделителя поставить пустую строку
};

renderPage(products);