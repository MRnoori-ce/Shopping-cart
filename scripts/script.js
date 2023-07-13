// Initializing variables and selecting html tags

let productContainer = document.querySelector('#products');
let cartHeader= document.querySelector('.cart-header');
let cartContainer = document.querySelector('.cart');
let cartItems = document.querySelector('.cart-items');
let itemUnit = document.querySelector('.unit');
let totalItems = document.querySelector('.total-item');
let totalPrices = document.querySelector('.total-price');


// Showing all products items with their properties
function showAllProducts(){

    for(let i=0; i< products.length; i++ ){

        productContainer.innerHTML+= ` <div class="product-item">
        <div class="product-image">
            <img src="`+ products[i].imgSrc+ `" alt="">
        </div>
        <div class="title">`+ products[i].name + `</div>
        <div class="instock">تعداد موجود:`+ products[i].instock +`</div>
        <div class="product-data">
            <div class="price">`+ numberWithCommas(products[i].price) +`</div>
            <div class="add-to-cart" onclick= "addToCart(` + products[i].id+`)"><i class="fa-solid fa-cart-plus"></i></div>
        </div>
    </div>`

    };
}

showAllProducts();

// Showing and hiding cart
let n = 0;

cartHeader.addEventListener('click', function(){
    
    if(n==0){
        // show cart
        cartContainer.style.bottom= '-10px';
        cartHeader.setAttribute('title', 'بستن');
        n++; 
    
    }else{
        // hide cart
        cartContainer.style.bottom= '-280px';
        cartHeader.setAttribute('title', 'باز کردن');
        n=0;
    }

});

// cart array
let cart= [];

// add to cart function
function addToCart(id){

    let itemId = cart.some(function(item){
        return item.id == id;
    })

    if(itemId){
        changeNumberOfUnits('plus', id);

    }else{

        let item= products.find(function(p){
            return p.id== id;
        })

        item.numberOfunits= 1;
        cart.push(item);

        renderCartItem();
        renderTotal();
    }

}

// rendering cart item function
function renderCartItem(){

    cartItems.innerHTML = "";

    for(let i = 0; i< cart.length; i++){

        cartItems.innerHTML+= `<li class="cart-item">
        <div class="p-name" title= "حذف کردن" onclick= "deleteFromCart(`+ cart[i].id+`)">`+ cart[i].name+`</div>
        <div class="p-price">`+ numberWithCommas(cart[i].price)+ `</div>
        <div class="p-unit">
            <span class="plus" onclick= "changeNumberOfUnits('plus', `+ cart[i].id+`)"><i class="fa-solid fa-plus"></i></span>
            <span class="unit">`+ cart[i].numberOfunits+`</span>
            <span class="minus" onclick= "changeNumberOfUnits('minus', `+ cart[i].id+`)"><i class="fa-solid fa-minus"></i></span>
        </div>
    </li>`

    }
}

// changing the number of units
function changeNumberOfUnits(action, id){

    cart = cart.map(function(item){

        let oldNumberOfUnits = item.numberOfunits;
        
        if(item.id== id){
            if(action=='plus' && oldNumberOfUnits< item.instock){
                oldNumberOfUnits++;
            }else if(action == 'minus' && oldNumberOfUnits> 1){
                oldNumberOfUnits--;
            }
        }

        item.numberOfunits= oldNumberOfUnits;
        return item;

    })
    renderCartItem();
    renderTotal();
}

// render total

function renderTotal(){
    let totalItem= 0;
    let totalPrice= 0;
    

    for(let i=0; i < cart.length; i++){

        totalItem+= cart[i].numberOfunits;
        totalPrice += cart[i].price * cart[i].numberOfunits;
    }

    totalPrices.innerHTML = numberWithCommas(totalPrice);
    totalItems.innerHTML= totalItem;
    
}

// delete cart item function
function deleteFromCart(id){
    
    cart = cart.filter(function(item){
        return item.id != id;
    })

    renderCartItem();
    renderTotal();
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}