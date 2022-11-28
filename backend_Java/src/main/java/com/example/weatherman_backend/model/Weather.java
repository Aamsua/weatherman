package com.example.weatherman_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Weather {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String date;
    private String country;
    private String region;
    private Float accuTemp;
    private Float accuPrec;
    private Float openWthTemp;
    private Float openWthPrec;
    private Float wthApiTemp;
    private Float wthApiPrec;


}
