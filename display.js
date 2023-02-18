// BMWorld, display.js
// SI-CA1a
// groupe représentation, affichage
// début 30.01.2023
// À faire :
//  - Créer une liste des individus pour sélectionner l'un d'eux.

    let legendsStatus = ["FC","CP","RA","RP","BE","RE"]; // légendes à afficher (bars)
    let valuesStatus = [0.1,0.5,0.8,0.2,0.7,0.5]; // valeurs à afficher (bars)
    let colors = ["yellow","orange","red","purple","blue","darkblue"]; // couleurs (bars)
    let legendsPersonality = ["I","F","R","P","E"]; // légendes à afficher (spider)
    let valuesPersonality = [0.1,0.5,0.8,0.2,0.7]; // valeurs à afficher (spider)

    let nx = 40; // nombre de tuiles en x
    let nz = 40; // nombre de tuiles en y
    let unit = 50; // taille de l'unité de base du monde. Une tuile fait 50 de côté.
    let tileSize = unit - 2; // L'affichage d'une tuile fait 48 de côté.
    let aWorld = [
        {"name":"axe X","type":"line","x":0,"y":0,"z":0,"x1":700,"y1":0,"z1":0,"color":"red"},
        {"name":"axe Y","type":"line","x":0,"y":0,"z":0,"x1":0,"y1":700,"z1":0,"color":"green"},
        {"name":"axe Z","type":"line","x":0,"y":0,"z":0,"x1":0,"y1":0,"z1":700,"color":"blue"},
        {"name":"batiment","type":"box","x":0,"y":-50,"z":0,"rx":0,"ry":0,"rz":0,"l1":100,"l2":100,"l3":100,"color":"green"}
    ];
    let ctxPersonStatus;
    let ctxPersonPersonality;
    let ctxWorld;

    let Couleur = ['rgb(0, 115, 86)','rgb(82, 183, 136 )','rgb(144, 190, 109 )','rgb(128, 185, 24)','rgb(128, 128, 0)','rgb(3, 4, 94)','rgb(72, 202, 228)','rgb(114, 9, 183 )','rgb(205, 180, 219)','rgb(193, 28, 173)','rgb(89, 13, 34)','rgb(255, 143, 171 )','rgb(249, 65, 68)','rgb(249, 121, 57)','rgb(255, 127, 81)','rgb(220, 47, 2 )','rgb(252, 112, 8 )','rgb(255, 204, 0)','rgb(255, 218, 61 )','rgb(255, 234, 0 )','rgb(253, 255, 252 )','rgb(206, 212, 218)','rgb(0, 180, 216)','rgb(52, 58, 64 )','rgb(192, 103, 34 )'];
    let ColorCylinder;
    let ColorCube;
    let ColorTorus;
    let ColorCone;
    ColorCylinder = get_random(Couleur);
    ColorCube = get_random(Couleur);
    ColorTorus = get_random(Couleur);
    ColorCone = get_random(Couleur);

function setup() {
    // fonction appelée au lancement du programme
    mainDisplay = createCanvas(1200,850,WEBGL);//canvas en 3D
    mainDisplay.parent("canvasDisplay");
    angleMode(DEGREES);//angles en degrés
    camera(-300,-500,-300,nx/2*unit,-0,nz/2*unit);//placement de la caméra au départ, vise le centre
    normalMaterial(250);//matériaux solides
    fnTiles();// Ajoute à aWorld un certain nombre de tuiles pour le sol
    // fnCreatures(100);//Crée 100 créatures en 3D
    frameRate(3);//2 fois par secondes on rafraichit
    ctxPersonStatus=document.getElementById("canvasPersonStatus").getContext("2d");
    ctxPersonPersonality=document.getElementById("canvasPersonPersonality").getContext("2d");
    ctxWorld=document.getElementById("canvasWorld").getContext("2d");
    ctxPersonStatus.canvas.width  = 600;
    ctxPersonStatus.canvas.height  = 370;
    ctxPersonPersonality.canvas.width  = 600;
    ctxPersonPersonality.canvas.height  = 370;
    ctxWorld.canvas.width  = 600;
    ctxWorld.canvas.height  = 410;
}

function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}

function fnTiles(){
    //Crée un certain nb de tuiles
    for (x=0;x<=nx;x++) {
        for (z = 0; z <= nz ; z++) {
            aWorld.push({"name":"tile","type":"plane","x":x*unit,"y":0,"z":z*unit,"rx":90,"ry":0,"rz":0,"l1":tileSize,"l2":tileSize,"color":"green"});
        }
    }
}

function draw() {
    // fonction appelée 2 fois par seconde (suivant le frameRate)
    // NB : même les objets statiques (ex: la grille) doivent être redessinés à chaque fois, pas possible de les
    //      dessiner juste une fois dans le setup.
    background("lightblue");
    lights();//Allumer les lumières
    directionalLight(250, 250, 250, 0.2, 1, 0.6);
    orbitControl(2,2,2);//autorise le controle par souris
    fnEngine(); // Calcule le monde de l'état suivant (se trouve dans engine.js)
    fnDisplay(); // Affiche les fonds des 3 canvas, le monde, les créatures et les graphes
}

function fnDisplay(){

    // Dessin le monde : grille, axes et autres objets statiques (ex: bâtiments)
    for (let i=0; i<aWorld.length; i++){
        fnDisplayObject(aWorld[i]);
    }

    // Dessin des créatures
    for (let i=0; i<creatureTotal.length; i++){
        // fnDisplayObject(creatureTotal[i]);
        fnDisplayCreature(creatureTotal[i]);
    }

    // Fond du canvas PersonStatus
    ctxPersonStatus.fillStyle = "lightblue";
    ctxPersonStatus.fillRect(0, 0, 600, 600);

    // Fond du canvas PersonPersonality
    ctxPersonPersonality.fillStyle = "lightblue";
    ctxPersonPersonality.fillRect(0, 0, 600, 600);

    // Fond du canvas World
    ctxWorld.fillStyle = "lightblue";
    ctxWorld.fillRect(0, 0, 600, 600);

    // Dessin des graphes
    bars(valuesStatus, legendsStatus, 130, 335, 300, 300, colors);
    spider(valuesPersonality, legendsPersonality, 300, 188, 150, "purple", "yellow");
}

function fnDisplayCreature(o){

    // Rappel : "translate(o.position.x*unit, 0, o.position.z*unit)" représente LE MILIEU d'une tuile, pas un de ses coins

    let legCylinderHeight = 50;
    let legCylinderRadius = 6;
    let legHeight = legCylinderHeight + legCylinderRadius;

    switch (o.type) {
        case 1: // cylinder

            // Tête
            push();
            translate(o.position.x*unit,-legHeight-10,o.position.z*unit);
            fill(ColorCylinder);
            rotateZ(90);
            cylinder(15,90);
            pop();

            // Yeux et nez
            push();
            fill("black");
            translate(o.position.x*unit-15,-legHeight-20,o.position.z*unit-8);
            sphere(5);
            translate(30,0,0);
            sphere(5);
            translate(-15,3,-8);
            fill("black");
            sphere(3);
            pop();

            // Pieds et jambes
            push();
            fill("black");
            translate(o.position.x*unit-10,-6-25,o.position.z*unit)
            rotateX(0);
            cylinder(legCylinderRadius,legCylinderHeight);
            translate(20,0,0)
            cylinder(legCylinderRadius,legCylinderHeight);
            translate(0,25,0)
            fill("black")
            sphere(legCylinderRadius)
            translate(-20,0,0)
            sphere(legCylinderRadius)
            pop();
            break;

        case 2: // box

            // Tête
            push();
            translate(o.position.x*unit,-legHeight-tileSize/2,o.position.z*unit);
            fill(ColorCube);
            box(tileSize,tileSize,tileSize);
            pop();

            // Yeux et nez
            push();
            fill("black");
            translate(o.position.x*unit-10,-legHeight-35,o.position.z*unit-23);
            sphere(5);
            translate(+20,0,0);
            sphere(5);
            translate(-10,15,0);
            fill("black");
            sphere(8);
            pop();

            // Pieds et jambes
            push();
            fill("black");
            translate(o.position.x*unit-10,-6-25,o.position.z*unit)
            rotateX(0);
            cylinder(legCylinderRadius,legCylinderHeight);
            translate(20,0,0)
            cylinder(legCylinderRadius,legCylinderHeight);
            translate(0,25,0)
            fill("black")
            sphere(legCylinderRadius)
            translate(-20,0,0)
            sphere(legCylinderRadius)
            pop();
            break;

        case 3: // cone

            // Tête
            push();
            translate(o.position.x*unit,-legHeight-35,o.position.z*unit);
            fill(ColorCone);
            rotateZ(180);
            cone(25,70);
            pop();

            // Yeux et nez
            push();
            fill("black");
            translate(o.position.x*unit-5,-legHeight-50,o.position.z*unit-2);
            sphere(5);
            translate(10,0,0);
            sphere(5);
            translate(-5,3,-8);
            fill("black");
            sphere(3);
            pop();

            // Pieds et jambes
            push();
            fill("black");
            translate(o.position.x*unit-10,-6-25,o.position.z*unit)
            rotateX(0);
            cylinder(legCylinderRadius,legCylinderHeight);
            translate(20,0,0)
            cylinder(legCylinderRadius,legCylinderHeight);
            translate(0,25,0)
            fill("black")
            sphere(legCylinderRadius)
            translate(-20,0,0)
            sphere(legCylinderRadius)
            pop();
            break;

        case 4: // torus

            // Tête
            push();
            translate(o.position.x*unit,-legHeight-30,o.position.z*unit);
            fill(ColorTorus);
            torus(30,10);
            pop();

            // Yeux et nez
            push();
            fill("black");
            translate(o.position.x*unit-15,-legHeight-60,o.position.z*unit-8);
            sphere(5);
            translate(30,0,0);
            sphere(5);
            translate(-15,3,-8);
            fill("black");
            sphere(3);
            pop();

            // Pieds et jambes
            push();
            fill("black");
            translate(o.position.x*unit-10,-6-25,o.position.z*unit)
            rotateX(0);
            cylinder(legCylinderRadius,legCylinderHeight);
            translate(20,0,0)
            cylinder(legCylinderRadius,legCylinderHeight);
            translate(0,25,0)
            fill("black")
            sphere(legCylinderRadius)
            translate(-20,0,0)
            sphere(legCylinderRadius)
            pop();
            break;
    }
}

function bars(values, legends, x, y, l, h, colors){
    //Cette fonction dessine un graphique en barres à partir
    //de x et y, de largeur l et de hauteur h

    // barres
    largeur = l / values.length; // largeur des barres ("l" et non pas "h" !)

    for (b = 0; b < values.length; b++)
    {
        ctxPersonStatus.fillStyle = colors[b];
        ctxPersonStatus.fillRect(x + b * largeur, y, largeur, -h * values[b])
    }

    // axes
    ctxPersonStatus.beginPath();
    ctxPersonStatus.moveTo(x, y);
    ctxPersonStatus.lineTo(x + l * 1.1, y);
    ctxPersonStatus.stroke(); // La méthode stroke() dessine le chemin actuel
    ctxPersonStatus.beginPath();
    ctxPersonStatus.moveTo(x, y);
    ctxPersonStatus.lineTo(x, y - h * 1.1);
    ctxPersonStatus.stroke();
    ctxPersonStatus.strokeRect(x, y, l, -h);

    //Ecritures des légendes (noir, 15pt Arial)
    ctxPersonStatus.font = "15pt Arial";
    ctxPersonStatus.fillStyle = "black";
    for (b = 0; b < legends.length; b++){
        ctxPersonStatus.fillText(legends[b], x + largeur * (b + 0.25), y + 25);
    }
}

function spider(values, legends, x, y, r, c1, c2){
    // Cette fonction dessine un graphique en toile d'araignée
    // dans le dessin ctx, avec le tableau des valeurs et le tableau des légendes
    // Le graphique est placé en x, y et a pour rayon r
    // Les maxi sont repérés par la couleur c1, les valeurs par c2
    // Ici c'est le milieu du graphe qui est en x, y (pas le coin en haut à gauche)

    // Pour stocker les valeurs de personnalité d'un individu
    let arrayPersonnalityValues = [];

    // Sans dictionnaire
    for(let x in creatureTotal[0].profile)
    {
        arrayPersonnalityValues.push(creatureTotal[0].profile[x]);
    }

    // Zone de maxi (en fond)
    ctxPersonPersonality.beginPath();
    for (i = 0; i < arrayPersonnalityValues.length; i++){
        angle = -i * 2 * Math.PI / arrayPersonnalityValues.length; // Avec le - on tourne dans le sens horaire
        ctxPersonPersonality.lineTo(x + r * Math.cos(angle), y - r * Math.sin(angle));
    }
    ctxPersonPersonality.fillStyle = c1;
    ctxPersonPersonality.fill();

    //Zone des valeurs (par-dessus le fond)
    ctxPersonPersonality.beginPath();

    for (i = 0; i < arrayPersonnalityValues.length; i++){
        angle = -i * 2 * Math.PI / arrayPersonnalityValues.length;
        ctxPersonPersonality.lineTo(x + arrayPersonnalityValues[i] * r * Math.cos(angle), y - arrayPersonnalityValues[i] * r * Math.sin(angle));
    }

    ctxPersonPersonality.fillStyle = c2;
    ctxPersonPersonality.fill();

    // Zone de moitié (par-dessus le fond et les valeurs, épaisseur 1)
    // Pareil que le fond mais r*0,5 au lieu de r et stroke() au lieu de fill()
    ctxPersonPersonality.beginPath();
    for (a = 0; a <= arrayPersonnalityValues.length; a++){
        angle = -a * 2 * Math.PI / arrayPersonnalityValues.length;
        ctxPersonPersonality.lineTo(x+0.5*r*Math.cos(angle),y-0.5*r*Math.sin(angle));
    }
    ctxPersonPersonality.stroke();

    // Tracé des axes (épaisseur 2, couleur noire)
    for (a = 0; a < arrayPersonnalityValues.length; a++){
        angle = a * 2 * Math.PI / arrayPersonnalityValues.length;
        ctxPersonPersonality.beginPath();
        ctxPersonPersonality.moveTo(x,y);
        ctxPersonPersonality.lineTo(x + 1.1 * r * Math.cos(angle), y - 1.1 * r * Math.sin(angle));
        ctxPersonPersonality.lineWidth = 2;
        ctxPersonPersonality.stroke();
    }

    // Pour stocker les valeurs de statut d'un individu
    let arrayPersonnalityLegends = [];

    for(const [key, value] of Object.entries(creatureTotal[0].profile))
    {
        arrayPersonnalityLegends.push(key);
    }

    // Ecritures des légendes (noir, 15pt Arial)
    ctxPersonPersonality.font="15pt Arial";
    ctxPersonPersonality.fillStyle = "black";
    for (i = 0; i < arrayPersonnalityLegends.length; i++){
        angle = -i * 2 * Math.PI / arrayPersonnalityLegends.length;
        ctxPersonPersonality.fillText(arrayPersonnalityLegends[i], x - 5 + 1.2 * r * Math.cos(angle), y + 5 - 1.2 * r * Math.sin(angle));
        // "-5" et "+5" uniquement pour peaufiner l'emplacement des légendes
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
