var renderer;
function initThree() {
	width = document.getElementById('canvas-frame').clientWidth;
	height = document.getElementById('canvas-frame').clientHeight;
	renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	renderer.setSize(width, height);
	document.getElementById('canvas-frame').appendChild(renderer.domElement);
	renderer.setClearColor(0xffffff, 1.0);
}
var camera;
function initCamera() {
	camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
	camera.position.x = 0;
	camera.position.y = -10;
	camera.position.z = 0;
	camera.up.x = 0;
	camera.up.y = 0;
	camera.up.z = 1;
	camera.lookAt({
		x : 0,
		y : 0,
		z : 0
	});
	/*camControls = new THREE.FirstPersonControls(camera);
    camControls.lookSpeed = 0.4;
    camControls.movementSpeed = 200;
    camControls.noFly = true;
    camControls.lookVertical = true;
    camControls.constrainVertical = true;
    camControls.verticalMin = 1.0;
    camControls.verticalMax = 2.0;
    camControls.lon = -150;
    camControls.lat = 120;*/
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle = Math.PI * 0.5;
	controls.minDistance = 1000;
	controls.maxDistance = 7500;
}
var scene;
function initScene() {
	scene = new THREE.Scene();
	clock = new THREE.Clock();
}
var light;
function initLight() {
	light = new THREE.DirectionalLight(0xFFFFFF, 1.0, 0);
	light.position.set(100, 100, 200);
	scene.add(light);
	var nl = new THREE.DirectionalLight(0xFFFFFF, 1.0, 0);
	nl.position.set(-100, -100, -200);
	scene.add(nl);
	var ambientLight = new THREE.AmbientLight(0x383838);
    scene.add(ambientLight);
}
//var cube;
function initObject() {
	/*var geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
    geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

    for ( var i = 0; i <= 20; i ++ ) {

        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
        line.position.z = ( i * 50 ) - 500;
        scene.add( line );

        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
        line.position.x = ( i * 50 ) - 500;
        line.rotation.y = 90 * Math.PI / 180;
        scene.add( line );

    }*/
    /*cubemap = THREE.ImageUtils.loadTextureCube(urls);
    var material = new THREE.MeshLambertMaterial({
    	color: 0xffffff,
    	envMap: cubemap
  	});*/
	/*var geometry = new THREE.SphereGeometry( 500, 60, 40 );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	var loader = new THREE.TextureLoader();
	var hill = loader.load('textures/hill.jpg');
	var material = new THREE.MeshBasicMaterial({
		map: hill
	});
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );*/
	var loader = new THREE.JSONLoader();
    loader.load("models/chinazhuti.js", function(geometry) {
    	/*geometry.traverse(function(child) {
    		if (child instanceof THREE.Mesh) {
    			child.material.side = THREE.DoubleSide;
    		}
    	});*/
    	console.log(geometry);
    	var material = new THREE.MeshPhongMaterial({color : 0xa40800});
        var mesh = new THREE.Mesh(geometry, material);
        //mesh.scale.set(10, 10, 10);
        /*mesh.traverse(function(child) {
        	if (child instanceof THREE.Mesh) {
        		child.material.side = THREE.DoubleSide;
        	}
        });*/
        console.log('add mesh to scene');
        scene.add(mesh);
    });
    loader.load("models/group3.js", function(geometry) {
    	var material = new THREE.MeshLambertMaterial({color : 0x9694c0, transparent : true});
    	material.opacity = 0.5;
    	var mesh = new THREE.Mesh(geometry, material);
    	scene.add(mesh);
    });
    loader.load("models/group2.js", function(geometry) {
    	var material = new THREE.MeshLambertMaterial({color : 0x4b4b4b, transparent : true});
    	material.opacity = 0.5;
    	var mesh = new THREE.Mesh(geometry, material);
    	scene.add(mesh);
    });
    loader.load("models/group4.js", function(geometry) {
    	var material = new THREE.MeshLambertMaterial({color : 0x9694c9, transparent : true});
    	material.opacity = 0.5;
    	var mesh = new THREE.Mesh(geometry, material);
    	scene.add(mesh);
    });
    loader.load("models/group_diban.js", function(geometry) {
    	var material = new THREE.MeshLambertMaterial({color : 0x808080});
    	var mesh = new THREE.Mesh(geometry, material);
    	scene.add(mesh);
    });
    loader.load("models/group_ladder.js", function(geometry) {
    	var material = new THREE.MeshLambertMaterial({color : 0x808080});
    	var mesh = new THREE.Mesh(geometry, material);
    	scene.add(mesh);
    })
    var texture = THREE.ImageUtils.loadTexture("image/diban.jpg", {}, function() {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        console.log("load texture.");
    });
	var geometry = new THREE.PlaneGeometry(800, 400);
	var material = new THREE.MeshPhongMaterial({
		//color : 0xa40800
		//opacity : 0.75
        map : texture
	});
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
}
$(function () {
	threeStart();
});
function threeStart() {
	initThree();
	initCamera();
	initScene();
	initLight();
	initObject();
	//renderer.clear();
	//renderer.render(scene, camera);

	render();
}
function render() {
	var delta = clock.getDelta();
	//camControls.update(delta);
	renderer.clear();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
/*var urls = [
  'path/to/pos-x.png',
  'path/to/neg-x.png',
  'path/to/pos-y.png',
  'path/to/neg-y.png',
  'path/to/pos-z.png',
  'path/to/neg-z.png'
];*/

