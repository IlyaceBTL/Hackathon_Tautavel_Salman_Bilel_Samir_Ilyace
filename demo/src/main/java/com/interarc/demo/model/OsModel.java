package com.interarc.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OsModel {
    
    @JsonProperty("nom")
    private String nom;
    
    @JsonProperty("description")
    private String description;

    public OsModel() {}

    public OsModel(String nom, String description) {
        this.nom = nom;
        this.description = description;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
