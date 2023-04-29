let today = new Date();
var hours = ('0' + today.getHours()).slice(-2); 
var min = today.getMinutes();

console.log(today)
console.log(hours)
console.log(min)




function jiho(td)
{
    return (td -100);
}

console.log(jiho(1000));