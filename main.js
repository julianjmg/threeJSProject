import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#bg'),
        });
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const cube = new THREE.Mesh( geometry, material );



const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0xfeff00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);

const controls = new OrbitControls(camera, renderer.domElement);

const skyTexture = new THREE.TextureLoader().load('images/blueSky.jpeg');

const crunchyCatTexture = new THREE.TextureLoader().load('images/crunchyCat.jpeg');
const sphereGeometry = new THREE.SphereGeometry( 10, 22, 10 );
const crunchyCatMaterial = new THREE.MeshBasicMaterial({map: crunchyCatTexture});
const crunchyCatMesh = new THREE.Mesh(sphereGeometry, crunchyCatMaterial);

const normalTexture = new THREE.TextureLoader().load('images/normals/fabricNormalMap.png');

const torusGeo = new THREE.TorusKnotGeometry( 5, 1, 250, 5, 9, 15 );
const torusMaterial = new THREE.MeshStandardMaterial( { 
          normalMap: normalTexture,
          roughness: 0,
          metalness: .8
        } );
        
const torusKnot = new THREE.Mesh( torusGeo, torusMaterial );

renderer.render(scene, camera);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

scene.add( cube );

cube.position.z = -15;
cube.position.x = -15;
cube.rotation.x = 2;
cube.rotation.y = .5;

scene.add(icoMesh);

icoMesh.position.z= -15;
icoMesh.position.x= 15;

pointLight.position.set(0, -10, 10);

ambientLight.position.set(25, -15, -400);

scene.add(pointLight);
scene.add(ambientLight);
const lightHelper = new THREE.PointLightHelper(pointLight);
        
scene.add(lightHelper)

scene.background = skyTexture;

scene.add(crunchyCatMesh);

scene.add( torusKnot );
torusKnot.position.y = 20

function animate() {
            requestAnimationFrame( animate );
        // slowly rotate the cube:
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // rotate the icosahedron a little faster in the opposite direction:
        icoMesh.rotation.z += -0.03
        icoMesh.rotation.y += -0.03
        crunchyCatMesh.rotation.y += 0.05
        
        controls.update()
        
            renderer.render( scene, camera );
        }

animate();