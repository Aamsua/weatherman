package com.example.weatherman_backend.repository;

import com.example.weatherman_backend.model.Weather;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
    Weather findFirstByCountryAndDate(String country, String date);
}
