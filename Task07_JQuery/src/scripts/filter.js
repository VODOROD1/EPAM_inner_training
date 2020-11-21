// Фильтрация
jQuery(function() {




  
////////////////////////////////////////////////////////////////
var filter = $('.head__searchText');
var searchButton = $(".head__searchButton");
var rows = $(".table__body").find('.product');
var filterObj = new Filter(filter);   // список строк таблицы

filterObj._setAction(function () {walkThrough(rows);});

function Filter(currentFilter) {
  /* Выравниваем пришедший аргумент к массиву */
  this.currentFilter = currentFilter;
  this.validate = function (cellValue) {
    if ( false === this._validate(cellValue, this.currentFilter) ) {
        return false;
    }
  }
  this._validate = function (cellValue, filter) {
    /* Если в фильтр напихали пробелов или другой непечатной фигни - удаляем: */
    filter.val(filter.val().replace(/^\s+$/g, ""));
    /* "Фильтр содержит значение и оно совпало со значением ячейки" */
    return !filter.val() || filter.val() == cellValue;
  }
  this._setAction = function (callback) {
    searchButton.click(callback);
  }
};

function walkThrough() {
  // Метод, вызываемый при нажатии на кнопку search
  let tr;
  let nameOfProduct;
  rows.each(function(i, elem) {
    tr = rows.eq(i);
    nameOfProduct = tr.children().eq(0).children().eq(0).text();
    if (false === filterObj.validate(nameOfProduct) ) {
        tr.css("display", "none"); 
        // break;
    } else {
        tr.css("display", "");
    }
  })
};
////////////////////////////////////////////////////////////////////////




})