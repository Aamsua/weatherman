package com.example.weatherman_backend.controller;

import com.example.weatherman_backend.model.Weather;
import com.example.weatherman_backend.service.WeatherService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class weatherController {

    private final WeatherService weatherService;

    @PostMapping("/weather/save")
    public ResponseEntity<List<Weather>> saveWeatherData(@RequestBody List<Weather> weather) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/weather/save").toUriString());

        return ResponseEntity.created(uri).body(weatherService.saveWeatherData(weather));
    }

    @GetMapping("/weather/saved")
    public ResponseEntity<Weather> getWeatherByCountryAndDate(@RequestParam String country, @RequestParam String date) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/weather/country").toUriString());

        return ResponseEntity.created(uri).body(weatherService.getByCountryAndDate(country, date));
    }
}
