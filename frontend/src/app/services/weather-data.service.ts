import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private weather_url = "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=58.990459&lon=25.574680";

  constructor(
    private http: HttpClient,
  ) { }

  getSavedForecast(country: any, date: any): Observable<any> {
    const url = "http://localhost:8080/api/weather/saved";
    const data = this.http.get(url, {
      params: {
        country: country,
        date: date
      }
    });
    return data;
  }

  saveWeatherData(weatherData: any): Observable<any> {
    const url = "http://localhost:8080/api/weather/save";
    const data = this.http.post<any>(url, weatherData);
    return data;
  }

  getCurrentWeatherData(city: String): Observable<any> {
    const url = "http://api.weatherapi.com/v1/current.json?key=23d80afb25784be797e110409221304&q=" + city + "&aqi=no";
    const data = this.http.get<any>(url);
    return data;
  }

  getOpenWthData(lat: number, lon: number): Observable<any> {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=0827dbe14786d005d4c920ab375b9306"
    const data = this.http.get(url);
    return data;
  }

  getWeatherApiData(lat: number, lon: number) {
    const url = "https://api.weatherapi.com/v1/forecast.json?key=23d80afb25784be797e110409221304&q=" + lat + "," + lon + "&days=3&aqi=no&alerts=no";
    const data = this.http.get(url);
    return data;
  }

  getLocationCode(lat: number, lon: number) {
    const url = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=8zg0b0IGQGkROIu2g1mTGEP9mENHDPw5&q=" + lat + "%2C" + lon + "";
    const data = this.http.get(url);
    return data;
  }

  getAccuWeatherData(lat: number, lon: number, locationCode: number) {
    const url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + locationCode + "?apikey=8zg0b0IGQGkROIu2g1mTGEP9mENHDPw5&metric=true";
    const data = this.http.get(url);
    return data;
  }

}
