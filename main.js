import * as THREE from "three";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xd0d0d0);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(10, 8, 12);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(
    renderer.domElement
);

/* iluminação */

const ambientLight =
new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambientLight);

const dirLight =
new THREE.DirectionalLight(
    0xffffff,
    2
);

dirLight.position.set(
    10,
    15,
    10
);

scene.add(dirLight);

/* chão */

const floor =
new THREE.Mesh(
    new THREE.BoxGeometry(
        30,
        1,
        30
    ),
    new THREE.MeshStandardMaterial({
        color: 0x999999
    })
);

floor.position.y = -0.5;

scene.add(floor);

/* esteira */

const conveyor =
new THREE.Mesh(
    new THREE.BoxGeometry(
        10,
        0.5,
        3
    ),
    new THREE.MeshStandardMaterial({
        color: 0x222222
    })
);

conveyor.position.y = 0.25;

scene.add(conveyor);

/* peça */

const piece =
new THREE.Mesh(
    new THREE.BoxGeometry(
        1,
        1,
        1
    ),
    new THREE.MeshStandardMaterial({
        color: 0x0066ff
    })
);

piece.position.set(
    -4,
    1,
    0
);

scene.add(piece);

/* sensor */

const sensor =
new THREE.Mesh(
    new THREE.CylinderGeometry(
        0.3,
        0.3,
        1
    ),
    new THREE.MeshStandardMaterial({
        color: 0xffff00
    })
);

sensor.rotation.z =
Math.PI / 2;

sensor.position.set(
    0,
    1,
    -2
);

scene.add(sensor);

/* torre de sinalização */

const greenLight =
new THREE.Mesh(
    new THREE.SphereGeometry(
        0.3
    ),
    new THREE.MeshStandardMaterial({
        color: 0x00ff00
    })
);

greenLight.position.set(
    5,
    2,
    0
);

scene.add(greenLight);

const redLight =
new THREE.Mesh(
    new THREE.SphereGeometry(
        0.3
    ),
    new THREE.MeshStandardMaterial({
        color: 0x550000
    })
);

redLight.position.set(
    5,
    1.2,
    0
);

scene.add(redLight);

/* lógica inicial */

let emergency = false;

document
.getElementById("emergencyBtn")
.addEventListener("click", () => {

    emergency = !emergency;

    if(emergency){

        document
        .getElementById("status")
        .innerText =
        "Status: EMERGÊNCIA";

        greenLight.material.color.set(
            0x003300
        );

        redLight.material.color.set(
            0xff0000
        );
    }
    else{

        document
        .getElementById("status")
        .innerText =
        "Status: Operando";

        greenLight.material.color.set(
            0x00ff00
        );

        redLight.material.color.set(
            0x550000
        );
    }
});

/* animação */

function animate(){

    requestAnimationFrame(
        animate
    );

    if(!emergency){

        piece.position.x += 0.02;

        if(piece.position.x > 4){

            piece.position.x = -4;
        }

        if(
            piece.position.x > -0.3 &&
            piece.position.x < 0.3
        ){
            document
            .getElementById("status")
            .innerText =
            "Status: Peça Detectada";
        }
    }

    renderer.render(
        scene,
        camera
    );
}

animate();

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
        window.innerWidth /
        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);
