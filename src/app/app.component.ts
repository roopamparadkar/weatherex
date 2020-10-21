import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private httpClient: HttpClient,
  ) { }

  title = 'Weatherex';
  weatherExist = false;
  cityName0 = new FormControl('');
  cityName1 = new FormControl('');
  cityName2 = new FormControl('');
  cityName3 = new FormControl('');
  cityName4 = new FormControl('');
  cityName5 = new FormControl('');
  cityName6 = new FormControl('');
  cityName7 = new FormControl('');
  cityName8 = new FormControl('');

  localData = {};


  allWeatherData = [
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName0
    },
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName1
    },
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName2
    },
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName3
    },
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName4
    },
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName5
    },
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName6
    },
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName7
    },
    {
      'weatherData': null,
      'iconUrl': '',
      'formController': this.cityName8
    },
  ]

  getWeather(index, formController: FormControl) {
  
    // subscriptionAlias = timer(0, 5000)
    //   .subscribe(() => {
        this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${formController.value}&units=metric&appid=082b6b4542f8165adcc1deae4ebe2258`)
          .subscribe(
            (result: any) => {
              this.weatherExist = true;
              this.allWeatherData[index].weatherData = result;
              this.allWeatherData[index].iconUrl = `http://openweathermap.org/img/wn/${result.weather[0].icon}.png`              
              // localStorage.setItem('weatherData', JSON.stringify(this.allWeatherData));
            },
            error => {
              formController.setErrors({ noCity: true });
              console.error(error)
            })
      // })
  }

  updateWeather(index) {
    this.weatherExist = false;
    localStorage.clear();
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
    // if (localStorage.getItem('weatherData')) {
    //   this.weatherExist = true;
    //   this.weatherData = JSON.parse(localStorage.getItem('weatherData'));
    //   this.iconUrl = localStorage.getItem('iconUrl');
    // }

  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
