import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import gsap from '/node_modules/gsap/index.js'




function main() {
    const customCursor = document.querySelector('.cursor')
    const canvas = document.createElement('canvas');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });



    
    renderer.setScissorTest(true);

    

    const sceneElements = [];
    function addScene(elem, fn) {

        const ctx = document.createElement('canvas').getContext('2d');
        elem.appendChild(ctx.canvas);
        sceneElements.push({ elem, ctx, fn });

        

    }

    function makeScene(elem) {

        const scene = new THREE.Scene();
        let fov = 35;
        const aspect = 2; // the canvas default
        const near = 0.1;
        const far = 20;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(-10, 6, -10);
        camera.lookAt(0, 0, 0);
        const helper = new THREE.CameraHelper(camera);
        scene.add(helper);
       

        scene.add(camera);

        // const light = new THREE.AmbientLight(0x404040, 20); // soft white light
        // scene.add(light);

        const cameraGroup = new THREE.Group()
        scene.add(cameraGroup)

        const camera2 = new THREE.PerspectiveCamera(75, aspect, near, far)
        camera2.position.set(0, 0, 3)
        camera2.rotation.set(0, 0, 0)
        cameraGroup.add(camera2)
        scene.add(cameraGroup)

        camera2.lookAt(0, 0, 0);
        // const helper2 = new THREE.CameraHelper(camera2);
        // scene.add(helper2);

        const controls = new TrackballControls(camera, elem);
        controls.noZoom = true;
        controls.noPan = true;

        const controls2 = new TrackballControls(camera2, elem);
        controls2.noZoom = true;
        controls2.noPan = true;

   
    

        // const fillLight = new THREE.PointLight(0xffffff, 5000, 12, 5)
        // fillLight.position.set(0, 0, 0)
        // scene.add(fillLight) 
        // camera.add(fillLight);

        // const sphereSize = 0.5;
        // const pointLightHelper = new THREE.PointLightHelper(fillLight, sphereSize);
        // scene.add(pointLightHelper);


// добавление курсора
        const cursor = { x: 0, y: 0 }
        const clock = new THREE.Clock()
        let previousTime = 0
        document.addEventListener('mousemove', (event) => {
            event.preventDefault()

            cursor.x = event.clientX / window.innerWidth;
            cursor.y = event.clientY / window.innerHeight;
            // cursor.x = event.clientX / window.innerWidth - 0.5
            // cursor.y = event.clientY / window.innerHeight - 0.5
            

            handleCursor(event)
        }, true)

        const handleCursor = (e) => {
            const x = e.clientX
            const y = e.clientY
            customCursor.style.cssText = `left: ${x}px; top: ${y}px;`

            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime


            // const parallaxY = cursor.y
            // fillLight.position.y -= (parallaxY * 3 + fillLight.position.y - 2) * deltaTime

            // const parallaxX = cursor.x
            // fillLight.position.x += (parallaxX * 3 - fillLight.position.x) * 2 * deltaTime

            // cameraGroup.position.z -= (parallaxY / 3 + cameraGroup.position.z) * 2 * deltaTime
            // cameraGroup.position.x += (parallaxX / 3 - cameraGroup.position.x) * 2 * deltaTime

            

        }
        
    
        
        return { scene, camera, camera2, controls, controls2, cameraGroup, handleCursor };
    }

    



// ------------------------------------

    const sceneInitFunctionsByName = {

        'sphere': (elem) => {

            const { scene, camera, camera2, controls } = makeScene(elem);
            
            const grassAlbedo2 = new THREE.TextureLoader().load('static/space-cruiser-panels2_albedo.png');
            const grassAo2 = new THREE.TextureLoader().load('static/space-cruiser-panels2_ao.png');
            const grassHeight2 = new THREE.TextureLoader().load('static/space-cruiser-panels2_height.png');
            const grassMetalic2 = new THREE.TextureLoader().load('static/space-cruiser-panels2_metallic.png');
            const grassNormal2 = new THREE.TextureLoader().load('static/space-cruiser-panels2_normal-ogl.png');
            const grassRougnes2 = new THREE.TextureLoader().load('static/space-cruiser-panels2_roughness.png');


            const sphereGeometry2 = new THREE.SphereGeometry(1.5, 32, 32);
            const uv2sphereGeometry2 = new THREE.BufferAttribute(sphereGeometry2.attributes.uv.array, 2);
            sphereGeometry2.setAttribute('uv2', uv2sphereGeometry2);

            const material2 = new THREE.MeshStandardMaterial();
            material2.map = grassAlbedo2;
            material2.roughnessMap = grassRougnes2;
            material2.roughness = 1;
            material2.metalnessMap = grassMetalic2;
            material2.metalness = 1;
            material2.normalMap = grassNormal2;
            material2.displacementMap = grassHeight2;
            material2.displacementScale = 0.1

            material2.aoMap = grassAo2;
            material2.aoMapIntensity = 1;
            material2.side = 2;

            const sphereGeo2 = new THREE.Mesh(sphereGeometry2, material2);
            sphereGeo2.position.x = 0;
            sphereGeo2.castShadow = true;
            scene.add(sphereGeo2);


            // пользоввательские данные 
            sphereGeo2.userData.draggable = true;
            sphereGeo2.userData.name = 'SPHERY2'




// СВЕТ _______________________________________________
            // const spotLight = new THREE.SpotLight(0xffffff, 100);
            // spotLight.position.set(-3, 7, -3);
            // spotLight.angle = Math.PI / 9;
            // spotLight.penumbra = 1;
            // spotLight.decay = 2;
            // spotLight.castShadow = true;

            // spotLight.shadow.mapSize.width = 1024;
            // spotLight.shadow.mapSize.height = 1024;
            // spotLight.shadow.radius = 50;

            // spotLight.shadow.camera.near = 1;
            // spotLight.shadow.camera.far = 100;
            // spotLight.shadow.camera.fov = 30;

            // spotLight.shadow.camera.left = 5;
            // spotLight.shadow.camera.right = 5;
            // spotLight.shadow.camera.top = 5;
            // spotLight.shadow.camera.bottom = 5;

            // scene.add(spotLight)

            return (time, rect) => {

                camera.aspect = rect.width / rect.height;
                camera.updateProjectionMatrix();
                camera2.aspect = rect.width / rect.height;
                // sphereGeo2.rotation.x += 0.005;
                // sphereGeo2.rotation.y += 0.005;
                camera2.updateProjectionMatrix();
                controls.handleResize();
                controls.update();
                renderer.shadowMap.enabled = true
                renderer.render(scene, camera, camera2);

            };

        },

// -------------------------------------------



        'box': (elem) => {

            const { scene, camera, camera2, controls } = makeScene(elem);
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();
            // camera2.position.set(0,0,0)


            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshLambertMaterial({ color: 0x5837CD });
            var mesh = new THREE.Mesh(geometry, material);

            camera.position.z = 0;
            scene.add(mesh);

            let meshX = -30;
            for (var i = 0; i < 25; i++) {
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = (Math.random() - 0.5) * 10;
                mesh.position.y = (Math.random() - 0.5) * 10;
                mesh.position.z = (Math.random() - 0.5) * 10;
                scene.add(mesh);
                meshX += 1;
            }

            var light = new THREE.PointLight(0xFFFFFF, 40, 15000)
            light.position.set(0, 0, 0);
            scene.add(light);

            scene.fog = new THREE.Fog(0xFFE599, 10, 15);

            const color = "rgb(62, 61, 61)";
            scene.background = new THREE.Color(color);

            const loader = new GLTFLoader();
            loader.load('static/phone2.glb', function (gltf) {

                gltf.scene.rotation.set(0, 0, 0)
                gltf.scene.position.set(0, 0, 0)

                scene.add(gltf.scene);
                scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 100,  0xffffff));

                });




            var render = function () {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }

            function navclick(event) {
                event.preventDefault();

                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                let intersects = raycaster.intersectObjects(scene.children, true);
                for (var i = 0; i < intersects.length; i++) {
                    this.tl = new TimelineMax();
                    // this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
                    // this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut })
                    // this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
                    this.tl.to(intersects[i].object.rotation, 2, { y: Math.PI * .30, ease: Expo.easeOut }, "=-1.5")
                    console.log(intersects[i].object)
                    // const buttonColor = getComputedStyle(intersects[i].object).getPropertyValue("background-color");
                    //         buttonColor.color = new THREE.Color(0x404040)

                }
            }


            window.addEventListener('click', navclick);

            return (time, rect) => {

                camera.aspect = rect.width / rect.height;
                camera.updateProjectionMatrix();
                camera2.aspect = rect.width / rect.height;
                camera2.updateProjectionMatrix();
                controls.handleResize();
                controls.update();
                renderer.shadowMap.enabled = true
                renderer.render(scene, camera, camera2);
            };


            // const loader = new GLTFLoader();
            // loader.load('static/phone2.glb', function (gltf) {

            //     gltf.scene.rotation.set(0, 0, 0)
            //     gltf.scene.position.set(0, 0, 0)

            //     const light = new THREE.AmbientLight(0x404040, 120); // soft white light
            //     scene.add(light);

            //     const geometrySphere = new THREE.SphereGeometry(0.2, 20, 20);
            //     const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
            //     const sphere = new THREE.Mesh(geometrySphere, material);
            //     sphere.position.set(0,0,0)
            //     scene.add(sphere);
            //     scene.add(gltf.scene);

            //     sphere.userData.draggable = true;
            //     sphere.userData.name = 'BOX2';

            // });

            // let colorButtons = document.querySelectorAll('.color_button');
            // colorButtons.forEach(button => {
            //     button.addEventListener('click', (e) => {
            //         const buttonColor = getComputedStyle(e.currentTarget).getPropertyValue("background-color");
            //         bodyMaterial.color = new THREE.Color(buttonColor)

            //     })
            // })
            // let raycaster2 = new THREE.Raycaster();
            // let mouse2 = new THREE.Vector2();

            // function clickSphere(event) {
            //     event.preventDefault();

            //     mouse2.x = (event.clientX / window.innerWidth) * 2 - 1;
            //     mouse2.y = -(event.clientY / window.innerHeight) * 2 + 1;

            //     raycaster2.setFromCamera(mouse2, camera);
            //     var intersects = raycaster2.intersectObjects(scene.children, true);

            //     scene.add(new THREE.ArrowHelper(raycaster2.ray.direction, raycaster2.ray.origin, 100, Math.random() * 0xffffff));



            //      for (let i = 0; i < intersects.length; i++) {
            //          gsap.to(intersects[i].object.position, {
            //         duration: 2.5,
            //         y: 5,
            //             // y: 2,
            //            repeat: -1,
            //                 ease: "power1.inOut",
            //                     yoyoEase: true,
            //     })
            //     }

                // for (var i = 0; i < intersects.length; i++) {
                //     this.tl = new TimelineMax();
                //     this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
                //     this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut })
                //     this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
                //     this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5")
                // }
            // }

            // window.addEventListener('click', clickSphere);
            // return (time, rect) => {
            //     camera.aspect = rect.width / rect.height;
            //     camera.updateProjectionMatrix();
            //     camera2.aspect = rect.width / rect.height;
            //     camera2.updateProjectionMatrix();
            //     controls.handleResize();
            //     controls.update();
            //     renderer.shadowMap.enabled = true
            //     renderer.render(scene, camera, camera2);
            // };

        },

//------------------------------------



        'shoes': (elem) => {

            const { scene, camera, camera2, controls } = makeScene(elem);
            const loader = new GLTFLoader();

            camera.position.y = 4;
            camera.position.x = 4;
            camera.position.z = 7;
            const setting = {
                scale: 8,
            }

            const group = new THREE.Group()
            group.scale.set(setting.scale, setting.scale, setting.scale)
            scene.add(group)



            const bodyMaterial = new THREE.MeshLambertMaterial({
                // roughness: 40,
                flatShading: true,
            })

            loader.load('Seen_low_2K.glb', function (data) {

                group.add(data.scene);
                data.scene.rotation.y = Math.PI * 0.55;
                data.scene.rotation.x += 0.3;


                gsap.to(group.position, {
                    duration: 2.5,
                    y: 0.3,
                    // y: 2,
                    repeat: -1,
                    ease: "power1.inOut",
                    yoyoEase: true,
                })


                data.scene.getObjectByName('Backdrop_02_low').material = bodyMaterial;
                data.scene.getObjectByName('Superblok_low').material = bodyMaterial;
                data.scene.getObjectByName('Tibiae_s_low').material = bodyMaterial;
                data.scene.getObjectByName('Toe_low').material = bodyMaterial;

                data.scene.getObjectByName('Tibiae_s_low_2').material = bodyMaterial;
                data.scene.getObjectByName('Superblok_low_2').material = bodyMaterial;
                data.scene.getObjectByName('Backdrop_02_low_2').material = bodyMaterial;
                data.scene.getObjectByName('Toe_low_2').material = bodyMaterial;
                data.colorSpace = THREE.SRGBColorSpace;
               

            });

            const light = new THREE.AmbientLight(0xffffff, 2);
            scene.add(light)
            light.position.z = 5;

            const pointLight = new THREE.PointLight(0xffffff, 7);
            pointLight.position.y = 4;
            scene.add(pointLight);


            let colorButtons = document.querySelectorAll('.color_button');
            colorButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const buttonColor = getComputedStyle(e.currentTarget).getPropertyValue("background-color");
                    bodyMaterial.color = new THREE.Color(buttonColor)

                })
            })

            return (time, rect) => {

                camera.aspect = rect.width / rect.height;
                camera.updateProjectionMatrix();
                camera2.aspect = rect.width / rect.height;
                camera2.updateProjectionMatrix();
                controls.handleResize();
                controls.update();
                renderer.shadowMap.enabled = true
                renderer.render(scene, camera, camera2);


            };

        },

        //------------------------------------

        


        'black-box': (elem) => {

            const { scene, camera, camera2, controls } = makeScene(elem);
            
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();

            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshLambertMaterial({ color: 0x5837CD });
            var mesh = new THREE.Mesh(geometry, material);

            camera.position.z = 0;
            scene.add(mesh);

            let meshX = -30;
            for (var i = 0; i < 25; i++) {
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = (Math.random() - 0.5) * 10;
                mesh.position.y = (Math.random() - 0.5) * 10;
                mesh.position.z = (Math.random() - 0.5) * 10;
                scene.add(mesh);
                meshX += 1;
            }

            var light = new THREE.PointLight(0xFFFFFF, 40, 15000)
            light.position.set(0, 0, 0);
            scene.add(light);

            // const sphereSize2 = 0.5;
            // const pointLightHelper2 = new THREE.PointLightHelper(light, sphereSize2);
            // scene.add(pointLightHelper2);
            
            scene.fog = new THREE.Fog(0xFFE599, 10, 15);

            const color = "rgb(62, 61, 61)";
            scene.background = new THREE.Color(color);

            var render = function () {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }

            function navclick(event) {
                event.preventDefault();

                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(scene.children, true);
                for (var i = 0; i < intersects.length; i++) {
                    this.tl = new TimelineMax();
                    this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
                    this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut })
                    this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
                    this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5")
                }
            }


            window.addEventListener('mousemove', navclick);

            return (time, rect) => {

                camera.aspect = rect.width / rect.height;
                camera.updateProjectionMatrix();
                camera2.aspect = rect.width / rect.height;
                camera2.updateProjectionMatrix();
                controls.handleResize();
                controls.update();
                renderer.shadowMap.enabled = true
                renderer.render(scene, camera, camera2);
            };
        },
        // 'pyramid': (elem) => {
        //     const { scene, camera2, controls2 } = makeScene(elem);    
        //     const loader = new GLTFLoader();
        //     loader.load('untitled-rab-version.glb', function (gltf) {
               
        //         gltf.scene.rotation.set(0, 4, 0)
        //         gltf.scene.position.set(0, -1, 0)
        //         scene.add(gltf.scene);

        //         // gltf.userData.draggable = true;
        //         // gltf.userData.name = 'PYRAMID2'

        //     });
        


        //     return (time, rect) => {

        //         camera2.aspect = rect.width / rect.height;
        //         camera2.updateProjectionMatrix();
        //         controls2.handleResize();
        //         controls2.update();
        //         renderer.render(scene, camera2);
                

        //     };

        // },
    };

    document.querySelectorAll('[data-diagram]').forEach((elem) => {

        const sceneName = elem.dataset.diagram;
        const sceneInitFunction = sceneInitFunctionsByName[sceneName];
        const sceneRenderFunction = sceneInitFunction(elem);
        addScene(elem, sceneRenderFunction);

    });



    function render(time) {
        for (const { elem, fn, ctx } of sceneElements) {

            // get the viewport relative position of this element
            const rect = elem.getBoundingClientRect();
            const { left, right, top, bottom, width, height } = rect;
            const rendererCanvas = renderer.domElement;

            const isOffscreen =
                bottom < 0 ||
                top > window.innerHeight ||
                right < 0 ||
                left > window.innerWidth;

            if (!isOffscreen) {

                // make sure the renderer's canvas is big enough
                if (rendererCanvas.width < width || rendererCanvas.height < height) {

                    renderer.setSize(width, height, false);

                }

                // make sure the canvas for this area is the same size as the area
                if (ctx.canvas.width !== width || ctx.canvas.height !== height) {

                    ctx.canvas.width = width;
                    ctx.canvas.height = height;

                }

                renderer.setScissor(0, 0, width, height);
                renderer.setViewport(0, 0, width, height);

                fn(time, rect);

                // copy the rendered scene to this element's canvas
                ctx.globalCompositeOperation = 'copy';
                ctx.drawImage(
                    rendererCanvas,
                    0, rendererCanvas.height - height, width, height, // src rect
                    0, 0, width, height); // dst rect

            }

        }

        requestAnimationFrame(render);

    }

    requestAnimationFrame(render);






}

main();

