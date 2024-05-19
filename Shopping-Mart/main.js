import './style.css'

//  set PRoduct

const arrayOfCard = [
  
]
function getProductsCard() {
  const res = localStorage.getItem('cart');
  const result = JSON.parse(res);
  if(result) {

    result.map((it) => {
      const ar = it;
      // ar.quantity = it.quantity;
      arrayOfCard.push(ar);

    });
  }
  // arrayOfCard.push(result);
}


getProductsCard();

function pushProduct(cart) {

  // cart.quantity  = 0 ;
  arrayOfCard.push(cart);


}
function setProduct(cart) {
  // getProductsCard();
  // console.log("my cart = ", cart);
  // console.log("my array", arrayOfCard);

  pushProduct(cart);

  // console.log(arrayOfCard);

  localStorage.setItem('cart', JSON.stringify(arrayOfCard));
}




























 const productShowDiv  = document.querySelector('#productShow');

  async function getProducts() {
try {
  const response = await fetch('https://dummyjson.com/products');
  const res = await response.json();
  return res;
  
} catch (error) {
  throw error ("faileddddddddddddddddddddddddddddd");
}

    
  }
 
 
  function renderProduct(data) {
    
    // console.log(data.products);
    if(!data.products) {
        throw new Error("sasd");
    }
    if(data.products.length > 0) {

      data.products.map((cart) => {
        cart.quantity = 1;
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="relative h-10 w-10">
        
        <div class="card  shadow-2xl ">
        <figure><img src="${cart.thumbnail}";
        alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${cart.title}</h2>
        <h1 class="font-semibold">$${cart.price}</h1>
        <hr>
        <!-- <p>Save - $${cart.discountPercentage}</p> -->
        <div class="card-actions justify-end">
        <button id = "addToCard${cart.id}" class="btn btn-primary">Add to Card</button>
        </div>
        </div>
        </div>

        
      <div class="absolute top-0 right-0 ">
        <h1 class="font-bold bg-blue-700 text-white p-3 text-center rounded-r-xl">

        ${cart.discountPercentage}% OFF
        </h1>
        </div>
        
        </div>
        `;
        
        // @ts-ignore
        
        div.classList = "h-7, w-7";
            productShowDiv.appendChild(div);
       
            
            // *******************Add to Card Button*********************
            
            
            // console.log("hey ", cart.id);
            
            const addToCardButton  = productShowDiv.querySelector(`#addToCard${cart.id}`);
            addToCardButton.addEventListener('click', () => {
              setProduct(cart);
           
    });

    
    
    
  });
  
}
  
  
}


// **************SHow PRodcucts***********************
  renderProduct(await getProducts());



