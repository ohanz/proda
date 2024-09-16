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

    // apending the proda cards to myProdaContainer
    myProdaContainer.appendChild(prodCard);
});