import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { savedForecast } from 'src/app/models/savedForecast';
import { weatherData } from 'src/app/models/weatherData';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { ToastrService } from 'ngx-toastr';
import { weatherObject } from 'src/app/models/weatherObject';
import { currentWeather } from 'src/app/models/currentWeather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {

  weatherTable!: ElementRef;
  savedData!: ElementRef;

 @ViewChild('weatherTable', { static: false }) set content(content: ElementRef) {
    if(content) {
      this.weatherTable = content;
      this.scroll(content.nativeElement);
    }
 }

 @ViewChild('savedData', { static: false }) set data(data: ElementRef) {
    if(data) {
      this.savedData = data;
      this.scroll(data.nativeElement);
    }
 }

  openWthData: any;
  weatherApiData: any;
  accuWeatherData: any;
  location: any;
  htmlWeather: Array<weatherObject> = [];

  ol: any;
  map: any;

  latitude: number = 0;
  longitude: number = 0;

  country: String = "";
  date: String = "";

  currWeather: currentWeather = {
    temperature: 0,
    precipitation: 0
  }

  savedForecast: savedForecast = {
    date: "",
    id: 0,
    country: "",
    region: "",
    accuTemp: 0,
    accuPrec: 0,
    openWthTemp: 0,
    openWthPrec: 0,
    wthApiTemp: 0,
    wthApiPrec: 0
  }

  weatherDataList: weatherData = {
    date: [],
    country: "",
    region: "",
    accuData: {
      temp: [],
      prec: []
    },
    openWthData: {
      temp: [],
      prec: []
    },
    wthApiData: {
      temp: [],
      prec: []
    },
  }

  weatherDataObj: weatherObject = {
    date: "",
    country: "",
    region: "",
    accuTemp: 0,
    accuPrec: 0,
    openWthTemp: 0,
    openWthPrec: 0,
    wthApiTemp: 0,
    wthApiPrec: 0
  };

  weatherForm = this.formBuilder.group({
    latitude: 0,
    longitude: 0,
    days: 0
  });

  currWeatherForm = this.formBuilder.group({
    country: "",
    date: ""
  });

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherDataService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.map = new this.ol.Map({
      target: 'map',
      layers: [
        new this.ol.layer.Tile({
          source: new this.ol.source.OSM()
        })
      ],
      view: new this.ol.View({
        center: this.ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });
  }

  setCoordinates(value: any) {
    this.latitude = value.lat;
    this.longitude = value.lon;

    this.weatherForm.get("latitude")?.reset();
    this.weatherForm.get("longitude")?.reset();
  }

  saveCurrentWeatherData = () => {
    this.weatherService.saveWeatherData(this.htmlWeather).subscribe(
      data => {
        if (data) {
          this.toastr.success("Your forecast has been saved!", "Saved!");
        }
      }
    )
  }

  getSavedForecast = (country: String, date: String) => {
    this.weatherService.getSavedForecast(country, date).subscribe(
      data => {
        this.savedForecast = data;
        this.getCurrentWeatherData(this.savedForecast.region);
      }
    )
  }

  getCurrentWeatherData = (city: String) => {
    this.weatherService.getCurrentWeatherData(city).subscribe(
      data => {
        this.currWeather.temperature = data.current.temp_c;
        if (data.current.precip_mm >= 1) {
          this.currWeather.precipitation = 100;
        } else if (data.current.precip_mm >= 0.5 && data.current.precip_mm < 1) {
          this.currWeather.precipitation = 60;
        } else {
          this.currWeather.precipitation = 0;
        }
      }
    )
  }

  getOpenWthData = (latitude: number, longitude: number, days: number) => {
    this.weatherService.getOpenWthData(latitude, longitude).subscribe(
      data => {
        this.openWthData = data;

        for (let i = 0; i < days; i++) {
          this.weatherDataList.openWthData.prec.push(Math.round(this.openWthData.daily[i].pop * 10000) / 100);
          this.weatherDataList.openWthData.temp.push(Math.round((this.openWthData.daily[i].temp.day - 273.15) * 10) / 10);
        }
      }
    )
  }

  getWeatherApiData = (latitude: number, longitude: number, days: number) => {
    this.weatherService.getWeatherApiData(latitude, longitude).subscribe(
      data => {
        this.weatherApiData = data;

        this.weatherDataList.country = this.weatherApiData.location.country;
        this.weatherDataList.region = this.weatherApiData.location.name;

        for (let i = 0; i < days; i++) {
          this.weatherDataList.date.push(this.weatherApiData.forecast.forecastday[i].date);
          this.weatherDataList.wthApiData.prec.push((this.weatherApiData.forecast.forecastday[i].day.daily_chance_of_rain + this.weatherApiData.forecast.forecastday[i].day.daily_chance_of_rain) / 2);
          this.weatherDataList.wthApiData.temp.push(this.weatherApiData.forecast.forecastday[i].day.avgtemp_c);
        }
      }
    )

  }

  getLocationCode = (latitude: number, longitude: number, days: number) => {
    this.weatherService.getLocationCode(latitude, longitude).subscribe(
      location => {
        this.location = location;

        this.getAccuWeatherData(this.latitude, this.longitude, this.location.Key, days);
      }
    )
  }

  getAccuWeatherData = (latitude: number, longitude: number, locationCode: number, days: number) => {
    this.weatherService.getAccuWeatherData(latitude, longitude, locationCode).subscribe(
      data => {
        this.accuWeatherData = data;

        for (let i = 0; i < days; i++) {
          if (this.accuWeatherData.DailyForecasts[i].Day.PrecipitationProbability) {
            this.weatherDataList.accuData.prec.push(Math.round(this.accuWeatherData.DailyForecasts[i].Day.PrecipitationProbability * 100) / 100);
          } else {
            this.weatherDataList.accuData.prec.push(0);
          }
          this.weatherDataList.accuData.temp.push((Math.round((this.accuWeatherData.DailyForecasts[i].Temperature.Maximum.Value + this.accuWeatherData.DailyForecasts[i].Temperature.Minimum.Value) / 2) * 100) / 100);
        }

        for (let i = 0; i < days; i++) {
          this.weatherDataObj = {
            date: "",
            country: "",
            region: "",
            accuTemp: 0,
            accuPrec: 0,
            openWthTemp: 0,
            openWthPrec: 0,
            wthApiTemp: 0,
            wthApiPrec: 0
          };
          this.weatherDataObj.date = this.weatherDataList.date[i];
          this.weatherDataObj.country = this.weatherDataList.country;
          this.weatherDataObj.region = this.weatherDataList.region;
          this.weatherDataObj.accuTemp = this.weatherDataList.accuData.temp[i];
          this.weatherDataObj.accuPrec = this.weatherDataList.accuData.prec[i];
          this.weatherDataObj.openWthTemp = this.weatherDataList.openWthData.temp[i];
          this.weatherDataObj.openWthPrec = this.weatherDataList.openWthData.prec[i];
          this.weatherDataObj.wthApiTemp = this.weatherDataList.wthApiData.temp[i];
          this.weatherDataObj.wthApiPrec = this.weatherDataList.wthApiData.prec[i];

          this.htmlWeather.push(this.weatherDataObj);
        }
      }
    )
  }

  onFormSubmit() {
    this.htmlWeather = [];
    this.savedForecast = {
      date: "",
      id: 0,
      country: "",
      region: "",
      accuTemp: 0,
      accuPrec: 0,
      openWthTemp: 0,
      openWthPrec: 0,
      wthApiTemp: 0,
      wthApiPrec: 0
    }
    this.weatherDataList = {
      date: [],
      country: "",
      region: "",
      accuData: {
        temp: [],
        prec: []
      },
      openWthData: {
        temp: [],
        prec: []
      },
      wthApiData: {
        temp: [],
        prec: []
      },
    };
    if (this.weatherForm.get('latitude')!.value != null && this.weatherForm.get('longitude')!.value != null) {
      this.latitude = this.weatherForm.get('latitude')!.value;
      this.longitude = this.weatherForm.get('longitude')!.value;
    }
    let daysCount = this.weatherForm.get('days')!.value;
    if (daysCount == null || daysCount == 0) {
      daysCount = 3;
    }
    this.getOpenWthData(this.latitude, this.longitude, daysCount);
    this.getWeatherApiData(this.latitude, this.longitude, daysCount);
    this.getLocationCode(this.latitude, this.longitude, daysCount);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  onCurrWeatherFormSubmit() {
    this.currWeather = {
      temperature: 0,
      precipitation: 0
    }
    this.country = this.currWeatherForm.get('country')!.value;
    this.date = this.currWeatherForm.get('date')!.value;

    this.getSavedForecast(this.country, this.date);
  }
}
