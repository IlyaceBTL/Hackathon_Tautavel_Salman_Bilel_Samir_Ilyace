package com.interarc.demo.controlleur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.interarc.demo.model.AnimalModel;
import com.interarc.demo.services.AnimalService;

@Controller
public class HomeAudioController {

    // 1. On déclare la variable sans lui donner de valeur (= null est supprimé)
    private final AnimalService animalService;

    @Autowired
    // 2. Le constructeur porte maintenant le bon nom : HomeAudioController
    public HomeAudioController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping("/audio")
    public String home(Model model) {
        // Cette partie était déjà correcte !
        AnimalModel animal = animalService.getFirstAnimal();
        model.addAttribute("animal", animal);
        return "frontend/home_page_audio"; 
    }
}