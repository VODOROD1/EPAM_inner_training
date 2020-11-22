import {arr} from "./index.js";

const baseURL = "https://api-crud-mongo.herokuapp.com/api/v1/products";
const postURL = "https://api-crud-mongo.herokuapp.com/api/v1/products/add";
const deleteURL = "https://api-crud-mongo.herokuapp.com/api/v1/products/delete";
const updateURL = "https://api-crud-mongo.herokuapp.com/api/v1/products/update";

export let allPost;
export let post;
export let getAll;
export let getByID;
export let deleteByID;
export let updateID;

///////////////////////////////////////////////////////////

allPost = function() {
  arr.forEach(function(elem, index) {
    post(index);
  })
}
jQuery(function() {
  $('#postButton').click(allPost);
})

post = function(index) {     // index
  fetch(postURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(arr[index], ['delivery','country','city','count','price','name','email','id'])})
    .then(response => {
      let temp = response.json();
      return temp})
    .then(data => {
      console.log("POST:");
      console.log(data);
      arr[index].id = data.Data.id; // присваиваем id элементов с сервера в id элементов локального массива
    })
    .then(() => {
      updateID(index);
    })
}

/////////////////////////////////////////////////////

getAll = function (e) {
  fetch(baseURL,{
    headers: {'Content-type': 'application/json; charset=UTF-8'}
  })
    .then(response => response.json())
    .then(data => {
      console.log("GET:")
      console.log(data)
      // console.log(data[0].id)
    });
}
jQuery(function() {
  $('#getAllButton').click(getAll);
})

/////////////////////////////////////////////////////

getByID = function () {  //ID
  let ID = arr[0].id;
  fetch(baseURL + `/${ID}`,{
    headers: {'Content-type': 'application/json; charset=UTF-8'}
  })
    .then(response => response.json())
    .then(data => {
      console.log("GET by id:")
      console.log(data)
      console.log(data.Data.name)
    });
}
jQuery(function() {
  $('#getButton').click(getByID);
})

/////////////////////////////////////////////////////

deleteByID = function (ID) {
  console.log(arr);
  fetch(deleteURL + `/${ID}`, {
  method: 'DELETE',
  mode: 'cors',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({id: ID})})
  .then(response => response.json())            // OR res.text()
  .then(data => {
    console.log("DELETE:")
    console.log(data)})
}
jQuery(function() {
  $('#deleteButton').click(deleteByID);
})

/////////////////////////////////////////////////////

updateID = function (index) { // ID, data
  let ID = arr[index].id;
  fetch(updateURL + `/${ID}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(arr[index])}) //data
    .then(response => response.json())
    .then(data => {
      console.log("UPDATE by ID:");
      console.log(data);
      console.log(data.Data.name);
    })
    .catch(err => console.log(err)) // Do something with the error
}
jQuery(function() {
  $('#updateButton').click(updateID);
})




///////////////////////////////////////////////////////////