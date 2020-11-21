Object.defineProperty(Array.prototype, 'customMap', {
  value: function(callback) {
    var i, length = this.length, results = [];
    for (i = 0; i < length; i = i + 1) {
      results.push(callback(this[i], i, this));
    }
    return results;
  }
});

// Демонстрация работы
var numbers1 = [4, 9, 16, 25, 30];
var numbers2 = numbers1.customMap(myFunction2);

function myFunction1(val, index, array) {
    return val * 2;
}
function myFunction2(x){return ++x;}
console.log(numbers2);