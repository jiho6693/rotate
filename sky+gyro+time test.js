			import * as THREE from 'three';
			import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
			import { OrbitControls } from 'OrbitControls';
			import { GLTFLoader } from 'GLTFLoader';
			import { Sky } from './Skysource.js';
			import { DeviceOrientationControls } from './DeviceOrientationControls1.js';
			
			const apiKey = "2fcd83828c7a6dd5b3be29bc0b6fdd9c"
			let lat = "41.825226"; 
			let lon = "-71.418884";

			const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon +'&units=imperial&appid='+ apiKey +'';

		
			let camera, scene, renderer;

			let sky, sun;

			init();
			rock();
			render();
			fetch(url)
			.then(response => response.json())
			.then((data) => { console.log(data)
				const weather = data.weather[0].main;
				if(weather === 'Rainy'|| weather === 'Clouds'){
					rainy(); 
					initSky();
				} else {
					initSky1();
				}

			})

			function rock(){
			
			const loader01 = new GLTFLoader();
				// // load a resource
				loader01.load(
					// resource URL
					'./goodby.glb',
					// called when the resource is loaded
					function ( gltf ) {
					
					gltf.scene.scale.set(50, 50, 50); 
					gltf.scene.position.y= -10
					gltf.scene.position.z= 0
					gltf.scene.position.x= 0
					gltf.scene.rotation.z = Math.PI / 2;
					gltf.scene.traverse( function ( child ){
					child.castShadow = true;
					child.receiveShadow = true;
					child.userData.link = "1";
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
				}

			function rainy() {
				scene.fog = new THREE.FogExp2(0x11111f, 2);
				scene.background = new THREE.Color(0x000000); 

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

			function initSky1() {

				

				// Add Sky
				sky = new Sky();
				sky.scale.setScalar( 450000 );
				scene.add( sky );

				sun = new THREE.Vector3();
				
				let today = new Date();
				var hours = ('0' + today.getHours()).slice(-2); 
				var min = today.getMinutes();
				var seconds = today.getSeconds();
				let ele = 50;
				if(seconds === 5){
					ele = 0
				}else if(seconds === '6'){
					ele = 5
				}else if(seconds === '7'){
					ele = 15
				}else if(seconds === '8'){
					ele = 30
				}else if(seconds === '9'){
					ele = 45
				}else if(seconds === '10'){
					ele = 60
				}else if(seconds === '11'){
					ele = 75
				}else if(seconds === '12'){
					ele = 90
				}else if(seconds === '13'){
					ele = 105
				}else if(seconds === '14'){
					ele = 120
				}else if(seconds === '15'){
					ele = 135
				}else if(seconds === '16'){
					ele = 150
				}else if(seconds === '17'){
					ele = 160
				}else if(seconds === '18'){
					ele = 165
				}else if(seconds === '19'){
					ele = 180
				}else {
					ele = - 10
				}
				/// GUI

				const effectController = {
					turbidity: 10,
					rayleigh: 3,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.7,
					elevation: ele,
					azimuth: 180,
					exposure: 0.1
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

				gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

				guiChanged();

			}

		

			function initSky() {

				

				// Add Sky
				sky = new Sky();
				sky.scale.setScalar( 450000 );
				scene.add( sky );

				sun = new THREE.Vector3();


				/// GUI

				const effectController = {
					turbidity: 10,
					rayleigh: 3,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.7,
					elevation: 100,
					azimuth: 180,
					exposure: renderer.toneMappingExposure
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

				gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
				gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
				gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

				guiChanged();

			}

			function init() {

				
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
				camera.position.set( 0, 0, 1);

				scene = new THREE.Scene();

				const helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
				//scene.add( helper );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 0.5;
				document.body.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				//controls.maxPolarAngle = Math.PI / 2;
				controls.enableZoom = false;
				controls.enablePan = false;

				const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
				scene.add( light );

				initSky();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {
				// const time = Date.now() * 0.0005;

				// elevation = ( time ) + 1.25;


				renderer.render( scene, camera );

			}

			