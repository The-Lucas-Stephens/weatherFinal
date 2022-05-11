//setting variable to check if user zip code is valid 
var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/
//creating vue component to display weather information 
Vue.component("displayweather",{
  template:`<div class="card" style="width: 18rem;">
  <img v-bind:src="'https://openweathermap.org/img/w/'+weatherobj.weather[0].icon+'.png'" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-text weatherinfo">Weather For: {{weatherobj.name}}</h3>
    <h3 class="card-text weatherinfo">Current Weather: {{weatherobj.weather[0].main}}</h3>
    <h3 class="card-text weatherinfo">Current Temperature: {{weatherobj.main.temp}}</h3>
  </div>
</div>`,
//setting weather object as prob so component can use weather data from api call 
props:["weatherobj"]
})
//creating vue instance 
const weatherApp = new Vue({
    el: "#weatherApp",
    //creating needed data 
    data:{
        userZipCode: " ",
        weatherData:"",
        errorMessage:" ",
    },
    methods:{
      //method that makes api call and returns data as metric 
        getWeatherDataMetric(){
          this.userZipCode = document.getElementById('zipCode').value
        axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${this.userZipCode},us&units=metric&appid=3c603572a6623fb8cef3f2fb7294d1ab`
        )
        .then((response) => {
          this.weatherData = response.data
          console.log("Here is the object:");
          console.log(this.weatherData)
          console.log("User entered zip code: " +this.userZipCode)
        })
        .catch((err) => {
          console.log(err);
          console.log(this.userZipCode)
        });
        },
        //data that makes api call and returns data as imperial 
        getWeatherDataImperial(){
          this.userZipCode = document.getElementById('zipCode').value
          axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?zip=${this.userZipCode},us&units=imperial&appid=3c603572a6623fb8cef3f2fb7294d1ab`
          )
          .then((response) => {
            this.weatherData = response.data
            console.log("Here is the object:");
            console.log(this.weatherData)
            console.log("User entered zip code: " +this.userZipCode)
          })
          .catch((err) => {
            console.log(err);
            console.log(this.userZipCode)
          });

        },
        //validing user input from the input tag 

        checkZipCode(){
          this.userZipCode = document.getElementById('zipCode').value
          //if user input mataches needed input it runs the api calls
          if(this.userZipCode.match(isValidZip) ){
            this.errorMessage = " ";
            //if user temperature type is selected as metric it runs api call as metric 
            if(document.getElementById('tempType').value == "metric"){
              this.getWeatherDataMetric();
            }
            //if user temperature type is selected as imperial  it runs api call as imperial  
            else if(document.getElementById('tempType').value == "imperial"){
              this.getWeatherDataImperial()
            }
          }
          //if user input does not match then javascript displays error message in dom
          else{
            this.errorMessage ="Zip Code Must Be In A 5 Digit US Format example: 90001"
            document.getElementById('errMsg').style.color = "red";
            document.getElementById('errMsg').style.backgroundColor = "black";
          }
        }
    }
})