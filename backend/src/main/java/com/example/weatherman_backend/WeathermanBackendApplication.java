package com.example.weatherman_backend;

import com.example.weatherman_backend.model.Weather;
import com.example.weatherman_backend.service.WeatherService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class WeathermanBackendApplication {


    public static void main(String[] args) {
        SpringApplication.run(WeathermanBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run (WeatherService weatherService) {
        return args -> {

            Weather example = new Weather(null, "2022-11-25", "Estonia", "Tartu", 3.4F, 3F, 4F, 5F, 1.8F, 1F);
            List<Weather> testList = Arrays.asList(example);
            weatherService.saveWeatherData(testList);
        };
    }

}
