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

  ngOnInit() {

    this.http.get("http://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&lang=en&mode=json&APPID=53cc7e276a8de4552433ad3a2156592d")
      .subscribe(res=>{
        console.log(res);
        
      }, err=>{
        console.log(err);
        
      });
      
  }


}
