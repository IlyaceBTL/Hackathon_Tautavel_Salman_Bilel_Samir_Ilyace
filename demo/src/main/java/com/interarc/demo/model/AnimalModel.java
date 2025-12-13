package com.interarc.demo.model;

import java.util.List;

public class AnimalModel 
{
    private String Name;
    private String Description;
    private Integer Age;
    private List<String> os;

    public String getName() {
        return Name;
    }
    public void setName(String name) {
        Name = name;
    }
    public String getDescription() {
        return Description;
    }
    public void setDescription(String description) {
        Description = description;
    }
    public Integer getAge() {
        return Age;
    }
    public void setAge(Integer age) {
        Age = age;
    }

    public List<String> getOs() {
        return os;
    }
    
    public void setOs(List<String> os) {
        this.os = os;
    }

    public AnimalModel(String name, String description, Integer age, List<String> os) {
        Name = name;
        Description = description;
        Age = age;
        this.os = os;
    }
}
