package com.interarc.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.interarc.demo.model.AnimalModel;
import com.interarc.demo.repository.AnimalRepository;

@Service
public class AnimalService {
    
    private final AnimalRepository animalRepository;

    @Autowired
    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public void createAnimal() {
        
    }

    public List<AnimalModel> getAllAnimals() {
        return animalRepository.getAllAnimals();
    }

    public Optional<AnimalModel> getAnimalByName(String name) {
        return animalRepository.getAnimalByName(name);
    }

    public AnimalModel getFirstAnimal() {
        List<AnimalModel> animals = animalRepository.getAllAnimals();
        return animals.isEmpty() ? null : animals.get(0);
    }
}
