var d = document;
var form2__inputStr = d.getElementsByClassName("form2__inputStr")[0];
var form2__outputResult = d.getElementsByClassName("form2__outputResult")[0];
var deleteSymbolsButton = d.getElementsByClassName("deleteSymbols")[0];
var divideSymbolsRE = /[\s\.\?,;:!]/;
var masOfWords = new Array();
var masOfDeletedSymbols = new Array();

deleteSymbolsButton.addEventListener("click", deleteHandler);
function deleteHandler(){
  masOfWords = form2__inputStr.value.split(divideSymbolsRE);
  for(let i=0; i<masOfWords.length; i++){
    if(masOfWords[i] == ""){
      masOfWords.splice(i,1);
      --i;
    }
  }
  if(masOfWords.length == 0){
    form2__outputResult.value == form2__inputStr.value;
  } else if(masOfWords.length == 1){
    for(let i=0; i<masOfWords[0].length; i++){
      masOfDeletedSymbols.push(masOfWords[0][i]);
    }
    deleteSymbols();
    deleteRepeatElementsInMas();
  }else{
    console.log(masOfWords);
    checkSymbol();
    deleteRepeatElementsInMas();
    deleteSymbols();
  }
}

function checkSymbol(){
  let standardWord = masOfWords[0];
  let currentWord = "";
  let symbolOfStandardWord = "";
  let symbolOfAnotherWord = "";
  let commonFlag = false;
  let localFlag = false;
  for(let k=0; k<standardWord.length; k++){
    symbolOfStandardWord = standardWord[k];
    commonFlag = false;
    for(let i=1; i<masOfWords.length; i++){
      currentWord = masOfWords[i];
      localFlag = false;
      for(let j=0; j<currentWord.length; j++){
        symbolOfAnotherWord = currentWord[j];
        if(symbolOfStandardWord == symbolOfAnotherWord){
          localFlag = true;
          break;
        }
      }
      if(localFlag == false){
        commonFlag = false;
        break;
      } else{commonFlag = true;}
    }
    if(commonFlag == true){
      masOfDeletedSymbols.push(symbolOfStandardWord);
    }
  }
}

function deleteRepeatElementsInMas(){
  for(let i=0; i<masOfDeletedSymbols.length-1; i++){
    let currentElem = masOfDeletedSymbols[i];
    for(let j=i+1; j<masOfDeletedSymbols.length; j++){
      if(masOfDeletedSymbols[i]==masOfDeletedSymbols[j]){
        masOfDeletedSymbols.splice(j, 1);
        --j;
        --i;
      }
    }
  }
}

function deleteSymbols(){
  let newString = form2__inputStr.value;
  for(let i=0;i<masOfDeletedSymbols.length;i++){
    let re = new RegExp(masOfDeletedSymbols[i],'ig');
    newString = newString.replace(re, "");
  }
  form2__outputResult.value = newString;
}

// Чего-с изволите-с?Барин-с!
// !??слово!плов Олово$$$!
// Слово$
