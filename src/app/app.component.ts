import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'wheatherex';
  weatherExist = false;
  noCity = false;
  cityName = new FormControl('');

  weatherData = {};
  weatherIcon: string;
  iconUrl: string;
  localData = {};
  getWeatherSubscription: Subscription;

  constructor(private httpClient: HttpClient) { }


  getWeather() {
    this.getWeatherSubscription = timer(0, 5000)
      .subscribe(() => {
        this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName.value}&units=metric&appid=082b6b4542f8165adcc1deae4ebe2258`)
          .subscribe(
            (result: any) => {
              this.weatherData = result;
              const weatherData = result;
              const weatherIcon = weatherData.weather[0].icon
              this.iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`
              this.weatherExist = true;
              localStorage.setItem('weatherData', JSON.stringify(this.weatherData));
              localStorage.setItem('iconUrl', this.iconUrl);
            },
            error => {
              this.noCity = true;
              this.cityName.setErrors({ valid: false });
              console.error(error)
            })
      })
  }

  updateWeather() {
    this.noCity = false;
    this.weatherExist = false;
    localStorage.clear();
    this.getWeatherSubscription.unsubscribe();
  }

  checkWeatherConditions(weather) {
    if (weather == 'Rain') {
      return 'rainy';
    }
    else if (weather == 'Clouds') {
      return 'cloudy';
    }
    else if (weather == 'Sunny') {
      return 'sunny';
    }
    else {
      return 'sunny';
    }

  }
  ngOnInit(): void {
    if (localStorage.getItem('weatherData')) {
      this.weatherExist = true;
      this.weatherData = JSON.parse(localStorage.getItem('weatherData'));
      this.iconUrl = localStorage.getItem('iconUrl');
    }
    
  }

  ngOnDestroy(): void {
    localStorage.clear();
    this.getWeatherSubscription.unsubscribe();
  }
}
