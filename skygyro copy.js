


import * as THREE from 'three';

			import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			import { Sky } from 'three/addons/objects/Sky.js';
			import { DeviceOrientationControls } from './DeviceOrientationControls1.js';

			let camera, scene, renderer, controls;

			let sky, sun;

			const startButton = document.getElementById( 'startButton' );
			startButton.addEventListener( 'click', function () {

				init();
				initSky();
				animate();

			}, false );

			
			

			function initSky() {

				// Add Sky
				sky = new Sky();
				sky.scale.setScalar( 450000 );
				scene.add( sky );

				sun = new THREE.Vector3();

				/// GUI		

		

		        
//

				const effectController = {
					turbidity: 5.7,
					rayleigh: 1.64,
					mieCoefficient: 0.001,
					mieDirectionalG: 0.988,
					elevation: 0,
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

		
				
				
				gui.add( effectController, 'elevation', 0, 180, 0.1 ).onChange( guiChanged );
			

				guiChanged();

			}

			function init() {

				const overlay = document.getElementById( 'overlay' );
				overlay.remove();

				

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
				// camera.position.set( 0, 100, 2000 );

				// deviceorientation
				controls = new DeviceOrientationControls( camera );

				scene = new THREE.Scene();

		

				const helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
				// scene.add( helper );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 0.24;
				document.body.appendChild( renderer.domElement );
				
				// deviceorientation
				// controls = new DeviceOrientationControls( camera );
				// window.addEventListener("deviceorientation", function(event) {
				// 	// process event.alpha, event.beta and event.gamma
				// }, true);

				// const controls = new Three.OrbitControls( camera, renderer.domElement );
				// controls.addEventListener( 'change', render );
				//this.controls = new THREE.DeviceOrientationControls(camera, renderer.domElement);
				// const controls = new OrbitControls (camera, renderer.domElement);
				// controls.addEventListener( 'change', render );
				//controls.maxPolarAngle = Math.PI / 2;
				// controls.enableZoom = false;
				// controls.enablePan = false;

				initSky();

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

		
			

			