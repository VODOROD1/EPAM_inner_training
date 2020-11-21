// нахождение вещественного числа
// var regexpRealNumber = "/\d+\.\d+/gi";
// нахождение арифметических символов
// var testregexp1 = "/\+|\-|\*|\/|\(|\)|(\d+\.?\d*)=$/gi";

// var testregexp2 = "/([^\.]*\+|\-|\*|\/[^\.]*\d+\.?\d+[^\.]*)+/gi";

// var testregexp3 = "/([^\.]*(\d+\.?\d+)[^\.]*)+/gi";

var d = document;
var form1__inputStr = d.getElementsByClassName("form1__inputStr")[0];
var form1__outputResult = d.getElementsByClassName("form1__outputResult")[0];
var calculate = d.getElementsByClassName("calculate")[0];
var revealArgumentsRE = /(\d+\.?\d+)|(\+|\-|\*|\/)/gi;

calculate.addEventListener("click", calcHandler);
function calcHandler(){
  let mas = form1__inputStr.value.match(revealArgumentsRE);
  let result = parseFloat(mas[0]);
  console.log(mas);
  for(let i=0; i<=mas.length; i++){
    if(i%2 != 0){
      switch(mas[i]){
        case "+":
          result += parseFloat(mas[i+1]);
          break;
        case "-":
          result -= parseFloat(mas[i+1]);
          break;
        case "*":
          result *= parseFloat(mas[i+1]);
          break;
        case "/":
          result /= parseFloat(mas[i+1]);
          break;
        default:
          break;
      }
    }else{
      continue;
    }
  }
  // Fwaef2345gas+vsath561.15agrg-45.9867=
  console.log(result.toFixed(2));
  form1__outputResult.value = result.toFixed(2);
}
