import {tbody} from './index.js';
import {fillArr} from './index.js';
// import {fillTable} from './index.js';
//сортировка

jQuery(function() {




////////////////////////////////////////////////////////////////
var nameArrowDirect = 0;
var priceArrowDirect = 0;
var sortByNameButton = $(".triangle_sortByName");
var sortByPriceButton = $(".triangle_sortByPrice");

function sortByName(e){
  let elem = e.target;
  if(nameArrowDirect==-1){
    sortByNameButton.removeClass("triangle_down");
  }
  if(nameArrowDirect==0){
    sortByNameButton.removeClass("triangle_initially");
  }
  if(nameArrowDirect==1){
    sortByNameButton.removeClass("triangle_up");
  }
  doSort(0,false);
  if(nameArrowDirect==-1){
    sortByNameButton.addClass("triangle_down");
  }
  if(nameArrowDirect==1){
    sortByNameButton.addClass("triangle_up");
  }
  fillArr();
}
sortByNameButton.click(sortByName);

function sortByPrice(e){
  let elem = e.target;
  if(priceArrowDirect==-1){
    sortByPriceButton.removeClass("triangle_down");
  }
  if(priceArrowDirect==0){
    sortByPriceButton.removeClass("triangle_initially");
  }
  if(priceArrowDirect==1){
    sortByPriceButton.removeClass("triangle_up");
  }
  doSort(1,true);
  if(priceArrowDirect==-1){
    sortByPriceButton.addClass("triangle_down");
  }
  if(priceArrowDirect==1){
    sortByPriceButton.addClass("triangle_up");
  }
  fillArr();
}
sortByPriceButton.click(sortByPrice);

function doSort(indexOfTD,isChsl) {
  let outStr = '';
  let masOfTR = $(".table__body").children("tr");
  let arrOfValues = [];

  masOfTR.each(function(i, elem) {
    let currentDIV = elem.children[indexOfTD].firstChild;
    if(currentDIV.innerText != null){
      arrOfValues[i]=currentDIV.innerText;
    } else {arrOfValues[i]=currentDIV.firstChild.innerText}
  })
  
  if(isChsl){
    if(priceArrowDirect==0 || priceArrowDirect==1){
      arrOfValues=arrOfValues.sort(function(a,b){return b-a}).reverse();
      priceArrowDirect = -1;
    }
    else{
      arrOfValues=arrOfValues.sort(function(a,b){return b-a});
      priceArrowDirect = 1;
    }
  } else{
      if(nameArrowDirect==0||nameArrowDirect==1){
        arrOfValues=arrOfValues.sort();
        nameArrowDirect = -1;
      } else{
        arrOfValues=arrOfValues.sort().reverse();
        nameArrowDirect=1;
      }
  }
  
  for(let r=0;r<arrOfValues.length;r++) {
    masOfTR.each(function(i, elem) {
        let currentDIV = elem.children[indexOfTD].firstChild;
        try{
          if(arrOfValues[r]==currentDIV.firstChild.innerText){
            outStr+="<tr>"+elem.innerHTML+"<\/tr>";
            currentDIV.firstChild.innerText=''}
          }catch(e){}
        try{
          if(arrOfValues[r]==currentDIV.innerText){
            outStr+="<tr>"+elem.innerHTML+"<\/tr>";
            currentDIV.innerText='';}
          }catch(e){}
    })
  }
  
  tbody.html(outStr);
}
////////////////////////////////////////////////////////////////




})