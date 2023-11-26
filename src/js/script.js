import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140 ,140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x666666);
scene.add(ambientLight); 

const CubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = CubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);


// Create Planet
function createPlanets(size, texture, position, ring){
    const Geo = new THREE.SphereGeometry(size, 30, 30);
    const Mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(Geo, Mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    
    // Ring
    if(ring){
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -(0.56) * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;

    return {mesh, obj}
}


const mercury = createPlanets(4, mercuryTexture, 30);
const venus = createPlanets(6, venusTexture, 46);
const earth = createPlanets(6.4, earthTexture, 64);
const mars = createPlanets(4.5, marsTexture, 80);
const jupiter = createPlanets(12.2, jupiterTexture, 102);
const saturn = createPlanets(10, saturnTexture, 140, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanets(7, uranusTexture, 178, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanets(7, neptuneTexture, 202);
const pluto = createPlanets(3, plutoTexture, 220);


const pointLight = new THREE.PointLight(0xFFFFFF, 5000, 99999999999999);
scene.add(pointLight);

function animate(){
    sun.rotateY(0.004);

    mercury.mesh.rotateY(0.004);
    mercury.obj.rotateY(0.015);

    venus.mesh.rotateY(0.002);
    venus.obj.rotateY(0.03);
    
    earth.mesh.rotateY(0.02);
    earth.obj.rotateY(0.021);

    mars.mesh.rotateY(0.018);
    mars.obj.rotateY(0.009);

    jupiter.mesh.rotateY(0.04);
    jupiter.obj.rotateY(0.003);

    saturn.mesh.rotateY(0.034);
    saturn.obj.rotateY(0.001);

    uranus.mesh.rotateY(0.03);
    uranus.obj.rotateY(0.0008);

    neptune.mesh.rotateY(0.032);
    neptune.obj.rotateY(0.0005);

    pluto.mesh.rotateY(0.008);
    pluto.obj.rotateY(0.00035);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});