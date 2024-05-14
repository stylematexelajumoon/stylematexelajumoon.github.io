const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

// Seleccionar todos los botones nes-btn
const nesBtns = document.querySelectorAll('.nes-btn');

// Iterar sobre cada botón nes-btn y agregar el evento clic
nesBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        const producto = {
            title: btn.parentElement.querySelector('h2').textContent, // Obtener el título del producto del elemento h2
            precio: btn.parentElement.querySelector('p.price').textContent.replace('$', 'Q'), // Obtener el precio del elemento p.price y reemplazar $ por Q
        };
        // Llamar a la función que agrega el producto al carrito
        addToCart(producto);
    });
});

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Función para agregar productos al carrito
function addToCart(product) {
    const infoProduct = {
        quantity: 1,
        title: product.title,
        price: product.precio,
    };

    const existingProduct = allProducts.find(prod => prod.title === infoProduct.title);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        allProducts = [...allProducts, infoProduct];
    }

    showHTML();
}

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(prod => prod.title !== title);

        showHTML();
    }
});

// Función para mostrar HTML
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
         <span class="spacer"></span> 
            <div class="product-info">
             <p class="titulo-producto-carrito">${product.title}</p>
             <span class="precio-producto-carrito">${product.price}</span>
         </div>
            <i class="nes-icon close is-small"></i>
        </div>
        `;

        rowProduct.append(containerProduct);

        total = total + parseInt(product.price.replace('Q', '')) * product.quantity;
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `Q${total}`;
    countProducts.innerText = totalOfProducts;
};