import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, model3D;
let estInitialise = false;
let osSelectionne = null;

const traductionNoms = {
    'crane':      'crâne', 
    'mandibule':  'mandibule',  
    'cotes':      'côtes', 
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

    let nomCherche = traductionNoms[nomHtml];
    
    if (!nomCherche) nomCherche = nomHtml;

    console.log(`🔍 HTML demande : "${nomHtml}" -> Je cherche 3D : "${nomCherche}"`);

    model3D.traverse((child) => {
        if (child.isMesh) {
            if (child.userData.materialOrigine) child.material = child.userData.materialOrigine;

            if (nomCherche && child.name.includes(nomCherche)) {
                child.material = materialRouge;
                console.log("✅ TROUVÉ ! " + child.name + " est devenu ROUGE.");
            }
        }
    });
}

function animate() { 
    requestAnimationFrame(animate); 
    if (controls) controls.update(); 
    renderer.render(scene, camera); 
}

function onWindowResize() { 
    if (!estInitialise) return; 
    const c = document.getElementById('conteneur-canvas-3d'); 
    camera.aspect = c.clientWidth / c.clientHeight; 
    camera.updateProjectionMatrix(); 
    renderer.setSize(c.clientWidth, c.clientHeight); 
}

window.ouvrirModal3D = function(nomOs) {
    osSelectionne = nomOs;
    setTimeout(() => { 
        !estInitialise ? init3D() : (onWindowResize(), miseEnValeurOs(nomOs)); 
    }, 100);
};

window.fermerModal3D = function() {
    osSelectionne = null;
    miseEnValeurOs(null);
};