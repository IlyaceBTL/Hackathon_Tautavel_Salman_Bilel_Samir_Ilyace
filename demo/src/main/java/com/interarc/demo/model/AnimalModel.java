package com.interarc.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AnimalModel {
    
    @JsonProperty("nom")
    private String name;
    
    @JsonProperty("description")
    private String description;
    
    @JsonProperty("age")
    private Integer age;
    
    @JsonProperty("os")
    private List<OsModel> os;

    public AnimalModel() {}

    public AnimalModel(String name, String description, Integer age, List<OsModel> os) {
        this.name = name;
        this.description = description;
        this.age = age;
        this.os = os;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public List<OsModel> getOs() {
        return os;
    }

    public void setOs(List<OsModel> os) {
        this.os = os;
    }
}
