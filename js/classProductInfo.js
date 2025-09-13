export class ProductInfo {
  constructor({yearClass,userClass,minusBtnClass,plusBtnClass,displayElmClass, buttonClass}) {
    this.yearSelector = yearClass,
    this.userSelector = userClass,
    this.minusSelector = minusBtnClass,
    this.plusSelector = plusBtnClass,
    this.displayElmSelector = displayElmClass,
    this.btnsSelector = buttonClass;
  }

  poppulate(parentElement, dataOptions, dataFeatures) {
    let selectElm = parentElement.querySelector("select");
    let pointsElm = parentElement.querySelectorAll(".info-point .col-11");
    let resultWrap = parentElement.querySelector(".price-result p:nth-Child(2)");

    Object.values(dataOptions).forEach((value) => {
      let optionElm = document.createElement("option");
      optionElm.textContent = value["name"];
      optionElm.setAttribute("value", `${value["name"]}|${value["price"]}`);
      selectElm.appendChild(optionElm);
    });
    selectElm.firstElementChild.nextElementSibling.setAttribute("selected", "");
    resultWrap.textContent = `${selectElm.firstElementChild.nextElementSibling.value.split("|")[1]}.00`;

    Object.values(dataFeatures).forEach((feature, index) => {
      pointsElm[index].textContent = feature;
    });

    selectElm.addEventListener("change", () => {
      let [name, price] = selectElm.value.split("|");
      if (price === undefined) price = 0;
      resultWrap.textContent = `${price}.00`;
      this.countCalculator({
        mainParent : parentElement, 
        classSelectors: [this.yearSelector, this.userSelector], 
        resultElm : resultWrap,
        resultMainPrice : resultWrap.textContent});
      });

    this.countCalculator({
      mainParent : parentElement, 
      classSelectors: [this.yearSelector, this.userSelector], 
      resultElm : resultWrap,
      resultMainPrice : resultWrap.textContent});

    this.popupScreen(parentElement, pointsElm);

  }

  getElems(mainParent, classSelector) {
    let parentElm = mainParent.getElementsByClassName(classSelector)[0];
    let minusBtn = parentElm.getElementsByClassName(this.minusSelector)[0];
    let plusBtn = parentElm.getElementsByClassName(this.plusSelector)[0];
    let displayElm = parentElm.getElementsByClassName(
      this.displayElmSelector
    )[0];
    return [parentElm, minusBtn, plusBtn, displayElm];
  }

  countCalculator({mainParent, classSelectors, resultElm, resultMainPrice}) {
    console.log(resultMainPrice)
    classSelectors.forEach((selector) => {
      let [parentElm, minusBtn, plusBtn, displayElm] = this.getElems(mainParent,selector);
      let count = 1;
      displayElm.textContent = count;
      minusBtn.addEventListener("click", () => {
        if (count > 1) {
          count -= 1;
          displayElm.textContent = count;
          this.updatePrice(mainParent, classSelectors, resultElm, resultMainPrice);
        }
      });
      
      plusBtn.addEventListener("click", () => {
        if (count < 10) {
          count += 1;
          displayElm.textContent = count;
          this.updatePrice(mainParent, classSelectors, resultElm, resultMainPrice);
        }
      });
    });
  }

  updatePrice(mainParent, classSelectors, resultElm, resultMainPrice) {
    let userDisplay; 
    let yearDisplay;
    let ogPrice;
    classSelectors.forEach((selector) => {
      let [parentElm, minusBtn, plusBtn, displayElm] = this.getElems(mainParent,selector);
      if (selector === this.userSelector) userDisplay = displayElm;
      else if (selector === this.yearSelector) yearDisplay = displayElm;
    });

    if (resultMainPrice !== "undefined") ogPrice = resultMainPrice; 
    let updatedPrice = parseInt(ogPrice) * parseInt(userDisplay.textContent) * parseInt(yearDisplay.textContent);
    resultElm.textContent = `${updatedPrice}.00`;

    
  }

  popupScreen(mainParent, pointElms) {
    if(document.querySelector(".popup-screen")) return;
    let popupElm = document.createElement("div");
    popupElm.classList.add("popup-screen");

    let btns = mainParent.getElementsByClassName(this.btnsSelector);
    Array.from(btns).forEach(btn => {
      btn.addEventListener('click', ()=> {
        popupElm.innerHTML = `
        <div class="close-btn"> Close </div>
        <div class="card mb-3" style="max-width: 540px;">
        <h5 class="card-header"> ${mainParent.querySelector(".form-select").value.split("|")[0]} </h5>
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="${mainParent.querySelector(".img-product img").src}" class="card-img-top">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Rs. ${mainParent.querySelector(".price-result p:nth-Child(2)").textContent} </h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"> ${pointElms[0].textContent}</li>
                    <li class="list-group-item"> ${pointElms[1].textContent}</li>
                    <li class="list-group-item"> ${pointElms[2].textContent}</li>
                    <li class="list-group-item"> ${pointElms[3].textContent}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <a href="#" class="btn button-box"> Pay Now</a>
          </div>
        </div>
        `
        document.body.appendChild(popupElm);
        popupElm.querySelector(".close-btn").addEventListener("click", ()=> {
          popupElm.remove();
        })
      })
    })

  }
}

