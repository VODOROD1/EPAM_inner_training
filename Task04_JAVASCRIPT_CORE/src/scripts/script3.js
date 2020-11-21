var d = document;
var form3__inputYear = d.getElementsByClassName("form3__inputYear")[0];
var form3__inputMonth = d.getElementsByClassName("form3__inputMonth")[0];
var form3__inputDay = d.getElementsByClassName("form3__inputDay")[0];
var form3__inputHour = d.getElementsByClassName("form3__inputHour")[0];
var form3__inputMinute = d.getElementsByClassName("form3__inputMinute")[0];
var form3__inputSecond = d.getElementsByClassName("form3__inputSecond")[0];
var form3__inputString = d.getElementsByClassName("form3__inputString")[0];
var form3__outputResult = d.getElementsByClassName("form3__outputResult")[0];
var formateDateButton = d.getElementsByClassName("formateDate")[0];
var date;
var masOfObjects = new Array();

Object.defineProperty(Date.prototype, 'format', {
  value: function(inputString) {
    let resultDateTime = inputString;
    let monthLong = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
    let yearRegExp = this.getFullYear();
    let monthRegExp = (String(this.getMonth()+1).length==1) ? ("0"+(this.getMonth()+1)) : (this.getMonth()+1);
    let dayRegExp = (this.getDate().toString().length ==1) ? ("0"+this.getDate()) : this.getDate();
    let hours24RegExp = (this.getHours().toString().length ==1) ? ("0"+this.getHours()) : this.getHours();
    let hours12 = (this.getHours() >= 12)? this.getHours() - 12: this.getHours();   // (hour >= 12)? hour - 12: hour;
    let hours12RegExp = (hours12.toString().length ==1) ? ("0"+hours12) : hours12;
    let minuteRegExp = (this.getMinutes().toString().length ==1) ? ("0"+this.getMinutes()) : this.getMinutes();
    let secondsRegExp = (this.getSeconds().toString().length ==1) ? ("0"+this.getSeconds()) : this.getSeconds();
  
    resultDateTime = resultDateTime.replace(new RegExp('MMMM','g'), monthLong[this.getMonth()]);
    resultDateTime = resultDateTime.replace(new RegExp('MMM', 'g'), monthShort[this.getMonth()]);
    resultDateTime = resultDateTime.replace(new RegExp('MM', 'g'), monthRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('M(?!arch)(?!ar)(?!ay)', 'g'), (this.getMonth()+1));
    resultDateTime = resultDateTime.replace(new RegExp('yyyy', 'g'), yearRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('yy', 'g'), String(yearRegExp).slice(-2));
    resultDateTime = resultDateTime.replace(new RegExp('dd', 'g'), dayRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('d', 'g'), this.getDate());
    resultDateTime = resultDateTime.replace(new RegExp('HH', 'g'), hours24RegExp);
    resultDateTime = resultDateTime.replace(new RegExp('H', 'g'), this.getHours());
    resultDateTime = resultDateTime.replace(new RegExp('hh', 'g'), hours12RegExp);
    resultDateTime = resultDateTime.replace(new RegExp('(?<!Marc)h', 'g'), hours12);
    resultDateTime = resultDateTime.replace(new RegExp('mm', 'g'), minuteRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('(?<!Septe)(?<!Nove)(?<!Dece)m(?!ber)', 'g'), this.getMinutes());
    resultDateTime = resultDateTime.replace(new RegExp('ss', 'g'), secondsRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('(?<!Augu)s(?!t)', 'g'), this.getSeconds());

    console.log(resultDateTime);
    return resultDateTime;
  }
});

formateDateButton.addEventListener("click", dateHandler);
function dateHandler(){
  date = new Date(form3__inputYear.value, form3__inputMonth.value-1, form3__inputDay.value, 
    form3__inputHour.value, form3__inputMinute.value, form3__inputSecond.value);
  form3__outputResult.value = date.format(form3__inputString.value);
}


