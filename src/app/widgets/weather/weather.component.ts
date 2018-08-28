import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  show = false;
  temp;
  desc;
  humidity;
  wind;
  icon;

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    setInterval(()=>{
      this.requestWeather().subscribe(res=>{
        this.showResult(res);
      }, err=>{
        console.log(err);
      });
    }, 5000)
  }

  requestWeather(){
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?lon=73.99&lat=17.61&units=metric&lang=en&mode=json&APPID=53cc7e276a8de4552433ad3a2156592d")
    // return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=dubai&units=metric&lang=en&mode=json&APPID=53cc7e276a8de4552433ad3a2156592d")
  }

  showResult(result){
    this.temp = result.main.temp;
    this.desc = result.weather[0].description;
    this.humidity = result.main.humidity;
    this.wind = result.wind.speed;
    this.icon  =result.weather[0].icon;
  }

  closeWindow(){
    this.show  = !this.show;
  }

  openWindow(){
    if(!this.show) this.show = true;
  }


}
