import {count} from "./index.js";

export var checkCount; 
export var clipboardCount;

jQuery(function() {




////////////////////////////////////////////////
checkCount = function (e) {
  var s = e.keyCode;
  return (s > 47 && s < 58) || (s > 95 && s < 105) || (s > 32 && s < 41) || s == 8 || s == 46;
}
count.keydown(checkCount);

//В этой функции происходит чтение из буфера обмена. Применяется промис
clipboardCount = function (e){
  e.preventDefault();
  navigator.clipboard.readText().then(text => {
    if(text.match(/^\d+$/)){                         //проверка на числа
      count.value = text;
    }
  })
}
count.bind("paste",clipboardCount);

// Валидация email
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  const $result = $("#result");
  const email = $("#email").val();
  $result.text("");

  if (validateEmail(email)) {
    $result.text(email + " is valid :)");
    $result.css("color", "green");
  } else {
    $result.text(email + " is not valid :(");
    $result.css("color", "red");
  }
  return false;
}

$("#validate").on("click", validate);
////////////////////////////////////////////////////////

function tempValidate() {
  if(name.val() != "" && name.val().length < 16 && 
    name.val().replace(/\s/g, '') != "" && count.val() != "" && price.val() != "") {
      return true;
  }
}
////////////////////////////////////////////////////////




})