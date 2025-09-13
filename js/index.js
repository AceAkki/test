import { ProductInfo } from "./classProductInfo.js"
const classProduct = new ProductInfo({
  yearClass: "year-count", 
  userClass:"user-count", 
  minusBtnClass:"ph-minus", plusBtnClass:"ph-plus", 
  displayElmClass:"display-num", 
  buttonClass: "button-box"});

document.addEventListener("DOMContentLoaded", async () => {
  let headerElm = document.querySelector("#header");
  let header = await fetchFile("header.html", "Failed to load header!", "text");
  headerElm.innerHTML = header;
  let footerElm = document.querySelector("#footer");
  let footer = await fetchFile("footer.html", "Failed to load footer!", "text");
  footerElm.innerHTML = footer;
  

  let productsData = await fetchFile("json/products.json", "JSON");
  let homeProducts = document.querySelector("#product-item-zero");
  let businessProducts = document.querySelector("#product-item-one");
  let enterpriseProducts = document.querySelector("#product-item-two");

  classProduct.poppulate(homeProducts, productsData["home"]["products"], productsData["home"]["features"])
  classProduct.poppulate(businessProducts, productsData["business"]["products"], productsData["business"]["features"])
  classProduct.poppulate(enterpriseProducts, productsData["enterprise"]["products"], productsData["enterprise"]["features"])

  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })

  let productNav = document.querySelector(".product-nav");

  productNav.addEventListener("click", (e)=> {
    if (e.target.classList.contains("col-md-4")) {
      Array.from(productNav.children).forEach(child => {
        child.classList.remove("active-nav")
      });
      e.target.classList.add("active-nav")
    }
  })

  Array.from(productNav.children).forEach(child => {
    if (child.getAttribute("aria-expanded") === "true") {
      child.classList.add("active-nav")
    } else {
      child.classList.remove("active-nav")
    }
  })


})

async function fetchFile(apiURL, errorMessage, type) {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    if (type === "text") {
      const data = await response.text();
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(errorMessage, error);
  }
}


