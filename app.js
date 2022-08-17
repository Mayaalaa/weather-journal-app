/* Global Variables */
const MyApiKey="0a6e0c23ac404db93e5e64a510b5794c";
const Url="https://api.openweathermap.org/data/2.5/weather?zip=";
const input=document.getElementById("zip");
const feelingsInput=document.getElementById("feelings");
const Btn= document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+"."+ d.getDate()+"."+ d.getFullYear();


//Click event on btn
Btn.addEventListener("click",generateMyData);
function generateMyData(){
if (!input.value || !feelingsInput.value){
    alert("sorry, you must enter a valid zip code and How are you feeling");
    return;
}
//If the client enter valid value
else{
 getWeatherData(Url,input.value,MyApiKey).then((data) =>
   postDataToServer("/addData",{
    date: newDate  ,
   temp: data.main.temp  ,

feelings:feelingsInput.value

   })
   ).then(()=>updateUI());
   
}
}
//Temperature
async function getWeatherData(Url,input,MyApiKey){
    const response=await fetch(Url+input+"&appid="+MyApiKey+"&units=metric");
    try {
        const data=await response.json()
        return data;
    } catch (error) {
        console.error(error);
    }
}
//post request
async function postDataToServer(url="",data={}){
    const response=await fetch(url, {
        method:"POST",
        credentials:"same-origin",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    try {
        const Result= await response.json()
        return Result;
    } catch (error) {
        console.error(error);
    }
}
//update UI after clicking generate btn
async function updateUI(){
    const response=await fetch("/getData");
    
    try {
        const data= await response.json()
        document.getElementById("date").innerHTML=newDate;
        document.getElementById("temp").innerHTML=data.temp;
        document.getElementById("content").innerHTML=data.feelings;
    } catch (error) {
        console.error(error);
    }
}


