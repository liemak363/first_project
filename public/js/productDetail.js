// update total price based on number of products
const priceNewDiv = document.querySelector(".price-new");
const priceNewStr = priceNewDiv.innerHTML;
const priceNew = parseInt(priceNewStr.substring(0, priceNewStr.length - 1));

const formDiv = document.querySelector("#form-buy-product");
const numberProductInputDiv = formDiv.querySelector("#number-products");
const totalPriceDiv = formDiv.querySelector(".total-price");

numberProductInputDiv.addEventListener("change", () => {
    totalPriceDiv.innerHTML = (priceNew*numberProductInputDiv.value).toString() + '$';
})
// End update total price based on number of products






