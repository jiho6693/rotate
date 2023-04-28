let today = new Date();
var hours = ('0' + today.getHours()).slice(-2); 
var min = today.getMinutes();

console.log(today)
console.log(hours)
console.log(min)


if(hours === '12' ){
    console.log(1)
}
else{
    console.log(3)
}