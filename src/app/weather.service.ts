import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import { ICurrentWeatherData } from './icurrent-weather-data';
import { environment } from 'src/environments/environments';
import { ICurrentWeather } from './icurrent-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) {}

  getCurrentWeather (city: string, country: string) {
    return this.httpClient.get<ICurrentWeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${environment.appId}`).pipe(map(data => this.ICurrentWeather(data)))
  
  }

  private transformToICurrentWeather(data:
    ICurrentWeatherData): ICurrentWeather {
      return {
        city: data.name,
        country: data.sys.country,
        date: new Date(date.dt*1000),
        temperature: data.main.temp * 9/5 - 459.67,
        description: data.weather[0].description,
        image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      }
    }
}
