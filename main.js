import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x51138255 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create edges geometry from the original geometry
const edgesGeometry = new THREE.EdgesGeometry(geometry);

// Create a line material for the edges
const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); // White color

// Create a line mesh for the edges
const edgesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial);
scene.add(edgesMesh);

camera.position.z = 3;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}