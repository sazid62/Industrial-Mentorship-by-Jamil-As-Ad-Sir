import './style.css'




const arrayOfCard = [

]
function getProductsCard() {
    const res = localStorage.getItem('cart');
    const result = JSON.parse(res);
    if (result) {

        result.map((it) => {
            const cp = it;
            // cp.quantity = 1;
            // console.log("ms -> ", cp);
            arrayOfCard.push(cp);
        });
    }
    // arrayOfCard.push(result);
    // console.log("found arra", arrayOfCard);
}





getProductsCard();

// console.log(


// card right side

CardRightSide();
// Card left side
const CardLeftSide = document.querySelector('#cartLeftSide');

arrayOfCard.forEach((it) => {


    // console.log(it.title, it.quantity);

    // if(Number.isInteger(it.quantity) == 0) it.quantity = 0;
    const table = document.createElement('table');
    table.classList.add("table");
    // console.log(it.thumbnail);
    table.innerHTML = `
     
                     
 

        <tr>
            <th>
               
            </th>
            <td class = "h-2 w-72">
                <div class="flex items-center gap-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                        <img class = "h-5 w-5" src="${it.thumbnail}"  alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold h-2 w-10 bg-red-200">${it.title}</div>
                             </div>
                </div>
            </td>
            <td ">
                $${it.price}
                </td>
            <td><input id = "inputInCart"value="${it.quantity}" type="number" placeholder="Type here" class=" h-8 input input-bordered w-11/12 max-w-xs" /></td>
            <th>
                <button class="btn btn-ghost btn-xs" id ="price">$${it.quantity * it.price}</button>
            </th>
        


    `;


    const inputInCart = table.querySelector('#inputInCart');
    inputInCart.addEventListener('change', (e) => {
        // console.log(arrayOfCard);
        // e.preventDefault();
        let v = inputInCart.value + 1;
        v = e.target.value;
        if (v >= 0) {
            
        }
        else v = 0;
        inputInCart.value = v;
        it.quantity = v;
        it.quantity = v;
        // console.log(v);
        // console.log(it);
        // console.log(arrayOfCard);
        v *= it.price;

        const price = table.querySelector('#price');
        price.innerHTML = `$${v}`;
        // console.log(arrayOfCard);
        CardRightSide();
        localStorage.setItem('cart', JSON.stringify(arrayOfCard));
        
        
        
    });
    CardLeftSide.appendChild(table);



});







// cart right side


function CardRightSide() {
    let total = 0;
    arrayOfCard.forEach((it) => {
        total += it.price * it.quantity;
        
    });
    const subTotal = document.querySelector("#subTotal");
    subTotal.innerHTML = `$${total}`;


    const ttotal = document.querySelector("#total");
    ttotal.innerHTML = `$${total}`;



    total -= 20;
    total += 61.9;
}






