// da sample proda data here

const proda = [
    {
      id: 1,
        nama: 'proda 1',
        des: 'This is proda 1',
        la_price: 20.40,
        imago: "",
    },
    {
      id: 2,
        nama: 'proda 2',
        des: 'This is proda 2',
        la_price: 13.95,
        imago: "",
    },
    {
      id: 3,
        nama: 'proda 3',
        des: 'This is proda 3',
        la_price: 120.99,
        imago: "",
    },
    {
      id: 4,
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
    const productId = prod.id;
    const productName = prod.nama;
    const productPrice = prod.la_price;
    const productDescription = prod.des;
    const productImage = prod.imago;

    // Do something with the product details (e.g., display in a modal)
    console.log('Product clicked:', 'ID: '+productId, productName, productPrice, productDescription, productImage);

    // Example: Display product details in an alert
    alert(`You clicked on ${productName} ($${productPrice})`+" with ID:"+ productId);

    // Redirect to product detail page with query parameters
 // window.location.href = `prod-detail.htm?name=${productName}&price=${productPrice}&description=${productDescription}&image=${productImage}`;
  
   // Alternatively, Store product details in local storage
   
   localStorage.setItem('productDetails', JSON.stringify({
    id: productId,
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


// Status Check
 // Check if user is signed in
 const currentUser = JSON.parse(localStorage.getItem('currentUser'));

 if (currentUser) {
  document.getElementById('Sign-in-Status').style.display = 'none';
   // Display user greeting
   document.getElementById('user-greeting').innerHTML = `Hye there! Welcome, <b>${currentUser.email}!<b>`;
   // Show sign-out button
   document.getElementById('sign-out-button').style.display = 'block';
 } else {
   // Hide sign-out button
   document.getElementById('sign-out-button').style.display = 'none';
 }

 // Sign-out functionality
 document.getElementById('sign-out-button').addEventListener('click', () => {
   localStorage.removeItem('currentUser');
   window.location.href = 'signIn.htm'; // Redirect to sign-in page
 });