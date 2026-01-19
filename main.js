import * as THREE from "three";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";

const canvas = document.querySelector("#webgl");

/* ================= THREE SCENE ================= */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.IcosahedronGeometry(1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x4f46e5,
  metalness: 0.4,
  roughness: 0.2,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

/* ================= ANIMATE ================= */

function animate() {
  mesh.rotation.y += 0.004;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

/* ================= SMOOTH SCROLL ================= */

const lenis = new Lenis({
  smooth: true,
  lerp: 0.08,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ================= RESIZE ================= */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


