import * as THREE from './js/three/build/three.module.js';
        import { DeviceOrientationControls } from './js/three/examples/jsm/controls/DeviceOrientationControls.js';

        var camera, scene, renderer, controls;

        init();
        animate();

        function init() {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
            camera.position.set(2, 2, 2);
            var box = new THREE.BoxBufferGeometry(1, 1, 1);
            var mat = new THREE.MeshBasicMaterial({
                color: 0xff0000
            })

            var boxMesh = new THREE.Mesh(box, mat);
            //controls = new DeviceOrientationControls(boxMesh);

            scene = new THREE.Scene();
            scene.add(boxMesh)

            var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
            // invert the geometry on the x-axis so that all of the faces point inward

            geometry.scale(- 1, 1, 1);
            var material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('assets/testhdi.jpg')
            });

            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            var helperGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 4, 4, 4);
            var helperMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
            var helper = new THREE.Mesh(helperGeometry, helperMaterial);
            scene.add(helper);
            //
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            //
            window.addEventListener('resize', onWindowResize, false);
        }

        function animate() {
            window.requestAnimationFrame(animate);
            camera.lookAt(0, 0, 0);
            controls.update();
            renderer.render(scene, camera);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }