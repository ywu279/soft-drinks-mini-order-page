let request = new XMLHttpRequest();
let requestURL = 'http://127.0.0.1:50368/CST8209_Yufan_Wu_041041786/data.json';
function reportStatus(){
    // Process the server response here.
    if (request.readyState === XMLHttpRequest.DONE) {
      // Everything is good, the response was received
      // Now verify the response and extract the data
      	if (request.status === 200) {
            // Perfect! Display data in DOM
            console.log("httpRequest is finished and response is ready");
        }
        else {
            console.log("There was a problem with the request.");
            // For example, the response may have a 404 (Not Found) // or 500 (Internal Server Error) response code.
        }
    }else {
        console.log("Not ready yet.");
    }
};
request.onreadystatechange = reportStatus;
request.open('GET',requestURL);
request.responseType = 'text';
//send the request
request.send();

//deal with the response from the server
request.onload = function() {
    const jsonData = request.response;
    //convert JSON strings into JavaScript objects
    const drinks = JSON.parse(jsonData);

    console.log(drinks);

    //----------------- create an array of objects "table" --------------------
    //use the same constructor "Drinks" below
    //it's created by looping through JS data "drinks"
    let table = []
    for (let i = 0; i < drinks.length; i++) {
      table[i] = new Drinks(drinks[i].image, drinks[i].name, drinks[i].price, drinks[i].inCart, drinks[i].price * drinks[i].inCart)
    }
    console.log(table);

    // ---------------------- invoke displayDrinks() --------------------------
    for (let row of table) {
      let ul = document.createElement("ul")
      ul.innerHTML = row.displayDrinks()
      $(".rows").append(ul)
    }

    //---------------------- Add to cart by clicking the image---------------------------------
    let total = 0
    for (let j = 0; j < table.length; j++) {
    $(".imgButton").eq(j).on("click", function() {
                 table[j].inCart += 1;
                 $(".inCart").eq(j).text(table[j].inCart);
                 $(".subtotal").eq(j).text(table[j].price * table[j].inCart);
                 total += table[j].price;
                 $("#total").val(total);
       })
     }
}


    //----------- create a class for JS objects (table template) --------------
class Drinks {
  constructor(image, name, price, inCart, subtotal) {
    this.image = image;
    this.name = name
    this.price = price;
    this.inCart = inCart;
    this.subtotal = this.price * this.inCart;
  }

  displayDrinks(){
    var image = `<li class="img">
                    <button type=button class="imgButton">
                      <img src=${this.image} class="itemPic">
                    </button>
                  </li>`
    var name = `<li class="itemName">${this.name}</li>`
    var price = `<li class="price">${this.price}</li>`
    var inCart = `<li class="inCart">${this.inCart}</li>`
    var subtotal = `<li class="subtotal">${this.price * this.inCart}</li>`
    return(image + name + price + inCart + subtotal)
  }
}


// function displayDrinks(drinks) {
//     let total = 0
//     //另一种方法：不用class去创建一个模板后再display, 直接loop through data in drinks
//     for (let i = 0; i < drinks.length; i++) {
//
//         let row = `<ul>
//                       <li class="img">
//                         <button type=button class="imgButton">
//                           <img src=${drinks[i].image} class="itemPic">
//                         </button>
//                       </li>
//                       <li class="itemName">${drinks[i].name}</li>
//                       <li class="price">${drinks[i].price}</li>
//                       <li class="inCart">${drinks[i].inCart}</li>
//                       <li class="subtotal">${drinks[i].price * drinks[i].inCart}</li>
//                    </ul>`;
//         $(".rows").append(row);
//
//         //--------------------------Add to cart-------------------------
//         $(".imgButton").eq(i).on("click", function() {
//               drinks[i].inCart += 1;
//               $(".inCart").eq(i).text(drinks[i].inCart);
//               $(".subtotal").eq(i).text(drinks[i].price * drinks[i].inCart);
//               total += drinks[i].price;
//               $("#total").val(total);
//         })
//     }
// }
