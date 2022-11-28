package com.example.weatherman_backend.service;

import com.example.weatherman_backend.model.Weather;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WeatherService {
    List<Weather> getData();
    List<Weather> saveWeatherData(List<Weather> weather);
    Weather getByCountryAndDate(String country, String date);
}
