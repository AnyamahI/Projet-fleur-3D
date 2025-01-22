import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class Flower {
    constructor(){
        console.log('Flower constructor');
        this.canvas = document.querySelector(".js-canvas");
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.flowerSize = 50;
        
        if (!this.canvas) {
            console.error("Canvas element not found!");
            return;
        }

        this.init();
    }

    init(){
        this.createScene();
        this.createCamera();
        this.createRenderer();

        this.createStem();
        this.createPistil();
        this.createPetals();
        
        this.createOrbitControls();

        this.animate();
    }

    createScene(){  
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("skyblue");
    }

    createCamera(){
        const aspectRatio = this.canvasWidth / this.canvasHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
        this.camera.position.z = 100;
        this.camera.position.y = 0;
        this.camera.position.x = 0;
    }

    createOrbitControls(){
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    createRenderer(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.canvas.appendChild(this.renderer.domElement);
    }


    createStem(){
        this.steamHeight =50;
        console.log('createStem');
        const geometry = new THREE.CylinderGeometry( 2, 2, this.flowerSize, 32 )
        const color = new THREE.Color('rgb(68, 110, 68)')
        const material = new THREE.MeshBasicMaterial( {color: color} )
        const cylinder = new THREE.Mesh( geometry, material )
        this.scene.add( cylinder )
    } 

 
    createPistil() {
        const geometry = new THREE.SphereGeometry( 4.5, 32, 16 )
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
        const sphere = new THREE.Mesh( geometry, material )
        sphere.position.y = this.flowerSize / 2
        this.scene.add( sphere )
    }

    createPetals(){
        const geometry = new THREE.TorusGeometry( 6, 1, 16, 100 )
        const color = new THREE.Color(255, 0, 0)
        const material = new THREE.MeshBasicMaterial( { color: color } )
        const torus = new THREE.Mesh( geometry, material )
        this.scene.add( torus )
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));
    
        this.controls.update();

        this.renderer.render(this.scene, this.camera);
    }
}

export { Flower };
