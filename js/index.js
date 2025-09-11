document.addEventListener("DOMContentLoaded", async () => {
    let headerElm = document.querySelector("#header");
    let header = await fetchFile("header.html", "Failed to load header!");
    headerElm.innerHTML = header;
    let footerElm = document.querySelector("#footer");
    let footer = await fetchFile("footer.html", "Failed to load footer!");
    footerElm.innerHTML = footer;

    const swiper = new Swiper('.swiper', {
        loop:true,
        pagination:{
            el: '.swiper-pagination'
        },
        navigation: {
            nextEl:'.swiper-button-next',
            prevEl:'.swiper-button-prev',
        }
    })

    let productNav = document.querySelector(".product-nav");

    productNav.addEventListener("click", (e)=> {
      if (e.target.classList.contains("col-md-4")) {
        Array.from(productNav.children).forEach(child => { child.classList.remove("active-nav") });
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
    
    countCalculator ({
      idSelector: "user-count", 
      minusBtnClass: "ph-minus", 
      plusBtnClass: "ph-plus", 
      displayElmClass: "display-num"}
      )
    countCalculator ({
      idSelector: "year-count", 
      minusBtnClass: "ph-minus", 
      plusBtnClass: "ph-plus", 
      displayElmClass: "display-num"}
      )



})

async function fetchFile(apiURL, errorMessage) {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.text();
      return data;
    } catch (error) {
      console.error(errorMessage, error);
    }
}

function countCalculator ({idSelector, minusBtnClass, plusBtnClass, displayElmClass}) {
  let parentElm = document.getElementById(idSelector);
  let minusBtn = parentElm.getElementsByClassName(minusBtnClass)[0];
  let plusBtn = parentElm.getElementsByClassName(plusBtnClass)[0];
  let displayElm = parentElm.getElementsByClassName(displayElmClass)[0];
  
  let count = 1;
  minusBtn.addEventListener("click", ()=> {
    if (count > 1) {
      count -= 1;
      displayElm.textContent = count;
    }
  })
  
  plusBtn.addEventListener("click", ()=> {
    if (count < 10) {
      count += 1;
      displayElm.textContent = count;
    }
  })



}
