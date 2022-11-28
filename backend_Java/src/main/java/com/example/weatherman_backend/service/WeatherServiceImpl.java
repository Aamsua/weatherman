package com.example.weatherman_backend.service;

import com.example.weatherman_backend.model.Weather;
import com.example.weatherman_backend.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j

public class WeatherServiceImpl implements WeatherService {

    private final WeatherRepository weatherRepository;

    @Override
    public List<Weather> getData() {
        return weatherRepository.findAll();
    }

    @Override
    public List<Weather> saveWeatherData(List<Weather> weatherDataList) {
        Integer arrLength = weatherDataList.size();
        log.info("Length: {}", arrLength);
        for (int i = 0; i < arrLength; i++) {
            Weather weatherObject = new Weather();
            log.info("Saving weather data with date {} to db", weatherDataList.get(0).getDate());
            Weather currObj = weatherDataList.get(i);
            weatherObject.setDate(currObj.getDate());
            weatherObject.setCountry(currObj.getCountry());
            weatherObject.setRegion(currObj.getRegion());
            weatherObject.setAccuTemp(currObj.getAccuTemp());
            weatherObject.setAccuPrec(currObj.getAccuPrec());
            weatherObject.setOpenWthTemp(currObj.getOpenWthTemp());
            weatherObject.setOpenWthPrec(currObj.getOpenWthPrec());
            weatherObject.setWthApiTemp(currObj.getWthApiTemp());
            weatherObject.setWthApiPrec(currObj.getWthApiPrec());

            weatherRepository.save(weatherObject);
        }

        return weatherDataList;
    }

    @Override
    public Weather getByCountryAndDate(String country, String date) {
        log.info("Country {} and date {}", country, date);
        return weatherRepository.findFirstByCountryAndDate(country, date);
    }


}
