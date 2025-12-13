package com.interarc.demo.services;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interarc.demo.model.AnimalModel;
import com.interarc.demo.repository.AnimalRepository;

import jakarta.annotation.PostConstruct;

@Service
public class JsonReaderService {

    private static final Logger logger = LogManager.getLogger(JsonReaderService.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final AnimalRepository animalRepository;

    @Autowired
    public JsonReaderService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @PostConstruct
    public void loadData() {
        try {
            ClassPathResource resource = new ClassPathResource("static/animal.json");
            InputStream inputStream = resource.getInputStream();
            JsonNode root = objectMapper.readTree(inputStream);
            loadAnimal(root);
        } catch (IOException e) {
            logger.error("Erreur lors de la lecture du fichier JSON: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public void loadAnimal(JsonNode root) {
        try {
            JsonNode animalsNode = root.get("animals");
            if (animalsNode == null) {
                logger.warn("Aucun noeud 'animals' trouvé dans le JSON");
                return;
            }
            AnimalModel[] animalsArray = objectMapper.treeToValue(animalsNode, AnimalModel[].class);
            List<AnimalModel> animalList = Arrays.asList(animalsArray);
            for (AnimalModel animal : animalList) {
                animalRepository.addAnimal(animal);
            }
            logger.info("{} Animal(s) loaded from animal.json", animalList.size());
        } catch (JsonProcessingException e) {
            logger.error("Error loading animal", e);
            throw new RuntimeException(e);
        }
    }
}
