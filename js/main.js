import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer;

init();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x7ebef2);
    scene.fog = new THREE.FogExp2(0x6d77c2, 0.002);
    console.log(scene);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(400, 0, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // Large "trees" with cylindrical bases and conical tops
    const trunkGeometry = new THREE.CylinderGeometry(3, 3, 20, 32);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513, flatShading: true });

    const foliageGeometry = new THREE.ConeGeometry(10, 30, 32);
    const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, flatShading: true });

    for (let i = 0; i < 500; i++) {
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.x = Math.random() * 1600 - 800;
        trunk.position.y = 7;
        trunk.position.z = Math.random() * 1600 - 800;
        trunk.updateMatrix();
        trunk.matrixAutoUpdate = false;
        scene.add(trunk);

        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.x = trunk.position.x;
        foliage.position.y = trunk.position.y + 20;
        foliage.position.z = trunk.position.z;
        foliage.updateMatrix();
        foliage.matrixAutoUpdate = false;
        scene.add(foliage);
    }

    // Small pyramids (grass)
    const geometrySmall = new THREE.ConeGeometry(1, 6, 4, 1);
    const materialSmall = new THREE.MeshPhongMaterial({ color: 0x00ff00, flatShading: true });

    for (let i = 0; i < 5000; i++) {
        const mesh = new THREE.Mesh(geometrySmall, materialSmall);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);
    }

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    controls.update();

    render();

}

function render() {

    renderer.render(scene, camera);

}
