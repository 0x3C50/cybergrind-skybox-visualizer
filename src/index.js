
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const loader = new THREE.TextureLoader();
let currentTex = loader.load("default.jpg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({});
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set( 0, 0, 1);
controls.rotateSpeed = -.25
controls.update();

const geom = new THREE.SphereGeometry(10, 32, 32)
const mat = new THREE.MeshBasicMaterial({color: "white",map:currentTex,side:THREE.BackSide})
const c = new THREE.Mesh(geom, mat)
c.scale.set(-1, 1, 1)

scene.add(c)

// const light = new THREE.AmbientLight(0xFFFFFF, 1);
// scene.add(light)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    // c.rotation.x += 0.01;
    // c.rotation.y += 0.01;
}
requestAnimationFrame(animate)

document.querySelector("#f").addEventListener("change", function(ev) {
    var fl = ev.target.files;
    console.log(fl)
    var rd = new FileReader();
    rd.onload = function(tf) {
        let bl = new Blob([tf.target.result], {type:fl[0].type})
        var t = URL.createObjectURL(bl)
        currentTex = loader.load(t)
        mat.map = currentTex
        URL.revokeObjectURL(t) 
    }
    rd.readAsArrayBuffer(fl[0]);
})