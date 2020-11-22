import {name, email, count, price, addUpdate, createNewStorage, addInArr,addNewProductFunc, addRow, addNew, tbody} from "./index.js";



jQuery(function() {


console.log("Файл modalWindow подключен!!!")

////////////////////////////////////////////////////////////////
// появление и закрытие модального окна
$(document).ready(function($) {

  // Appearance of modal window
  addNew.click(function() {
    $('.modalWindow-fade').fadeIn();
    return false;
  });

  // Appearance of modal window
  tbody.on('click', '.ED__edit', function() {
    $('.modalWindow-fade').fadeIn();
    return false;
  });

  // Клик по ссылке "Закрыть".
  $('.modalWindow__close').click(function() {
    $(this).parents('.modalWindow-fade').fadeOut();
    return false;
  });        

  // Закрытие по клавише Esc.
  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.modalWindow-fade').fadeOut();
    }
  });

  // Клик по фону, но не по окну.
  $('.modalWindow-fade').click(function(e) {
    if ($(e.target).closest('.modalWindow').length == 0) {
      $(this).fadeOut();					
    }
  });

});
////////////////////////////////////////////////////////////////
  function addProduct(e){
    if(addUpdate.val() == "Add"){
      if(true){
        addNewProductFunc();
      }
      $(".modalWindow__form")[0].reset();
      addUpdate.val('Add/Update');
    }
  }
  addUpdate.click(addProduct);


  function updateProduct(e){
    if(addUpdate.val() == "Update"){
      var i = currentElem.parentNode.parentNode.parentNode.rowIndex ;
      if(name.first().val()!=arr[i-1][0]||count.first().val()!=arr[i-1][1]||price.first().val()!=arr[i-1][2]){
      table[0].deleteRow(i);
      arr.splice(i-1, 1);
      if(true) {
        addNewProductFunc();
      }
      $(".foot")[0].reset();
      addUpdate.val('Add/Update');
      }else{return;}
    }else{return;}
  }
  addUpdate.click(updateProduct);

///////////////////////////////////////////////////////////////////////
// COMBOBOX
$('.option').change( () => {
  let countryCities;
  switch($(".option").val()){
    case "empty":
      let currentWrap = $(".combobox__wrapper").filter(".isDisplayed");
      currentWrap.removeClass("isDisplayed");
      currentWrap.addClass("notDisplayed");
      break;
    case "country":
      countriesAppearance();
      // очистим все checkboxes 
      let temp1 = $("input[type=checkbox]");
      let temp2 = $("input[type=checkbox]").filter(function() {
        if($(this).is(':checked')) {
          return true;
        } else {return false;}
      })
      temp2.each(function(index, elem){
        temp2.eq(index).prop('checked', false);
      });
      break;
    case "city":
      countryCities = checkCountry();
      citiesAppearance(countryCities);
      // checkAllCities(countryCities);
      countryCities = "";
      break;
  }
});

function countriesAppearance() {
  let currentWrap = $(".combobox__wrapper").filter(".isDisplayed");
  currentWrap.removeClass("isDisplayed");
  currentWrap.addClass("notDisplayed");
  
  $(".wrapCountries").removeClass("notDisplayed");
  $(".wrapCountries").addClass("isDisplayed");
} 

function checkCountry() {
  switch($('input[name="country"]:checked').val()){
    case "Russia":
      return ".wrapRussiaCities";
    case "USA":
      return ".wrapUSACities";
    case "Japan":
      return ".wrapJapanCities";
  }
}

function citiesAppearance(classOfWrapper) {
  $(".wrapCountries").removeClass("isDisplayed");
  $(".wrapCountries").addClass("notDisplayed");
  
  switch(classOfWrapper) {
    case ".wrapRussiaCities":
      $(".wrapRussiaCities").removeClass("notDisplayed");
      $(".wrapRussiaCities").addClass("isDisplayed");
      break;
    case ".wrapUSACities":
      $(".wrapUSACities").removeClass("notDisplayed");
      $(".wrapUSACities").addClass("isDisplayed");
      break;
    case ".wrapJapanCities":
      $(".wrapJapanCities").removeClass("notDisplayed");
      $(".wrapJapanCities").addClass("isDisplayed");
      break;
  }
}

$('#selectAllRussia').click(function() {
  if($(this).is(':checked')) {
    $(".selectAllRussia").each(function(index, elem) {
      $(".selectAllRussia").eq(index).prop('checked', true)
    })
  } else {
    $(".selectAllRussia").each(function(index, elem) {
      $(".selectAllRussia").eq(index).prop('checked', false)
    })
  }
})

$('#selectAllUSA').click(function() {
  if($(this).is(':checked')) {
    $(".selectAllUSA").each(function(index, elem) {
      $(".selectAllUSA").eq(index).prop('checked', true)
    })
  } else{
    $(".selectAllUSA").each(function(index, elem) {
      $(".selectAllUSA").eq(index).prop('checked', false)
    })
  }
})

$('#selectAllJapan').click(function() {
  if($(this).is(':checked')) {
    $(".selectAllJapan").each(function(index, elem) {
      $(".selectAllJapan").eq(index).prop('checked', true)
    })
  } else{
    $(".selectAllJapan").each(function(index, elem) {
      $(".selectAllJapan").eq(index).prop('checked', false)
    })
  }
})



// $('#checkbox').click(function(){
// 	if ($(this).is(':checked')){
// 		$('#controls input:checkbox').prop('checked', true);
// 	} else {
// 		$('#controls input:checkbox').prop('checked', false);
// 	}
// });
//////////////////////////////////////////////////////////
// Work with fields

  // Focus strokes
  function onfocusName(e){
    name.css("borderColor", "yellow");
  }
  name.focus(onfocusName);

  function onblurName(e){
    name.css("borderColor", "white");
  }
  name.blur(onblurName);

  function onfocusEmail(e){
    email.css("borderColor", "yellow");
  }
  email.focus(onfocusEmail);

  function onblurEmail(e){
    email.css("borderColor", "white");
  }
  email.blur(onblurEmail);

  function onfocusCount(e){
    count.css("borderColor", "yellow");
  }
  count.focus(onfocusCount);

  function onblurCount(e){
    count.css("borderColor", "white");
  }
  count.blur(onblurCount);

  function onfocusPrice(e){
    price.css("borderColor", "yellow");
  }
  price.focus(onfocusPrice);

  function onblurPrice(e){
    price.css("borderColor", "white");
  }
  price.blur(onblurPrice);
  ////////////////////////////////////////////////////////////////
  // 
})
//