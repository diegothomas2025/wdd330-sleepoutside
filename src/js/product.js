import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// show discount
async function showDiscount() {
  // get ID
  const productId = getParam("product");
  if (!productId) return;

  // Search data
  const product = await dataSource.findProductById(productId);
  
  if (product && product.SuggestedRetailPrice > product.FinalPrice) {
    const savings = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);

    const priceElement = document.querySelector(".product-card__price");
    if (priceElement) {
      
      const discountTag = document.createElement("p");
      discountTag.style.color = "red"; 
      discountTag.innerHTML = `You save: $${savings}!`;
      priceElement.after(discountTag);
    }
  }
}

showDiscount();

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
