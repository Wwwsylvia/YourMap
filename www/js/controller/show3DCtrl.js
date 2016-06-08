/**
 * Created by HF Q on 2016/6/8.
 */
angular.module('show3DModule',[])
.controller('Show3DSightCtrl',['$scope','$ionicNavBarDelegate',function($scope,$ionicNavBarDelegate){

  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }

  var scene = new THREE.Scene();


  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT =
    window.innerHeight;
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.3, FAR = 1000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 25, -300);
  camera.lookAt(new THREE.Vector3(0, 30, 0));

  scene.add(camera);


  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  var container = document.getElementById("ThreeJS");
  container.appendChild(renderer.domElement);

  var alight = new THREE.AmbientLight(0x404040);
  scene.add(alight);

  var light = new THREE.SpotLight(0xdddddd, 2, 10000, Math.PI / 6, 50);
  light.position.set(800, 1000, -800);
  light.castShadow = true;

  light.shadowCameraNear = 1;
  light.shadowCameraFar = 10;
  light.shadowCameraFov = 30;
  light.shadowCameraVisible = true;

  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  light.shadowDarkness = 0.3;

  scene.add(light);// 追加光源到场景


// set sky start
  var skyBoxGeometry = new THREE.SphereGeometry(500, 360, 360);
  var theTexture = new THREE.ImageUtils.loadTexture("img/sky.jpg");
  var skyBoxMaterial = new THREE.MeshBasicMaterial(
    {map: theTexture, side: THREE.BackSide});

  var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  skyBox.position.set(0, 0, 0);
  scene.add(skyBox);

// set sky end

// set floor start


  var grayFloorGeometry = new THREE.CubeGeometry(750, 20, 400);
  var grayFloorMaterial = new THREE.MeshPhongMaterial({color: 0xbbbbbb});
  var grayFloor = new THREE.Mesh(grayFloorGeometry, grayFloorMaterial);
  grayFloor.position.set(0, 10, -50);
  scene.add(grayFloor);

  var blueFloorGeometry1 = new THREE.CubeGeometry(650, 10, 60);
  var blueFloorMaterial = new THREE.MeshPhongMaterial({color: 0x0000ff});
  var blueFloor1 = new THREE.Mesh(blueFloorGeometry1, blueFloorMaterial);
  blueFloor1.position.set(0, 5, 180);
  scene.add(blueFloor1);

  var blueFloorGeometry2 = new THREE.CubeGeometry(200, 10, 60);
  var blueFloor2 = new THREE.Mesh(blueFloorGeometry2, blueFloorMaterial);
  blueFloor2.position.set(110, 5, 210);
  scene.add(blueFloor2);

  var grayFloorGeometry1 = new THREE.CubeGeometry(20, 4, 100);
  var grayFloor1 = new THREE.Mesh(grayFloorGeometry1, grayFloorMaterial);
  grayFloor1.position.set(0, 18, 180);
  scene.add(grayFloor1);

  var grayFloorGeometry2 = new THREE.CubeGeometry(20, 20, 200);
  var grayFloor2 = new THREE.Mesh(grayFloorGeometry2, grayFloorMaterial);
  grayFloor2.position.set(0, 10, 310);
  scene.add(grayFloor2);

  var greenFloorGeometry1 = new THREE.CubeGeometry(200, 20, 200);
  var greenFloorMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
  var greenFloor1 = new THREE.Mesh(greenFloorGeometry1, greenFloorMaterial);
  greenFloor1.position.set(-110, 10, 310);
  scene.add(greenFloor1);

  var greenFloorGeometry2 = new THREE.CubeGeometry(200, 20, 140);
  var greenFloor2 = new THREE.Mesh(greenFloorGeometry2, greenFloorMaterial);
  greenFloor2.position.set(110, 10, 310);
  scene.add(greenFloor2);

  var greenFloorGeometry3 = new THREE.CubeGeometry(200, 0.1, 40);
  var greenFloor3 = new THREE.Mesh(greenFloorGeometry3, greenFloorMaterial);
  greenFloor3.position.set(-110, 20, 130);
  scene.add(greenFloor3);

  var greenFloorGeometry4 = new THREE.CubeGeometry(70, 0.1, 30);
  var greenFloor4 = new THREE.Mesh(greenFloorGeometry4, greenFloorMaterial);
  greenFloor4.position.set(45, 20, 40);
  scene.add(greenFloor4);

  var greenFloorGeometry5 = new THREE.CubeGeometry(30, 0.1, 90);
  var greenFloor5 = new THREE.Mesh(greenFloorGeometry5, greenFloorMaterial);
  greenFloor5.position.set(25, 20, 105);
  scene.add(greenFloor5);

  var greenFloorGeometry6 = new THREE.CubeGeometry(40, 0.1, 210);
  var greenFloor6 = new THREE.Mesh(greenFloorGeometry6, greenFloorMaterial);
  greenFloor6.position.set(-185, 20, 0);
  scene.add(greenFloor6);

// set floor end


// set football ground start

  var footballGroundGeometry0 = new THREE.CubeGeometry(200, 20, 130);
  var footballGroundMaterial0 = new THREE.MeshPhongMaterial({color: 0x00ff00});
  var footballGroundFloor0 = new THREE.Mesh(footballGroundGeometry0, footballGroundMaterial0);
  footballGroundFloor0.position.set(130, 10.02, -80);
  scene.add(footballGroundFloor0);

  var footballGroundGeometry1 = new THREE.CubeGeometry(100, 20, 50);
  var footballGroundMaterial1 = new THREE.MeshPhongMaterial({color: 0x00ff00});
  var footballGroundFloor1 = new THREE.Mesh(footballGroundGeometry1, footballGroundMaterial1);
  footballGroundFloor1.position.set(130, 10.2, -80);
  scene.add(footballGroundFloor1);

  var footballGroundGeometry2 = new THREE.CylinderGeometry(45, 45, 20, 360);
  var footballGroundMaterial2 = new THREE.MeshPhongMaterial({color: 0xff0000});
  var footballGroundFloor2 = new THREE.Mesh(footballGroundGeometry2, footballGroundMaterial2);
  footballGroundFloor2.position.set(80, 10.1, -80);
  scene.add(footballGroundFloor2);

  var footballGroundGeometry3 = new THREE.CylinderGeometry(45, 45, 20, 360);
  var footballGroundFloor3 = new THREE.Mesh(footballGroundGeometry3, footballGroundMaterial2);
  footballGroundFloor3.position.set(180, 10.1, -80);
  scene.add(footballGroundFloor3);

  var footballGroundGeometry4 = new THREE.CubeGeometry(100, 20, 20);

  var footballGroundFloor4 = new THREE.Mesh(footballGroundGeometry4, footballGroundMaterial2);
  footballGroundFloor4.position.set(130, 10.1, -45);
  scene.add(footballGroundFloor4);

  var footballGroundGeometry5 = new THREE.CubeGeometry(100, 20, 20);
  var footballGroundFloor5 = new THREE.Mesh(footballGroundGeometry5, footballGroundMaterial2);
  footballGroundFloor5.position.set(130, 10.1, -115);
  scene.add(footballGroundFloor5);

// set football ground end


// set gym room start

  var gymGeometry = new THREE.CubeGeometry(120, 50, 50);
  var gymTexture = new THREE.ImageUtils.loadTexture("img/gym.PNG");
  var gymMaterial = new THREE.MeshPhongMaterial({map: gymTexture});
  var gymRoom = new THREE.Mesh(gymGeometry, gymMaterial);
  gymRoom.position.set(-100, 45, -100);
  scene.add(gymRoom);

// set gym room end


// set basketball start

  var basketballFloorGeometry1 = new THREE.CubeGeometry(120, 0.1, 80);
  var basketballFloorMaterial1 = new THREE.MeshPhongMaterial({color: 0xff0000});
  var basketballFloor1 = new THREE.Mesh(basketballFloorGeometry1, basketballFloorMaterial1);
  basketballFloor1.position.set(-100, 20, -20);
  scene.add(basketballFloor1);

  var basketballFloorGeometry2 = new THREE.CubeGeometry(50, 0.2, 20);
  var basketballFloorMaterial2 = new THREE.MeshPhongMaterial({color: 0x085803});
  var basketballFloor2 = new THREE.Mesh(basketballFloorGeometry2, basketballFloorMaterial2);
  basketballFloor2.position.set(-70, 20, -20);
  scene.add(basketballFloor2);

  var basketballFloorGeometry3 = new THREE.CubeGeometry(50, 0.2, 20);
  var basketballFloor3 = new THREE.Mesh(basketballFloorGeometry3, basketballFloorMaterial2);
  basketballFloor3.position.set(-70, 20, 5);
  scene.add(basketballFloor3);

  var basketballFloorGeometry4 = new THREE.CubeGeometry(50, 0.2, 20);
  var basketballFloor4 = new THREE.Mesh(basketballFloorGeometry4, basketballFloorMaterial2);
  basketballFloor4.position.set(-70, 20, -45);
  scene.add(basketballFloor4);

  var basketballFloorGeometry5 = new THREE.CubeGeometry(50, 0.2, 60);
  var basketballFloor5 = new THREE.Mesh(basketballFloorGeometry5, basketballFloorMaterial2);
  basketballFloor5.position.set(-130, 20, -20);
  scene.add(basketballFloor5);

// set basketball end


// set restaurant start


  var restaurantGeometry = new THREE.CubeGeometry(120, 75, 70);
  var restaurantTexture = new THREE.ImageUtils.loadTexture("img/restaurant.PNG");
  var restaurantMaterial = new THREE.MeshPhongMaterial({map: restaurantTexture});
  var restaurant = new THREE.Mesh(restaurantGeometry, restaurantMaterial);
  restaurant.position.set(-100, 57, 70);
  scene.add(restaurant);

// set restaurant end


// set library start

  var libraryGeometry = new THREE.CubeGeometry(120, 75, 80);
  var libraryTexture = new THREE.ImageUtils.loadTexture("img/library.PNG");
  var libraryMaterial = new THREE.MeshPhongMaterial({map: libraryTexture});
  var library = new THREE.Mesh(libraryGeometry, libraryMaterial);
  library.position.set(100, 57, 100);
  scene.add(library);

// set library end


// set door start

  var doorRoomGeometry = new THREE.CubeGeometry(30, 25, 15);
  var doorRoomTexture = new THREE.ImageUtils.loadTexture("img/doorRoom.PNG");
  var doorRoomMaterial = new THREE.MeshPhongMaterial({map: doorRoomTexture});
  var doorRoom = new THREE.Mesh(doorRoomGeometry, doorRoomMaterial);
  doorRoom.position.set(40, 32, -140);
  scene.add(doorRoom);

  var doorGeometry = new THREE.CubeGeometry(50, 10, 0.5);
  var doorTexture = new THREE.ImageUtils.loadTexture("img/door.PNG");
  var doorMaterial = new THREE.MeshPhongMaterial({map: doorTexture});
  var door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(-20, 25, -149);
  scene.add(door);

//set door end

// set wall start

  var wallGeometry1 = new THREE.CubeGeometry(212, 10, 0.5);
  var wallMaterial = new THREE.MeshPhongMaterial({color: 0xC7461F});
  var wall1 = new THREE.Mesh(wallGeometry1, wallMaterial);
  wall1.position.set(129, 25, -149);
  scene.add(wall1);

  var wallGeometry2 = new THREE.CubeGeometry(0.5, 10, 139);
  var wall2 = new THREE.Mesh(wallGeometry2, wallMaterial);
  wall2.position.set(235, 25, -80);
  scene.add(wall2);

  var wallGeometry3 = new THREE.CubeGeometry(86, 10, 0.5);
  var wall3 = new THREE.Mesh(wallGeometry3, wallMaterial);
  wall3.position.set(277, 25, -10);
  scene.add(wall3);

  var wallGeometry4 = new THREE.CubeGeometry(0.5, 10, 220);
  var wall4 = new THREE.Mesh(wallGeometry4, wallMaterial);
  wall4.position.set(320, 25, 100);
  scene.add(wall4);

  var wallGeometry5 = new THREE.CubeGeometry(173, 10, 0.5);
  var wall5 = new THREE.Mesh(wallGeometry5, wallMaterial);
  wall5.position.set(-125, 25, -149);
  scene.add(wall5);

  var wallGeometry6 = new THREE.CubeGeometry(0.5, 10, 300);
  var wall6 = new THREE.Mesh(wallGeometry6, wallMaterial);
  wall6.position.set(-210, 25, 0);
  scene.add(wall6);

// set wall end


  renderer.shadowMapEnabled = true;

  wall1.castShadow = true;
  wall2.castShadow = true;
  wall3.castShadow = true;
  wall4.castShadow = true;
  wall5.castShadow = true;
  wall6.castShadow = true;
  library.castShadow = true;
  restaurant.castShadow = true;
  gymRoom.castShadow = true;
  door.castShadow = true;
  doorRoom.castShadow = true;
  grayFloor.castShadow = true;
  grayFloor1.castShadow = true;
  grayFloor2.castShadow = true;
  grayFloor.receiveShadow = true;
  grayFloor1.receiveShadow = true;
  grayFloor2.receiveShadow = true;
  blueFloor1.receiveShadow = true;
  blueFloor2.receiveShadow = true;
  greenFloor1.castShadow = true;
  greenFloor2.castShadow = true;
  greenFloor1.receiveShadow = true;
  greenFloor2.receiveShadow = true;
  greenFloor3.receiveShadow = true;
  greenFloor4.receiveShadow = true;
  greenFloor5.receiveShadow = true;
  greenFloor6.receiveShadow = true;
  basketballFloor1.receiveShadow = true;
  basketballFloor2.receiveShadow = true;
  basketballFloor3.receiveShadow = true;
  basketballFloor4.receiveShadow = true;
  basketballFloor5.receiveShadow = true;
  footballGroundFloor0.receiveShadow = true;
  footballGroundFloor1.receiveShadow = true;
  footballGroundFloor2.receiveShadow = true;
  footballGroundFloor3.receiveShadow = true;
  footballGroundFloor4.receiveShadow = true;
  footballGroundFloor5.receiveShadow = true;


  var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();

  $(document).keypress(function (e) {
    console.log(e.which);
    switch (e.which) {

      // user presses the "w"
      case 119:
        camera.translateZ(-1);
        break;

      // user presses the "s" key
      case 115:
        camera.translateZ(1);
        break;

      // user presses the "a" key
      case 97:
        camera.translateX(-1);
        break;

      // user presses the "d" key
      case 100:
        camera.translateX(1);
        break;
      case 113:
        camera.rotateY(-50);
        break;
      case 101:
        camera.rotateY(50);
        break;
      default:
        break;
    }
  });
  var lastX;
  var lastY;
  var lastTime = 0;
  $(document).mousemove(function (e) {
    console.log(e);
    console.log(e.offsetX + " " + e.offsetY);
    var offsetX = e.offsetX - lastX;
    var offsetY = e.offsetY - lastY;
    var offsetTime = e.timeStamp - lastTime;
    console.log(offsetX);
    if (offsetTime >= 100) {
      //if (offsetX<0) {
      //    camera.rotateY(-50);
      //}
      //if (offsetX>0) {
      //    camera.rotateY(50);
      //}

      lastTime = e.timeStamp;
    }
    lastY = e.offsetY;
    lastX = e.offsetX;
  });
  autoMove();
  function autoMove() {
    var opList = ["","","","","e","e","","","","","","","","q","q","q","","","","","", "w","w", "w", "w", "w","w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "e", "e",
      "w", "w", "w", "w","w","w","w", "w", "w", "w", "w", "w", "w", "w", "w", "","","","e", "e", "e","", "","","",
      "z","z","","","","","c","c","c","c","","","","","z","z", "","","","","","","",
      "q","q","q","q","q","q","","","","","","","q","q","q","q","","","","","s","s","s","s","","","z","","","c","c","","","z","",
      "e","e","e","e","e","","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","","","","","",
      "q","q","q","q","q","q","","","","","","q","q","q","q","q","","","","","", "q","q","q","q","q","","","","","","q","q","q","q","q","","z","z","","","c","c","",
      "q","","w","w","w","w","w","w","w","w","w","w","w","q","","",
      "w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","e","e","w","w","w","q","w","w","w","w","w","w","w","w","","","",
      "q","q","q","q","q","q","q","q","q","","","z","z","z","","","","","","c","c","c","","","e","e","","c","c","","","","","","","z","z","",
      "e","e","e","e","e","e","e","e","e","e","e","e","e","e","","","","","z","z","z","","","","","","c","c","c","","","","c","c","","","","","z","z","",
      "e","e","e","","","","","q","q","q","q","q","","","","q","q","q","q","q","q","","",
      "w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","","",
      "q","q","q","q","q","q","q","q","q","s","s","","","","","","",
      "q","q","q","s","s","s","d","d","d","","s","s","s","s","","","","","","",
      "w","w","w","w","w","w","w","w","d","w","w","w","w","w","d","w","w","w","w","w","w","d","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
      "e","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","","","q","","",
      "w","w","w","w","w"];
    var count = 0;
    var interval = setInterval(function () {
      execute(opList[count]);
      count++;
      if (count == opList.length) {
        clearInterval(interval);
        return;
      }

    }, 100);

  }
  function execute(str) {
    if (str == "w") {
      camera.translateZ(-5);
    }
    if (str == "s") {
      camera.translateZ(5);
    }
    if (str == "a") {
      camera.translateX(-5);
    }
    if (str == "d") {
      camera.translateX(5);
    }
    if (str == "q") {
      camera.rotateY(-50);
    }
    if (str == "e") {
      camera.rotateY(50);
    }
    if (str == "z") {
      camera.rotateX(-50);
    }
    if (str == "c") {
      camera.rotateX(50);
    }
  }


}]);
