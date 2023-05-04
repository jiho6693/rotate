import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from './Skysource.js';
import { DeviceOrientationControls } from './DeviceOrientationControls1.js';

const apiKey = "2fcd83828c7a6dd5b3be29bc0b6fdd9c"
let lat = "41.825226"; 
let lon = "-71.418884";

const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon +'&units=imperial&appid='+ apiKey +'';


let camera, scene, renderer, controls ;
// + 

let sky, sun;


const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', function () {

	
	init();
	animate();
	rock();
	

	
	}, false );

	function rock(){

		const loader01 = new GLTFLoader();
			// // load a resource
			loader01.load(
				// resource URL
				'./Rock1.glb',
				// called when the resource is loaded
				function ( gltf ) {
				
				gltf.scene.scale.set(50, 50, 50); 
				gltf.scene.position.y= -0.7
				gltf.scene.position.z= 0.4
				gltf.scene.position.x= -0.8
				gltf.scene.rotation.z = Math.PI / 2;
				gltf.scene.traverse( function ( child ){
				child.castShadow = true;
				child.receiveShadow = true;
				child.userData.link = "https://jiho6693.github.io/midterm/";
				});
					scene.add( gltf.scene );

					gltf.animations; // Array<THREE.AnimationClip>
					gltf.scene; // THREE.Group
					gltf.scenes; // Array<THREE.Group>
					gltf.cameras; // Array<THREE.Camera>
					gltf.asset; // Object

				},
				// called while loading is progressing
				function ( xhr ) {

					console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

				},
				// called when loading has errors
				function ( error ) {

					console.log( 'An error happened' );

				}
			);

			const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionalLight.position.set( 10, 10, 10 );
			scene.add( directionalLight );
			}
 

function rainy() {
	
	let cloudPartices = [];

	const starGeo = new THREE.BufferGeometry ()
	const vertices = [];
	for (let i = 0; i < 15000; i++) {
	const x = Math.random() * 400 - 300;
	const y = Math.random() * 500 - 250;
	const z = Math.random() * 400 - 200;
	vertices.push(x, y, z);
	}
	starGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	let starMaterial = new THREE.PointsMaterial({
		color:0xaaaaaa,
		size:0.5,
		transparent: true
	})
	const stars = new THREE.Points(starGeo,starMaterial)
	scene.add(stars)
	
	
	//Cloud
	const loader = new THREE.TextureLoader();
	const cloudVertices = [];
	loader.load("./smoke.png", function(texture){

		const cloudGeo = new THREE.PlaneGeometry(1000,1000);
		const cloudMaterial = new THREE.MeshLambertMaterial({
		map: texture,
		transparent: true
		});

		for(let p=0; p<25; p++) {
		let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
		cloud.position.set(
			Math.random()*800 -400,
			500,
			Math.random()*500 - 450
		);
		cloud.rotation.x = 1.16;
		cloud.rotation.y = -0.12;
		cloud.rotation.z = Math.random()*360;
		cloud.material.opacity = 0.10;
		cloudVertices.push(cloud);
		scene.add(cloud);
		}})
	
	//flash
	const flash = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
	flash.position.set(200,300,100);
	scene.add(flash);
	
	// animation
	function animate() {
		requestAnimationFrame(animate);
		cloudVertices.forEach(p => {
			p.rotation.z -=0.002;
		  });
		const positions = starGeo.attributes.position.array;
		for (let i = 1; i < positions.length; i += 3) {
			if (positions[i] < -200) {
			positions[i] = 200;
			}
			positions[i] -= 4;
		}
		starGeo.attributes.position.needsUpdate = true;
		stars.rotation.y +=0.002;
		
		renderer.render(scene, camera); 
		if(Math.random() > 0.93 || flash.power > 100) {
			if(flash.power < 100) 
			  flash.position.set(
				Math.random()*400,
				300 + Math.random() *200,
				100
			  );
			flash.power = 50 + Math.random() * 500;
		  }
	  }

	animate();

}



function clouds() {
	let cloudPartices = [];

	const loader = new THREE.TextureLoader();
	const cloudVertices = [];
	loader.load("./smoke.png", function(texture){

		const cloudGeo = new THREE.PlaneGeometry(100,100);
		const cloudMaterial = new THREE.MeshLambertMaterial({
		map: texture,
		transparent: true
		});

		for(let p=0; p<25; p++) {
		let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
		cloud.position.set(
			Math.random()*800 -400,
			500,
			Math.random()*500 - 450
		);
		cloud.rotation.x = 1.16;
		cloud.rotation.y = -0.12;
		cloud.rotation.z = Math.random()*360;
		cloud.material.opacity = 0.10;
		cloudVertices.push(cloud);
		scene.add(cloud);
		}})
	
	function animate() {
		requestAnimationFrame(animate);
		cloudVertices.forEach(p => {
			p.rotation.z -=0.002;
		  });
		}
	animate();
}

function cloudSky() {	
	let ele
	let today = new Date();
	var hours = ('0' + today.getHours()).slice(-2);
	if(hours === 5){
		ele = 0
	}else if(hours === '6'){
		ele = 5
	}else if(hours === '7'){
		ele = 15
	}else if(hours === '8'){
		ele = 30
	}else if(hours === '9'){
		ele = 45
	}else if(hours === '10'){
		ele = 60
	}else if(hours === '11'){
		ele = 75
	}else if(hours === '12'){
		ele = 90
	}else if(hours === '13'){
		ele = 105
	}else if(hours === '14'){
		ele = 120
	}else if(hours === '15'){
		ele = 135
	}else if(hours === '16'){
		ele = 150
	}else if(hours === '17'){
		ele = 160
	}else if(hours === '18'){
		ele = 165
	}else if(hours === '19'){
		ele = 180
	}else {
		ele = - 10
	}
	
	// Add Sky
	sky = new Sky();
	sky.scale.setScalar( 450000 );
	scene.add( sky );

	sun = new THREE.Vector3();

	/// GUI		

	const effectController = {
		
		turbidity: 20,
		rayleigh: 1.73,
		mieCoefficient: 0.036,
		mieDirectionalG: 0.988,
		elevation: ele,
		azimuth: 180,
		exposure: 0.13
	};

	function guiChanged() {

		const uniforms = sky.material.uniforms;
		uniforms[ 'turbidity' ].value = effectController.turbidity;
		uniforms[ 'rayleigh' ].value = effectController.rayleigh;
		uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
		uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

		const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
		const theta = THREE.MathUtils.degToRad( effectController.azimuth );

		sun.setFromSphericalCoords( 1, phi, theta );

		uniforms[ 'sunPosition' ].value.copy( sun );

		renderer.toneMappingExposure = effectController.exposure;
		renderer.render( scene, camera );
	}

		const gui = new GUI();
		 gui.add( effectController, 'elevation', 0, 180, 0.1 ).onChange( guiChanged );
		guiChanged();

}


function sunnySky() {
	
	let ele
	let today = new Date();
	var hours = ('0' + today.getHours()).slice(-2);
	if(hours === 5){
		ele = 0
	}else if(hours === '6'){
		ele = 5
	}else if(hours === '7'){
		ele = 15
	}else if(hours === '8'){
		ele = 30
	}else if(hours === '9'){
		ele = 45
	}else if(hours === '10'){
		ele = 60
	}else if(hours === '11'){
		ele = 75
	}else if(hours === '12'){
		ele = 90
	}else if(hours === '13'){
		ele = 105
	}else if(hours === '14'){
		ele = 120
	}else if(hours === '15'){
		ele = 135
	}else if(hours === '16'){
		ele = 150
	}else if(hours === '17'){
		ele = 160
	}else if(hours === '18'){
		ele = 165
	}else if(hours === '19'){
		ele = 180
	}else {
		ele = - 10
	}
	
	// Add Sky
	sky = new Sky();
	sky.scale.setScalar( 450000 );
	scene.add( sky );

	sun = new THREE.Vector3();

	/// GUI		

	const effectController = {
		
		turbidity: 8.2,
		rayleigh: 1.98,
		mieCoefficient: 0.04,
		mieDirectionalG: 0.95,
		elevation: ele,
		azimuth: 180,
		exposure: 0.18
	};

	function guiChanged() {

		const uniforms = sky.material.uniforms;
		uniforms[ 'turbidity' ].value = effectController.turbidity;
		uniforms[ 'rayleigh' ].value = effectController.rayleigh;
		uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
		uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

		const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
		const theta = THREE.MathUtils.degToRad( effectController.azimuth );

		sun.setFromSphericalCoords( 1, phi, theta );

		uniforms[ 'sunPosition' ].value.copy( sun );

		renderer.toneMappingExposure = effectController.exposure;
		renderer.render( scene, camera );
	}

		const gui = new GUI();

		 gui.add( effectController, 'elevation', 0, 180, 0.1 ).onChange( guiChanged );
		
		 guiChanged();

}

function init() {

	const overlay = document.getElementById( 'overlay' );
	overlay.remove();

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();

	

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
	camera.position.set( 0, 1, 2 );

	// deviceorientation

	// const controls = new OrbitControls( camera, renderer.domElement );
	// controls.addEventListener( 'change', render );
	// // //controls.maxPolarAngle = Math.PI / 2;
	// controls.enableZoom = false;
	// controls.enablePan = false;
	controls = new DeviceOrientationControls( camera );

	scene = new THREE.Scene();


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 0.18;
	document.body.appendChild( renderer.domElement );
	
	
	fetch(url)
.then(response => response.json())
.then((data) => { console.log(data)
	const weather = data.weather[0].main;
	if(weather === 'Rainy'|| weather === 'Clousds'){
		
		cloudSky();
		rainy(); 
	
		
	} else if(weather === 'Clouds'){
		cloudSky();
		clouds();
	} else{
		sunnySky();

	}

	
})

function changeCursor(event) {
	if (event.target === renderer.domElement) {
	  renderer.domElement.style.cursor = 'pointer';
	} else {
	  renderer.domElement.style.cursor = 'default';
	}
  }
  renderer.domElement.addEventListener('mousemove', function(event) {
	var raycaster = new THREE.Raycaster();
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(pointer, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
	  changeCursor(event);
	} else {
	  changeCursor(event);
	}
  });

// Add an event listener for mousedown and touchstart events
function onMouseClick( event) {
    // Calculate mouse position
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    // Set raycaster
    raycaster.setFromCamera( pointer, camera );

    // Check for intersections
    var intersects = raycaster.intersectObjects( scene.children );

    // If an intersection is found, redirect to the desired URL

	//one
	if ( intersects.length > 0 ) {
		const { link } = intersects[0].object.userData;
		if (link === '1'){
	    }
		else {
		window.location.href = link, '_blank';
	    }
    }

}


window.addEventListener( 'pointerdown', onMouseClick, false );	 

	window.addEventListener( 'resize', onWindowResize );

}

function animate() {

	window.requestAnimationFrame( animate );	
	

	controls.update();
	renderer.render( scene, camera );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}




