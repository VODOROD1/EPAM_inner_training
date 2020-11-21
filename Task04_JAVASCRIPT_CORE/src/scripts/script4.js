var d = document;
var form4__wrap = d.getElementsByClassName("form4__wrap")[0];
var sumArguments = d.getElementsByClassName("sumArguments")[0];
var form4_outputResult = d.getElementsByClassName("form4_outputResult")[0];
var count=1;
var lastInput = form4__wrap.lastChild.previousSibling;
var allChilds;
var callString = "chainSum";
lastInput.nodeType;

lastInput.addEventListener("input", changeHandler);
function changeHandler(e){
  valueOfChangedInput = lastInput.value;
  if(valueOfChangedInput.length == 1){
    ++count;
    let newElem = d.createElement("input");
    newElem.setAttribute("type", "text");
    newElem.setAttribute("size", "5");
    newElem.setAttribute("oninput", "changeHandler(this)");
    newElem.className = "form4__argument";
    newElem.classList.add(`form4__argument_${count}`);
    form4__wrap.appendChild(newElem);
    lastInput = newElem;
  }
}

sumArguments.addEventListener("click", sumHandler);
function sumHandler(e){
  // let code = 'alert("Привет")';
  // eval(code); // Привет
  let masOfArgsOfOneCall = new Array();
  allChilds = form4__wrap.childNodes;
  outer: 
  for(let i=0; i<allChilds.length; i++){
    if(allChilds[i].nodeType == 1){                     // проверка на тип узла, чтобы не попались текстовые узлы
      if(allChilds[i].value != ""){                     // проверка на присутствие значения в поле
        masOfArguments = allChilds[i].value.split(/,\s*/);
        if(allChilds[i].value.search(/.+,.+/) != -1){   // проверка на запятую
          masOfArgsOfOneCall = allChilds[i].value.split(/,\s*/);
          callString = callString+"(";
          for(let j=0; j<masOfArgsOfOneCall.length; j++){
            if(j == masOfArgsOfOneCall.length-1){
              callString = callString + checkArgs(masOfArgsOfOneCall[j]);
              callString = callString + ")";
              continue outer;
            } else{
              callString = callString + checkArgs(masOfArgsOfOneCall[j]);
              callString = callString + ", ";
            }
          }
        } else{
          callString = callString + "(" + checkArgs(allChilds[i].value) + ")";
        }
      } else{
        break;
      }
    }
  }
  callString = callString+"()";
  try{      // ловим ошибку
    form4_outputResult.value = eval(callString);
  }
  catch(e){
    alert("Пожалуйста вводите всего один аргумент в поле");
  }
}

function checkArgs(elemOfMas){
  if(elemOfMas[0] == "\"" && elemOfMas[elemOfMas.value.length-1] == "\""){ // Проверка на кавычки
    return elemOfMas;
  }
  if(isNaN(elemOfMas)){         // проверка, является числом или нет
    return "\'"+elemOfMas+"\'";
  }else{
    return elemOfMas;
  }
}

// Реализация функции многократного вызова
function chainSum(a){
  if(arguments.length > 1){
    throw new EvalError();    // выбрасываем ошибку в случае если аргументов более одного
  }
  let currentSum = a;
  function f(b) {
    if(arguments.length > 1){
      throw new EvalError();
    }
    if(b==undefined){
      // currentSum += 0;
      return f;
    }
    currentSum += b;
    return f;
  }
  f.toString = function() {
    if(isNaN(currentSum)){
      return currentSum-1;      // сформируется значение NaN
    }
    return currentSum;
  };
  return f;
}