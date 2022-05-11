var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/

Vue.component("displayweather",{
  template:`<div class="card" style="width: 18rem;">
  <img v-bind:src="'https://openweathermap.org/img/w/'+weatherobj.weather[0].icon+'.png'" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-text weatherinfo">Weather For: {{weatherobj.name}}</h3>
    <h3 class="card-text weatherinfo">Current Weather: {{weatherobj.weather[0].main}}</h3>
    <h3 class="card-text weatherinfo">Current Temperature: {{weatherobj.main.temp}}</h3>
  </div>
</div>`,
props:["weatherobj"]
})

const weatherApp = new Vue({
    el: "#weatherApp",
    data:{
        userZipCode: " ",
        weatherData:"",
        errorMessage:" ",
    },
    methods:{
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
        checkZipCode(){
          this.userZipCode = document.getElementById('zipCode').value
          if(this.userZipCode.match(isValidZip) ){
            this.errorMessage = " ";
            if(document.getElementById('tempType').value == "metric"){
              this.getWeatherDataMetric();
            }
            else if(document.getElementById('tempType').value == "imperial"){
              this.getWeatherDataImperial()
            }
          }
          else{
            this.errorMessage ="Zip Code Must Be In A 5 Digit US Format example: 90001"
          }
        }
    }
})