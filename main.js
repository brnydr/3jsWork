import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 1);

// Modify the geometry's vertices to create beveled edges
const vertices = geometry.vertices;
for (let i = 0; i < vertices.length; i++) {
  const vertex = vertices[i];
  if (isEdgeVertex(vertex, geometry)) {
    vertex.y += 0.2; // Adjust this value to control the bevel amount
  }
}

function isEdgeVertex(vertex, geometry) {
  const eps = 0.0001;
  const { x, y, z } = vertex;
  const { width, height, depth } = geometry.parameters;
  return (
    (Math.abs(x) === width / 2 && Math.abs(y) <= height / 2 + eps && Math.abs(z) <= depth / 2 + eps) ||
    (Math.abs(y) === height / 2 && Math.abs(x) <= width / 2 + eps && Math.abs(z) <= depth / 2 + eps) ||
    (Math.abs(z) === depth / 2 && Math.abs(x) <= width / 2 + eps && Math.abs(y) <= height / 2 + eps)
  );
}

geometry.verticesNeedUpdate = true;

const material = new THREE.MeshBasicMaterial({ color: 0x51138255, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}