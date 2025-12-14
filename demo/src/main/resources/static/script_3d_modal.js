import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, model3D;
let estInitialise = false;
let osSelectionne = null;

// --- 📒 LE DICTIONNAIRE DE TRADUCTION ---
// C'est ICI qu'on triche !
// À gauche : le nom dans ton HTML (data-bone)
// À droite : le "nom bizarre" que tu vois dans la console (F12)
const traductionNoms = {
    'crane':      'crâne', // <--- EXEMPLE : Remplace par le vrai nom bizarre !
    'mandibule':  'mandibule',   // Celui-là marchait déjà ?
    'cotes':      'côtes',  // <--- Remplace par le vrai nom
    'vertebres':  'Mesh_12',     // <--- Remplace par le vrai nom
    // Ajoute les autres ici...
};

const materialRouge = new THREE.MeshStandardMaterial({ 
    color: 0xff0000, emissive: 0x550000, roughness: 0.4, metalness: 0.3
});

function init3D() {
    if (estInitialise) return; 
    const conteneur = document.getElementById('conteneur-canvas-3d');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333); 
    camera = new THREE.PerspectiveCamera(45, conteneur.clientWidth / conteneur.clientHeight, 0.1, 1000);
    camera.position.set(5, 2, 8); 

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(conteneur.clientWidth, conteneur.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    conteneur.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); 
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    
    loader.load('hitem3d.glb', function (gltf) {
        model3D = gltf.scene;
        const box = new THREE.Box3().setFromObject(model3D);
        model3D.position.sub(box.getCenter(new THREE.Vector3())); 
        model3D.scale.set(5.0, 5.0, 5.0); 

        // On affiche TOUS les noms disponibles pour t'aider à remplir le dictionnaire
        console.log("--- 📋 LISTE DES NOMS DANS LE FICHIER 3D ---");
        model3D.traverse((child) => {
            if (child.isMesh) {
                child.userData.materialOrigine = child.material;
                console.log("👉 " + child.name);
            }
        });
        console.log("-------------------------------------------");

        scene.add(model3D);
        if (osSelectionne) miseEnValeurOs(osSelectionne);

    }, undefined, function (error) { console.error(error); });

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    window.addEventListener('resize', onWindowResize);
    estInitialise = true;
    animate();
}

function miseEnValeurOs(nomHtml) {
    if (!model3D) return;

    // 1. On traduit le nom HTML en nom 3D Bizarre
    let nomCherche = traductionNoms[nomHtml];
    
    // Si on n'a pas mis de traduction, on essaye le nom direct
    if (!nomCherche) nomCherche = nomHtml;

    console.log(`🔍 HTML demande : "${nomHtml}" -> Je cherche 3D : "${nomCherche}"`);

    model3D.traverse((child) => {
        if (child.isMesh) {
            // Reset couleur
            if (child.userData.materialOrigine) child.material = child.userData.materialOrigine;

            // Comparaison intelligente
            if (nomCherche && child.name.includes(nomCherche)) {
                child.material = materialRouge;
                console.log("✅ TROUVÉ ! " + child.name + " est devenu ROUGE.");
            }
        }
    });
}

function animate() { requestAnimationFrame(animate); if (controls) controls.update(); renderer.render(scene, camera); }
function onWindowResize() { if (!estInitialise) return; const c = document.getElementById('conteneur-canvas-3d'); camera.aspect = c.clientWidth / c.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(c.clientWidth, c.clientHeight); }

window.ouvrirModal3D = function(nomOs) {
    document.getElementById('modal-3d-overlay').classList.add('actif');
    osSelectionne = nomOs;
    setTimeout(() => { !estInitialise ? init3D() : (onWindowResize(), miseEnValeurOs(nomOs)); }, 100);
};
window.fermerModal3D = function() {
    document.getElementById('modal-3d-overlay').classList.remove('actif');
    osSelectionne = null;
    miseEnValeurOs(null);
};