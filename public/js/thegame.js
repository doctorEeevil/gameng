var Ship = function(nick, color, position, scene) {
    this.color = color;
    this.nick = nick;
    this.scene = scene;
    this.position = position;
    this.init_gl();
};

Ship.prototype.init_gl = function() {
    p = this.position;
    this.cgeometry = new THREE.CylinderGeometry( 0.001, p[0], p[1], p[2] );
    this.cmaterial = new THREE.MeshBasicMaterial( { color: this.color } );
    this.cylinder = new THREE.Mesh( this.cgeometry, this.cmaterial );
    this.scene.add( this.cylinder );
};

var start_game = function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    //var geometry = new THREE.BoxGeometry( 0.1, 0.1, 4 );
    //  var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    //    var cube = new THREE.Mesh( geometry, material );
    //      scene.add( cube );
   
    
    camera.position.z = 4;
    
    var render = function () {
	requestAnimationFrame( render );
	/*
	cylinder.rotation.x += 0.01;
	cylinder.rotation.y += 0.01;
	*/
	renderer.render(scene, camera);
    };
    
    render();
    
    var socket = io();
    socket.on('newShip', function(data) {
	new Ship(data[0], data[1], data[2], scene)
    });
    
    var nick = prompt("nickname?");
    socket.emit('newPlayer', nick);
    //cmaterial.color = eval(new_color);
};
