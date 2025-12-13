package com.interarc.demo.controlleur;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeAudioController {
    @GetMapping("/audio")
    public String home() {
        return "frontend/home_page_audio";
    }
}