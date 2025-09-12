export class ProductInfo {
  constructor({yearSelector, userSelector, minusBtnClass, plusBtnClass, displayElmClass}) {
    this.yearSelectorClass = yearSelector,
    this.userSelectorClass = userSelector,
    this.minusSelector = minusBtnClass,
    this.plusSelector = plusBtnClass,
    this.displayElmSelector = displayElmClass
  }

  poppulate (parentElement, dataOptions, dataFeatures) {  
    let selectElm = parentElement.querySelector("select");
    let pointsElm = parentElement.querySelectorAll(".info-point .col-11");
    console.log(pointsElm)
    let resultWrap = parentElement.querySelector(".price-result p:nth-Child(2)");

    Object.values(dataOptions).forEach(value => {
      let optionElm = document.createElement("option");
      optionElm.textContent = value["name"];
      optionElm.setAttribute("value", `${value["name"]}|${value["price"]}`);
      selectElm.appendChild(optionElm);
    })
    selectElm.firstElementChild.nextElementSibling.setAttribute("selected", "");
    resultWrap.textContent = `${selectElm.firstElementChild.nextElementSibling.value.split("|")[1]}.00`;
    selectElm.addEventListener("change", ()=> {
      let [name, price] = selectElm.value.split("|");
      resultWrap.textContent = `${price}.00`;
    })
  
    this.countCalculator (parentElement, [this.yearSelectorClass,this.userSelectorClass ], resultWrap);

  
    Object.values(dataFeatures).forEach((feature, index) => {
      pointsElm[index].textContent = feature;
    })
  }

  getElems(mainParent, classSelector) {
    let parentElm = mainParent.getElementsByClassName(classSelector)[0];
    let minusBtn = parentElm.getElementsByClassName(this.minusSelector)[0];
    let plusBtn = parentElm.getElementsByClassName(this.plusSelector)[0];
    let displayElm = parentElm.getElementsByClassName(this.displayElmSelector)[0];
    return [parentElm,
      minusBtn,
      plusBtn,
      displayElm]
    }
    
    countCalculator (mainParent, classSelectors, result) {
    classSelectors.forEach(selector => {
      let [parentElm,
        minusBtn,
        plusBtn,
        displayElm] = this.getElems(mainParent, selector);

        let count = 1;
        minusBtn.addEventListener("click", ()=> {
          if (count > 1) {
            count -= 1;
            displayElm.textContent = count;
          }
        })
        
        plusBtn.addEventListener("click",
          ()=> {
            if (count < 10) {
              count += 1;
              displayElm.textContent = count;
            }
          })
    })

  }


}