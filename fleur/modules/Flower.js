import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

class Flower {
  constructor() {
    this.canvas = document.querySelector(".js-canvas");
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.flowerSize = 50;
    this.animation = {
      // Renommé de 'animate' à 'animation'
      rotationX: 0,
      rotationZ: 0,
    };

    this.init();
  }

  init() {
    this.createScene();
    this.createCamera();
    this.createRenderer();

    this.createGroupofObjects();
    this.createStem();
    this.createPistil();
    this.createPetals();
    this.addGroupToScene();

    this.createOrbitControls();

    this.animate(); // Appel de la méthode 'animate()'
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("skyblue");
  }

  createCamera() {
    const aspectRatio = this.canvasWidth / this.canvasHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    this.camera.position.set(0, 150, 200);
  }

  createOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  createGroupofObjects() {
    this.flowerGroup = new THREE.Group();
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.canvasWidth, this.canvasHeight);
    this.canvas.appendChild(this.renderer.domElement);
  }

  createStem() {
    this.stemHeight = 50; // Correction de 'steamHeight' à 'stemHeight'
    const geometry = new THREE.CylinderGeometry(1, 2, this.flowerSize, 32);
    const color = new THREE.Color("rgb(68, 110, 68)");
    const material = new THREE.MeshBasicMaterial({ color: color });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.y = this.flowerSize / 2;
    this.flowerGroup.add(cylinder);
  }

  createPistil() {
    const geometry = new THREE.SphereGeometry(3, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = this.flowerSize;
    this.flowerGroup.add(sphere);
  }

  createPetals() {
    const geometry = new THREE.TorusGeometry(6, 1, 16, 100);
    const color = new THREE.Color("rgb(255, 0, 0)");
    const material = new THREE.MeshBasicMaterial({ color: color });
    const positionsX = [-5, 0, 5, 0];
    const positionsZ = [0, -5, 0, 5];
    const rotationY = [-30, 0, 30, 0];
    const rotationX = [90, 120, 90, 60];
    for (let i = 0; i < 4; i++) {
      const torus = new THREE.Mesh(geometry, material);
      torus.position.set(positionsX[i], this.flowerSize, positionsZ[i]);
      torus.rotation.x = THREE.MathUtils.degToRad(rotationX[i]);
      torus.rotation.y = THREE.MathUtils.degToRad(rotationY[i]);
      this.flowerGroup.add(torus);
    }
  }

  addGroupToScene() {
    this.scene.add(this.flowerGroup);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.controls.update();

    if (window.app.city === "") {
      this.flowerGroup.rotation.y += 0.01;
    } else {
      if (window.app.resetAnimation) {
        this.animation.rotationX = 0;
        this.animation.rotationZ = 0;
        window.app.resetAnimation = false;
         } else {
        if (this.animation.rotationX < 17 && this.animation.rotationZ < 17) {
          const speed = 0.01 * window.app.windSpeed;
          this.animation.rotationX += speed;
          this.animation.rotationZ += speed;
        }
      }
      this.flowerGroup.rotation.x = THREE.MathUtils.degToRad(
        this.animation.rotationX
      );
      this.flowerGroup.rotation.z = THREE.MathUtils.degToRad(
        this.animation.rotationZ
      );
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export { Flower };
