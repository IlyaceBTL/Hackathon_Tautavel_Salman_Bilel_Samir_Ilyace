// --- script_audio.js ---

function activerOs(element) {
    // 1. Récupérer les données
    const nom = element.getAttribute('data-nom');
    const description = element.getAttribute('data-desc');

    // 2. Mise à jour Visuelle (La boîte de texte)
    const boite = document.getElementById('boite-description');
    document.getElementById('titre-os').innerText = nom;
    document.getElementById('texte-os').innerText = description;
    
    // Afficher la boîte
    boite.classList.add('visible');

    // 3. Lancer l'Audio
    parler(description);
}

function parler(texte) {
    // Arrêter l'ancien son s'il y en a un
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(texte);
    const voix = window.speechSynthesis.getVoices();
    
    // On cherche dans l'ordre : Audrey (Mac), Hortense (Windows), ou Google
    const voixChoisie = voix.find(v => v.name.includes("Audrey")) || 
                        voix.find(v => v.name.includes("Microsoft Hortense")) || 
                        voix.find(v => v.name.includes("Google français"));

    if (voixChoisie) {
        message.voice = voixChoisie;
        console.log("Voix utilisée : " + voixChoisie.name);
    }
    
    message.lang = 'fr-FR';
    message.rate = 0.9; // Un peu plus lent pour être pédagogique
    message.pitch = 1;
    
    window.speechSynthesis.speak(message);
}

// Sécurité : recharge la liste des voix si elles n'étaient pas prêtes au chargement
window.speechSynthesis.onvoiceschanged = function() { 
    console.log("Liste des voix chargée/mise à jour."); 
};