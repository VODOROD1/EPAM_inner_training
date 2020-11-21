import '../styles/css/index.css';
import {allPost,post,getAll,getByID,deleteByID,updateID} from './server.js';
// "scss": "node-sass -watch src/styles/scss -o src/styles/css"
// "scss": "sass --watch src/styles/scss:src/styles/css/."
// npm run scss


export var addNew = $(".head__addButton");
export var name = $(".modalWindow__nameField");
export var email = $(".modalWindow__emailField");
export var count = $(".modalWindow__countField");
export var price = $(".modalWindow__priceField");
export var country;
export var cities;

export var addUpdate = $("#add-update");
var currentElem = null;
var table = $(".table");
export var tbody = $(".table__body");
var masTR = tbody.children("tr");
export var arr = initialData();
export var fillArr;
// export var fillTable;
export var createNewStorage;
export var addInArr;
export var addRow;
export let addNewProductFunc;

function Storage() {
  this.delivery;
  this.count;
  this.price;
  this.name;
  this.email;
  this.id;
}

//////////////////////////////////////////////////////

function initialData() {
  let localArr = [];

  let storage1 = new Storage();
  let storage2 = new Storage();
  // let storage3 = new Storage();
  // let storage4 = new Storage();
  // let storage5 = new Storage();
///////////////////////
  storage1.delivery = {
    country: "Russia",
    city: ["Saratov", "Moskow"]
  }
  storage1.count = 3;
  storage1.price = 12;
  storage1.name = "A";
  storage1.email = "a@a.aa";
  storage1.id = null;
/////////////////////////
  storage2.delivery = {
    country: "Russia",
    city: ["Saratov", "Moskow"]
  }
  storage2.count = 3;
  storage2.price = 10;
  storage2.name = "AA";
  storage2.email = "a@a.aa";
  storage2.id = null;
/////////////////////////////
  localArr.push(storage1);
  localArr.push(storage2);
  // localArr.push(storage3);
  // localArr.push(storage4);
  // localArr.push(storage5);
  return localArr;
}

function fillTable() {
  arr.forEach(function(elem, index) {
    addRow(elem);
  })
}
window.onload = fillTable;




jQuery(function() {

      


////////////////////////////////////////////////////////////////

fillArr = function(e){
  arr = [];
  masTR.each(

    function(i, elem) {
      let storage = new Storage();
      let tdArr = elem.children;
      storage.delivery = {
        country: "Russia",
        city: ["Saratov", "Moskow"]
      }
      storage.count = Number.parseInt(tdArr[0].lastChild.innerText);
      storage.price = Number.parseInt(tdArr[1].firstChild.innerText);
      storage.name = tdArr[0].firstChild.innerText;
      storage.email = "some@mail.com";
      storage.id = null;

      arr.push(storage);
    }
  )
  console.log("Массив заполнен!");
  console.log(JSON.stringify(arr));
  // isFilled = true;
}
// document.addEventListener("load", fillArr);

////////////////////////////////////////////////////////

function pressAddNewButton(e){
  // Очистка формы модального окна
  // d.foot.reset();
  $(".modalWindow__form")[0].reset();
  addUpdate.val("Add");
  e.preventDefault();
}
addNew.click(pressAddNewButton);

///////////////////////////////////////////////////////////////////////

addNewProductFunc = function() {
  let newStorage = createNewStorage();
  arr.push(newStorage);
  post(arr.length-1);
  addRow(newStorage);
}

//////////////////////////////////////////////////////////////////////

createNewStorage = function() {
  let storage = new Storage();
  storage.delivery.country = $('input[name="country"]:checked').val(); // выбранная страна
  $('input[type="checkbox"]:checked').each(function(index, elem) {    // выбранные города
    let temp = choisenCheckboxes.eq(index).val();
    storage.delivery.city.push(temp);
  });
  storage.count = Number.parseInt(count.val());
  storage.price = Number.parseInt(price.val());
  storage.name = name.val();
  storage.email = email.val();
  storage.id = null;    
  return storage;
}

/////////////////////////////////////////////////////////////////////

addRow = function (elem) {

  // if(name.val() != "" && name.val().length < 16 && 
  // name.val().replace(/\s/g, '') != "" && count.val() != "" && price.val() != "") {
  // Далее создаем строки, ячейки, блоки и кнопки, помещаем их друг в друга
    let newTR = $('<tr/>',{
      class: 'table__row product'
    });
    //////////////////////////
    let newTD1 = $('<td/>',{
      class: 'table__data'
    });
    newTD1.appendTo(newTR);

    let newDIV1 = $('<div/>', {
      class: 'product__name',
      text: elem.name 
    });
    newDIV1.appendTo(newTD1);

    let newDIV2 = $('<div/>',{
      class: 'product__count',
      text: elem.count
    })
    newDIV2.appendTo(newTD1);
    ///////////////////////////
    let newTD2 = $('<td/>',{
      class: 'table__data'
    });
    newTD2.appendTo(newTR);

    let newDIV3 = $('<div/>',{
      class: 'product__price',
      text: elem.price
    })
    newDIV3.appendTo(newTD2);
    //////////////////////////
    let newTD3 = $('<td/>',{
      class: 'table__buttons'
    });
    newTD3.appendTo(newTR);
    
    let newDIV4 = $('<div/>',{
      class: 'table__editDelete ED',  // возможно ошибка
    })
    newDIV4.appendTo(newTD3);

    let newINPUT1 = $('<input/>', {
      class:  'ED__edit',
      type: 	'button',
      val: 	'Edit',
    });
    newINPUT1.appendTo(newDIV4);

    let newINPUT2 = $('<input/>', {
      class:  'ED__delete',
      type: 	'button',
      val: 	'Delete',
    });
    newINPUT2.appendTo(newDIV4);    

    newTR.appendTo(tbody); // помещаем новую строку в конец таблицы
  // }
}

//////////////////////////////////////////////////////////////////

function editProduct(e){
// изменение продукта
  e.preventDefault();
  let target = event.target; // где был клик?
  if (target.className != 'ED__edit') return;
  currentElem = e.target;
  addUpdate.val("Update");
  let i = currentElem.parentNode.parentNode.parentNode.rowIndex;
  let tr = $('tr')[i];
  tr.style.backgroundColor = 'yellow';
  // заполнение модального окна
  name.val(arr[i-1].name);
  email.val(arr[i-1].email);
  count.val(arr[i-1].count);
  price.val(arr[i-1].price);
  // заполнение модального окна
  // name.val(tr.cells[0].children[0].innerHTML);
  // email.val();
  // count.val(Number.parseInt(tr.cells[0].children[1].innerHTML));
  // price.val(Number.parseInt(tr.cells[1].children[0].innerHTML));
  $('input[name="country"]').each(function(index, elem){
    if($('input[name="country"]').eq(index).val() == arr[i-1].country){
      $('input[name="country"]').eq(index).prop('checked', true);
    }
  })
}
$('.table__body').click(editProduct);
// tbody.on('click', '.ED__edit', editProduct);

//////////////////////////////////////////////////////////////////////////

function delProduct(e){
  // удаление продукта
  e.preventDefault();
  let target = event.target; // где был клик?
  if (target.className != 'ED__delete') return;
// удаление продукта
  var i = e.target.parentNode.parentNode.parentNode.rowIndex;
  if(i<0) {
    return;
  }
  if (confirm('Вы действительно хотите удалить запись?')){
      table[0].deleteRow(i);
      arr.splice(i-1, 1);
  } else {
      return;
  }
  // e.stopPropagation();
}
$('.table__body').click(delProduct);

////////////////////////////////////////////////////////////////




})






















////////////////////////
//   storage3.delivery = {
//     country: "Russia",
//     city: ["Saratov", "Moskow"]
//   }
//   storage3.count = 3;
//   storage3.price = 11;
//   storage3.name = "AAA";
//   storage3.email = "a@a.aa";
//   storage3.id = null;
// /////////////////////////
//   storage4.delivery = {
//     country: "Russia",
//     city: ["Saratov", "Moskow"]
//   }
//   storage4.count = 3;
//   storage4.price = 7;
//   storage4.name = "AAAA";
//   storage4.email = "a@a.aa";
//   storage4.id = null;
// //////////////////////////
//   storage5.delivery = {
//     country: "Russia",
//     city: ["Saratov", "Moskow"]
//   }
//   storage5.count = 3;
//   storage5.price = 15;
//   storage5.name = "AAAAA";
//   storage5.email = "a@a.aa";
//   storage5.id = null;



// addRow = function (){

//   // if(name.val() != "" && name.val().length < 16 && 
//   // name.val().replace(/\s/g, '') != "" && count.val() != "" && price.val() != "") {
//   // Далее создаем строки, ячейки, блоки и кнопки, помещаем их друг в друга
//     let newTR = $('<tr/>',{
//       class: 'table__row product'
//     });
//     //////////////////////////
//     let newTD1 = $('<td/>',{
//       class: 'table__data'
//     });
//     newTD1.appendTo(newTR);

//     let newDIV1 = $('<div/>', {
//       class:  'product__name',
//       text: 	String(name.val()) 
//     });
//     newDIV1.appendTo(newTD1);

//     let newDIV2 = $('<div/>',{
//       class: 'product__count',
//       text: count.val()
//     })
//     newDIV2.appendTo(newTD1);
//     ///////////////////////////
//     let newTD2 = $('<td/>',{
//       class: 'table__data'
//     });
//     newTD2.appendTo(newTR);

//     let newDIV3 = $('<div/>',{
//       class: 'product__price',
//       text: String(price.val())
//     })
//     newDIV3.appendTo(newTD2);
//     //////////////////////////
//     let newTD3 = $('<td/>',{
//       class: 'table__buttons'
//     });
//     newTD3.appendTo(newTR);
    
//     let newDIV4 = $('<div/>',{
//       class: 'table__editDelete ED',  // возможно ошибка
//     })
//     newDIV4.appendTo(newTD3);

//     let newINPUT1 = $('<input/>', {
//       class:  'ED__edit',
//       type: 	'button',
//       val: 	'Edit',
//     });
//     newINPUT1.appendTo(newDIV4);

//     let newINPUT2 = $('<input/>', {
//       class:  'ED__delete',
//       type: 	'button',
//       val: 	'Delete',
//     });
//     newINPUT2.appendTo(newDIV4);    

//     newTR.appendTo(tbody); // помещаем новую строку в конец таблицы

//     let storage = new Storage();
//     storage.delivery.country = $('input[name="country"]:checked').val(); // выбранная страна
//     $('input[type="checkbox"]:checked').each(function(index, elem) {    // выбранные города
//       let temp = choisenCheckboxes.eq(index).val();
//       storage.delivery.city.push(temp);
//     });
//     storage.count = Number.parseInt(count.val());
//     storage.price = Number.parseInt(price.val());
//     storage.name = name.val();
//     storage.email = email.val();
//     storage.id = null;
//     // storage.delivery = {
//     //   country: "",
//     //   city: ["Saratov", "Moskow"]
//     // }
    
    
//     arr.push(storage);
//   // }
// }



fillArr = function(e){
  if(isFilled) {return}
  masTR.each(

    function(i, elem) {
      let storage = new Storage();
      let tdArr = elem.children;
      storage.delivery = {
        country: "Russia",
        city: ["Saratov", "Moskow"]
      }
      storage.count = Number.parseInt(tdArr[0].lastChild.innerText);
      storage.price = Number.parseInt(tdArr[1].firstChild.innerText);
      storage.name = tdArr[0].firstChild.innerText;
      storage.email = "some@mail.com";
      storage.id = null;

      arr.push(storage);
    }
  )
  console.log("Массив заполнен!");
  console.log(JSON.stringify(arr));
  isFilled = true;

  temp = "Проверка экспорта";
}
// jQuery(document).ready(fillArr);    // почему то срабатывает два раза
// // document.addEventListener("load", fillArr);