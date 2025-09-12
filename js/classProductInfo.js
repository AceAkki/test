export class ProductInfo {
  constructor({
    yearSelector, userSelector, minusBtnClass, plusBtnClass, displayElmClass
  }) {
    this.yearSelector = yearSelector,
    this.userSelector = userSelector,
    this.minusBtnClass = minusBtnClass,
    this.plusBtnClass = plusBtnClass,
    this.displayElmClass = displayElmClass
  }

  poppulate (parentElm, dataOptions, dataFeatures) {
    let selectElm = parentElm.querySelector("select");
    let pointsElm = parentElm.querySelectorAll(".info-point col-11");

    Object.values(dataOptions).forEach(value => {
      let optionElm = document.createElement("option");
      optionElm.textContent = value["name"];
      optionElm.setAttribute("value", `${value["name"]}-${value["price"]}`);
      selectElm.appendChild(optionElm);
    })
    selectElm.firstElementChild.nextElementSibling.setAttribute("selected", "")
    this.countCalculator (parentElm, this.yearSelector)
    this.countCalculator (parentElm, this.userSelector)
  }

  countCalculator (mainParent, classSelector) {
    console.log(mainParent, classSelector)
    let parentElm = mainParent.getElementsByClassName(classSelector)[0];
    let minusBtn = parentElm.getElementsByClassName(this.minusBtnClass)[0];
    let plusBtn = parentElm.getElementsByClassName(this.plusBtnClass)[0];
    let displayElm = parentElm.getElementsByClassName(this.displayElmClass)[0];

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
  }


}