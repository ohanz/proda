// da sample proda data here

const proda = [
    {
        nama: 'proda 1',
        des: 'This is proda 1',
        la_price: 20.40,
        imago: "",
    },
    {
        nama: 'proda 2',
        des: 'This is proda 2',
        la_price: 13.95,
        imago: "",
    },
    {
        nama: 'proda 3',
        des: 'This is proda 3',
        la_price: 120.99,
        imago: "",
    },
    {
        nama: 'proda 4',
        des: 'This is proda 4',
        la_price: 699.99,
        imago: "",
    },
]

// fetch-get 

const myProdaContainer = document.querySelector('.my-product-cont');
//loppper
proda.forEach(prod =>{
    const prodCard = document.createElement('div');
    prodCard.classList.add('product-card');

    prodCard.innerHTML = `
      <img src="${prod.imago}" alt="${prod.nama}">
      <div class="product-info">
      <h3>${prod.nama}</h3>
      <p>${prod.des}</p>
      <p>Price: $${prod.la_price}</p>
      </div>
      <br/><br/>
      <button>Buy This Now</button>
    `;

    // Add event listener to the product card
  prodCard.addEventListener('click', () => {
    // Get the product details on click
    const productName = prod.nama;
    const productPrice = prod.la_price;
    const productDescription = prod.des;
    const productImage = prod.imago;

    // Do something with the product details (e.g., display in a modal)
    console.log('Product clicked:', productName, productPrice, productDescription, productImage);

    // Example: Display product details in an alert
    alert(`You clicked on ${productName} ($${productPrice})`);

    // Redirect to product detail page with query parameters
 // window.location.href = `prod-detail.htm?name=${productName}&price=${productPrice}&description=${productDescription}&image=${productImage}`;
  
   // Alternatively, Store product details in local storage
   localStorage.setItem('productDetails', JSON.stringify({
    name: productName,
    price: productPrice,
    description: productDescription,
    image: productImage
  }));

  // Redirect to product detail page
  window.location.href = 'prod-detail.htm';

});


    // apending the proda cards to myProdaContainer
    myProdaContainer.appendChild(prodCard);
});