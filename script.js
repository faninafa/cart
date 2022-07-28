const main = document.getElementById('main')
const table = document.getElementById('table')

class Cart {
    static #count = 0;
    static #products = [
        {
            id: this.#count++,
            name: "adidas Originals",
            details: "Black Ultraboost 4.0 DNA sneakers",
            photo: "https://catalog-resize-images.thedoublef.com/c2329f4fc3aa9dae7ec356da96ba3019/1400/1400/FY9121TS_K_ADIDS-BBB.a.jpg",
            price: 122,
        },
        {
            id: this.#count++,
            name: "Nike",
            details: "Air Flight Lite Mid sneakers white",
            photo: "https://catalog-resize-images.thedoublef.com/04e2cd8b4edb428286796ed8656db3e3/900/900/DJ2518LE_K_NIKE-102.a.jpg",
            price: 100,
        },
        {
            id: this.#count++,
            name: "Versace",
            details: "Black Trigreca sneakers with Chain print",
            photo: "https://catalog-resize-images.thedoublef.com/ccd1aeb24886d9909e9e7d9f6797b052/900/900/DSU80941A02707_K_VERSA-2B130.a.jpg",
            price: 450,
        },

    ];

    static #productsInCart = [];

    static saveCart(){
        localStorage.setItem('productsId', JSON.stringify(this.#productsInCart))
    }

    static createProductsListInElem(elem) {
        let htmlFragment = '';

        this.#products.map(product => {
            htmlFragment += `<div class="elem">
                                <h2>${product.name}</h2>
                                <p class="details">${product.details}</p>
                                <div style="background-image: url(${product.photo});"></div>
                                <p class="price">$${product.price}</p>
                                <a href="#" class="b-add" data-id=${product.id} >ADD</a>
                            </div>`
        })

        elem.innerHTML = htmlFragment

    }

    static renderingCart(elem=table) {
        this.saveCart();
        let count=0
        let htmlFragment = '';
        let total = 0;

        this.#productsInCart.map(product => {
            total += product.price * product.amount;
            htmlFragment += `<tr class="cart-elem" id=${product.id}>
                                <td>${++count}</td>
                                <td class="img" style="background-image: url(${product.photo});"></td>
                                <td>${product.name}</td>
                                <td><a href="#" class="b-minus" data-id=${product.id}>-</a></td>
                                <td class="count">${product.amount}</td>
                                <td><a href="#" class="b-plus" data-id=${product.id}>+</a></td>
                                <td class="cart-price">$${product.price}</td>
                                <td class="sum">$${product.price * product.amount}</td>
                                <td >
                                    <a href="#" class="b-delete" data-id=${product.id}>X</a>
                                </td>
                         </tr>`
        });

        elem.innerHTML = htmlFragment;
        document.querySelector('.total').innerText = `$${total}`;


    }

    static addInCart(productId) {
        let [isProduct] = this.#productsInCart.filter(p => p.id === productId);

        if (isProduct) {
            this.#productsInCart.map(product => {
                product.id === productId ? product.amount += 1 : '';
            })
            this.renderingCart();
        } else {
            [isProduct] = this.#products.filter(p => p.id === productId)
            this.#productsInCart.push(isProduct)

            this.#productsInCart.map(product => {
                product.id === productId ? product.amount = 1 : '';
            })
            this.renderingCart();

        }

    }

    static plusProduct(productId) {
        this.#productsInCart.map(product => {
            product.id === productId ? product.amount += 1 : '';
        })
        this.renderingCart();

    }

    static minusProduct(productId) {
        this.#productsInCart.map(product => {
            product.id === productId ? product.amount > 1 ? product.amount -= 1 : this.removeInCart(productId) : '';
        })
        this.renderingCart();

    }

    static removeInCart(productId) {
        this.#productsInCart = this.#productsInCart.filter(p => p.id !== productId)
        this.renderingCart();
    }


    static removeAll() {
        this.#productsInCart = [];
        this.renderingCart()
    }


    static getProducts(){
        console.log(this.#products)
    }

    static setProducts(arrElement){
        this.#products = arrElement

    }

    static addNewProduct(id,name,details,photo,price){
        const product ={
            id: id,
            name: name,
            details: details,
            photo: photo,
            price: price,

        }
        this.#products.push(product);
    }

    static deleteProduct(productId){
        this.#products = this.#products.filter(p=> p.id !==productId);
    }


    static getProductsInCart(){
        console.log(this.#productsInCart)
    }

    static setProductsInCart(arrElements){
        arrElements ? this.#productsInCart = arrElements : '' ;

        this.renderingCart()
    }

}


main.addEventListener('click', e => {
    e.preventDefault()
    e.target.classList.contains('b-add') ? Cart.addInCart(+e.target.dataset['id']) : "";
})

document.querySelector('.b-removeAll').addEventListener('click', (e)=> {
    e.preventDefault()
    Cart.removeAll()})

table.addEventListener('click', e =>{
    e.preventDefault()
    e.target.classList.contains('b-plus') ? Cart.plusProduct(+e.target.dataset['id']) :
        e.target.classList.contains('b-minus') ? Cart.minusProduct(+e.target.dataset['id'] ):
            e.target.classList.contains('b-delete') ? Cart.removeInCart(+e.target.dataset['id'] ):'';
})



Cart.createProductsListInElem(main);

Cart.setProductsInCart(JSON.parse(localStorage.getItem('productsId')))

