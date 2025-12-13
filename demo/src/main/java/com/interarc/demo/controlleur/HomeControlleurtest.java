package com.interarc.demo.controlleur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.interarc.demo.model.AnimalModel;
import com.interarc.demo.services.AnimalService;

@Controller
public class HomeControlleurtest {
    
    private final AnimalService animalService;

    @Autowired
    public HomeControlleurtest(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping("/test")
    public String test(Model model) {
        AnimalModel animal = animalService.getFirstAnimal();
        model.addAttribute("animal", animal);
        return "frontend/home_page_test";
    }
}
