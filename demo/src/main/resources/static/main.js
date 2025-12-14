const positionsConfig = {
	  "Ours de Deninger":       { x: 35, y: 87, w: 16,  h: 18 },
      "crâne":                  { x: 40, y: 40, w: 16, h: 25 },
      "mandibule":              { x: 26, y: 74, w: 10, h: 8 },
      "atlas":                  { x: 47, y: 30, w: 5,  h: 6 },
      "axis":                   { x: 47, y: 20, w: 5,  h: 8 },
      "vertèbres thoraciques":  { x: 21, y: 25, w: 20, h: 13 },
      "côtes":                  { x: 20, y: 45, w: 18, h: 13 },
      "os hyoïde":              { x: 8, y: 55, w: 4,  h: 5 },
      "humérus":                { x: 22, y: 58, w: 9,  h: 12 },
      "radius":                 { x: 12, y: 58, w: 8,  h: 20 },
      "cubitus":                { x: 19, y: 62, w: 4,  h: 18 },
      "métacarpiens":           { x: 92, y: 50, w: 7,  h: 8 },
      "métatarsien":            { x: 55, y: 64, w: 9,  h: 20 },
      "tibia":                  { x: 57, y: 40, w: 18,  h: 19 },
      "fémur":                  { x: 53, y: 23, w: 25,  h: 14 },
      "os pénien":              { x: 7, y: 48, w: 12,  h: 5 }
    };

    // Position par défaut si l'os n'est pas dans la config
    const defaultPosition = { x: 50, y: 50, w: 8, h: 8 };

    // Récupérer les os injectés via la page (Thymeleaf) ou défaut
    const osList = (typeof window !== 'undefined' && Array.isArray(window.osList)) ? window.osList : [];

    // Génération automatique des zones
    const container = document.querySelector('.hexagonemain');

    if (osList && osList.length > 0) {
      osList.forEach((os, index) => {
        const nom = os.nom.toLowerCase();
        const position = positionsConfig[nom] || defaultPosition;

        // Si position par défaut, décaler pour éviter superposition
        if (!positionsConfig[nom]) {
          position.x = 10 + (index * 7) % 80;
          position.y = 10 + Math.floor(index / 10) * 15;
        }

        const zone = document.createElement('div');
        zone.className = 'bone-zone';
        zone.setAttribute('data-nom', os.nom);
        zone.setAttribute('data-description', os.description);
        zone.style.left = position.x + '%';
        zone.style.top = position.y + '%';
        zone.style.width = position.w + '%';
        zone.style.height = position.h + '%';

        const label = document.createElement('div');
        label.className = 'bone-label';
        label.textContent = os.nom;

        zone.appendChild(label);
        container.appendChild(zone);
      });
    }

    // ============================================
    // SYSTÈME AUDIO
    // ============================================
    function parler(texte) {
      window.speechSynthesis.cancel();

      const message = new SpeechSynthesisUtterance(texte);
      const voix = window.speechSynthesis.getVoices();

      const voixChoisie = voix.find(v => v.name.includes("Microsoft Hortense")) ||
                          voix.find(v => v.name.includes("Google français")) ||
                          voix.find(v => v.lang.startsWith('fr'));

      if (voixChoisie) message.voice = voixChoisie;

      message.lang = 'fr-FR';
      message.rate = 0.85;
      message.pitch = 1.1;

      const audioBtn = document.getElementById('audioBtn');

      message.onstart = () => {
        audioBtn.classList.add('speaking');
        audioBtn.textContent = '🔊 Lecture...';
      };

      message.onend = () => {
        audioBtn.classList.remove('speaking');
        audioBtn.textContent = '🔊 Écouter';
      };

      window.speechSynthesis.speak(message);
    }

    function arreterAudio() {
      window.speechSynthesis.cancel();
      const audioBtn = document.getElementById('audioBtn');
      audioBtn.classList.remove('speaking');
      audioBtn.textContent = '🔊 Écouter';
    }

    // Charger les voix
    window.speechSynthesis.onvoiceschanged = () => console.log("Voix chargées");

    // ============================================
    // GESTION DU MODAL
    // ============================================
    const modal = document.getElementById('boneModal');
    const closeBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const audioBtn = document.getElementById('audioBtn');

    let currentDescription = '';

    document.querySelectorAll('.bone-zone').forEach(zone => {
      zone.addEventListener('click', function(e) {
        e.stopPropagation();
        const nom = this.getAttribute('data-nom');
        const description = this.getAttribute('data-description');

        currentDescription = nom + '. ' + description;

        modalTitle.textContent = nom;
        modalDescription.textContent = description;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        // Lecture automatique
        parler(currentDescription);
      });
    });

    audioBtn.addEventListener('click', () => {
      if (audioBtn.classList.contains('speaking')) {
        arreterAudio();
      } else {
        parler(currentDescription);
      }
    });

    closeBtn.addEventListener('click', () => {
      arreterAudio();
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        arreterAudio();
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        arreterAudio();
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
