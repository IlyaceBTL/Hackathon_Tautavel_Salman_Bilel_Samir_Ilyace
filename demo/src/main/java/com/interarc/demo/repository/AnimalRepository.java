package com.interarc.demo.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.interarc.demo.model.AnimalModel;

@Repository
public class AnimalRepository {

    private static final Logger logger = LogManager.getLogger(AnimalRepository.class);

    private final List<AnimalModel> animalList = new ArrayList<>();

    /**
     * Récupère tous les animaux du repository.
     *
     * @return une liste de tous les animaux
     */
    public List<AnimalModel> getAllAnimals() {
        return new ArrayList<>(animalList);
    }

    /**
     * Ajoute un nouvel animal au repository.
     *
     * @param animal l'animal à ajouter
     */
    public void addAnimal(AnimalModel animal) {
        animalList.add(animal);
        logger.info("Animal ajouté: {}", animal.getName());
    }

    /**
     * Met à jour un animal existant par son nom.
     *
     * @param animal l'animal mis à jour
     */
    public void updateAnimal(AnimalModel animal) {
        animalList.stream()
                .filter(a -> a.getName().equalsIgnoreCase(animal.getName()))
                .findFirst()
                .ifPresentOrElse(
                    existingAnimal -> {
                        existingAnimal.setDescription(animal.getDescription());
                        existingAnimal.setAge(animal.getAge());
                        existingAnimal.setOs(animal.getOs());
                        logger.info("Animal mis à jour: {}", animal.getName());
                    },
                    () -> logger.warn("Tentative de mise à jour d'un animal inexistant: {}", animal.getName())
                );
    }

    /**
     * Supprime un animal par son nom.
     *
     * @param name le nom de l'animal à supprimer
     */
    public void deleteAnimal(String name) {
        animalList.stream()
                .filter(a -> a.getName().equalsIgnoreCase(name))
                .findFirst()
                .ifPresent(animal -> {
                    animalList.remove(animal);
                    logger.info("Animal supprimé: {}", name);
                });
    }

    /**
     * Récupère un animal par son nom.
     *
     * @param name le nom de l'animal
     * @return un Optional contenant l'animal si trouvé
     */
    public Optional<AnimalModel> getAnimalByName(String name) {
        return animalList.stream()
                .filter(a -> a.getName().equalsIgnoreCase(name))
                .findFirst();
    }

    /**
     * Retourne le nombre d'animaux dans le repository.
     *
     * @return le nombre d'animaux
     */
    public int count() {
        return animalList.size();
    }
}
