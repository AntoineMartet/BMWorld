// BMWorld, display.js
// SI-CA1a
// groupe représentation, affichage
// début 30.01.2023

    let nx= 40;//nombre de tuiles en x
    let nz=40; // nombre de tuiles en y
    let size=50; // taille des tuiles (carrées)
    let aWorld=[
        {"name":"axe X","type":"line","x":0,"y":0,"z":0,"x1":700,"y1":0,"z1":0,"color":"red"},
        {"name":"axe Y","type":"line","x":0,"y":0,"z":0,"x1":0,"y1":700,"z1":0,"color":"green"},
        {"name":"axe Z","type":"line","x":0,"y":0,"z":0,"x1":0,"y1":0,"z1":700,"color":"blue"},
        {"name":"batiment","type":"box","x":0,"y":-50,"z":0,"rx":0,"ry":0,"rz":0,"l1":100,"l2":100,"l3":100,"color":"green"}
    ];

function setup() {
    //fonction appelée au lancement du programme
    mainDisplay = createCanvas(1000,800,WEBGL);//canvas en 3D
    mainDisplay.parent("canvasDisplay");
    angleMode(DEGREES);//angles en degrés
    camera(500,-500,1000,0,-0,0);//placement de la camera au départ, vise le centre
    normalMaterial(250);//matériaux solide
    fnTiles();//Crée des tuiles comme sol
    fnCreatures(100);//Crée 100 créatures en 3D
    frameRate(20);//2 fois par secondes on rafraichit
}

function draw() {
    //fonction appelée 2 fois par secondes (suivant le frameRate)
    background("lightblue");
    lights();//Allumer les lumières
    directionalLight(250, 250, 250, -1, -1, -1);
    orbitControl(2,2,2);//autorise le controle par souris
    fnEngine();// appelle le moteur fnEngine qui recalcule le monde de l'état suivant
    fnDisplay();
}

function fnDisplay(){

    //Tracé du monde
    for (let i=0;i<aWorld.length;i++){
        fnDisplayObject(aWorld[i]);
    }
    //Dessin des créatures
    for (let i=0;i<acr.length;i++){
        fnDisplayObject(acr[i]);
        fnDisplayDetails(acr[i]);
    }
}

function fnDisplayObject(o){

    switch (o.type) {
    case 'line':
        stroke(o.color);
        line(o.x,o.y,o.z,o.x1,o.y1,o.z1);
        noStroke();
        break;

    case 'cylinder':
        push();
        translate(o.x,o.y,o.z);
        rotateX(o.rx);
        rotateY(o.ry);
        rotateZ(o.rz);
        fill(o.color);
        cylinder(o.r,o.l);
        pop();
    break;
    case 'plane':
        push();
        translate(o.x,o.y,o.z);
        rotateX(o.rx);
        rotateY(o.ry);
        rotateZ(o.rz);
        fill(o.color);
        plane(o.l1,o.l2);
        pop();
    break;
    case 'box':
        push();
        translate(o.x,o.y,o.z);
        rotateX(o.rx);
        rotateY(o.ry);
        rotateZ(o.rz);
        fill(o.color);
        box(o.l1,o.l2,o.l3);
        pop();
        break;
    case 'sphere':
        push();
        translate(o.x,o.y,o.z);
        rotateX(o.rx);
        rotateY(o.ry);
        rotateZ(o.rz);
        fill(o.color);
        sphere(o.r);
        pop();
        break;
    case 'ellipsoid':
        push();
        translate(o.x,o.y,o.z);
        rotateX(o.rx);
        rotateY(o.ry);
        rotateZ(o.rz);
        fill(o.color);
        ellipsoid(o.r1,o.r2,o.r3);
        pop();
        break;
    case 'cone':
        push();
        translate(o.x,o.y,o.z);
        rotateX(o.rx);
        rotateY(o.ry);
        rotateZ(o.rz);
        fill(o.color);
        cone(o.r,o.h);
        pop();
    break;
        case 'torus':
        push();
        translate(o.x,o.y,o.z);
        rotateX(o.rx);
        rotateY(o.ry);
        rotateZ(o.rz);
        fill(o.color);
        torus(o.r1,o.r2);
        pop();
        break;
    }

}

function fnTiles(){
    //Crée un certain nb de tuiles
    for (x=-nx/2;x<=nx/2;x++) {
        for (z = -nz / 2; z <= nz / 2; z++) {
            aWorld.push({"name":"t","type":"plane","x":x*size,"y":0,"z":z*size,"rx":90,"ry":0,"rz":0,"l1":size-2,"l2":size-2,"color":"lightgreen"});
        }
    }
}

function fnDisplayDetails(o){
    //Dessine les yeux à un objet
    push();
    fill("black");
    translate(o.x-10,o.y-size/2,o.z+20);
    sphere(5);
    translate(+20,0,0);
    sphere(5);
    //nez
    translate(-10,15,5);
    fill(o.color);
    cone(10);

    //pieds
    translate(-10,32,-25)
    rotateX(0)
    cone(-14,80);
    translate(20,20,0)
    cone(14,80);
    pop();

}


