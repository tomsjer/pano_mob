/**
 * THREE.js DeviceOrientationControl.js example
 * 
 * https://github.com/mrdoob/three.js/
 * https://threejs.org/examples/misc_controls_deviceorientation
 * https://github.com/mrdoob/
 * 
 */
(function() {
  "use strict";
  var container, camera, scene, renderer, controls, geometry, mesh;
  function init() {
    var animate = function() {
      window.requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.HEIGHT, 1, 1100);
    controls = new THREE.DeviceOrientationControls(camera);
    scene = new THREE.Scene();
    var geometry = new THREE.SphereGeometry(500, 16, 8);
    geometry.scale(-1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('media/2018_equinox_USA_Premier_360_v006_Night_Front_1290.jpg')
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.HEIGHT);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.HEIGHT;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.HEIGHT);
    }, false);
    animate();
  }

  window.addEventListener('message', function(event) {
    var origin = event.origin || event.originalEvent.origin;
    if (~origin.indexOf('m.chevrolet.com.mx')) {
      if(typeof event.data.height !== 'undefined'){
        window.HEIGHT = parseInt(event.data.height);
        init();
      }
      if(typeof event.data.alpha !== 'undefined'){
        controls.deviceOrientation = event.data;
      }
    }
    else {
      return;
    }
  });
})();
