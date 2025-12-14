function activerOs(element) {

    const nom = element.getAttribute('data-nom');
    const description = element.getAttribute('data-desc');

  
    const boite = document.getElementById('boite-description');
    document.getElementById('titre-os').innerText = nom;
    document.getElementById('texte-os').innerText = description;
    

    boite.classList.add('visible');


    parler(description);
}

function parler(texte) {

    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(texte);
    const voix = window.speechSynthesis.getVoices();
    
  
    const voixChoisie = voix.find(v => v.name.includes("Audrey")) || 
                        voix.find(v => v.name.includes("Microsoft Hortense")) || 
                        voix.find(v => v.name.includes("Google français"));

    if (voixChoisie) {
        message.voice = voixChoisie;
        console.log("Voix utilisée : " + voixChoisie.name);
    }
    
    message.lang = 'fr-FR';
    message.rate = 0.9; 
    message.pitch = 1;
    
    window.speechSynthesis.speak(message);
}


window.speechSynthesis.onvoiceschanged = function() { 
    console.log("Liste des voix chargée/mise à jour."); 
};