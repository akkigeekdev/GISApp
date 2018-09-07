import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    this.requestWeather().subscribe(res=>{
      this.showResult(res);
    }, err=>{
      console.log(err);
    });
    setInterval(()=>{
      this.requestWeather().subscribe(res=>{
        this.showResult(res);
      }, err=>{
        console.log(err);
      });
    }, 120000)
   
  }

  requestWeather(){
   return this.http.get("http://192.168.1.11:7700/Service.svc/GetWeatherData");
  }

  showResult(result){
    let result_row = JSON.parse(result);
    this.temp = result_row[0].AMB_TEMP_VALUE;
    this.desc = result_row[0].WEATHER_DESC;
    this.humidity = result_row[0].HUMIDITY_VALUE;
    this.wind = result_row[0].WIND_SPEED;
    this.icon  =result_row[0].ICON;
  }

  closeWindow(){
    this.show  = !this.show;
  }

  openWindow(){
    if(!this.show) this.show = true;
  }


}
