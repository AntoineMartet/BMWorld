// BMWorld, display.js
// SI-CA1a
// groupe représentation, affichage
// début 30.01.2023
// À faire :
//  - Créer une liste des individus pour sélectionner l'un d'eux.

let legendsStatus = ["FC", "CP", "RA", "RP", "BE", "RE"]; // légendes à afficher (bars)
let colors = ["yellow", "orange", "red", "purple", "blue", "darkblue"]; // couleurs (bars)
let legendsPersonality = ["I", "F", "R", "P", "E"]; // légendes à afficher (spider)
let selectedCreatureIndex = 0;
let clock = 0;
let cycles = 0;
let booleanPause = 0;
let booleanCam = 0;
let camera; //création des deux caméras
let camera2;

let img; //chargement de l'image de fond
/*let matrix;
function preload(){
    matrix = loadImage('matrix.jpg');
}*/

let nx = 40; // nombre de tuiles en x
let nz = 40; // nombre de tuiles en y
let unit = 50; // taille de l'unité de base du monde. Une tuile fait 50 de côté.
let tileSize = unit - 2; // L'affichage d'une tuile fait 48 de côté.
let aWorld = [
    { "name": "axe X", "type": "line", "x": 0, "y": 0, "z": 0, "x1": 700, "y1": 0, "z1": 0, "color": "red" },
    { "name": "axe Y", "type": "line", "x": 0, "y": 0, "z": 0, "x1": 0, "y1": 700, "z1": 0, "color": "green" },
    { "name": "axe Z", "type": "line", "x": 0, "y": 0, "z": 0, "x1": 0, "y1": 0, "z1": 700, "color": "blue" },
    {"name":"monde","type":"monde","x":1000,"y":-50,"z":1000,"rx":0,"ry":0,"rz":0,"l1":100,"l2":100,"l3":100,"color":"green"}
];

let ctxPersonStatus;
let ctxPersonPersonality;

let Couleur = ['rgb(0, 115, 86)', 'rgb(82, 183, 136 )', 'rgb(144, 190, 109 )', 'rgb(128, 185, 24)', 'rgb(128, 128, 0)', 'rgb(3, 4, 94)', 'rgb(72, 202, 228)', 'rgb(114, 9, 183 )', 'rgb(205, 180, 219)', 'rgb(193, 28, 173)', 'rgb(89, 13, 34)', 'rgb(255, 143, 171 )', 'rgb(249, 65, 68)', 'rgb(249, 121, 57)', 'rgb(255, 127, 81)', 'rgb(220, 47, 2 )', 'rgb(252, 112, 8 )', 'rgb(255, 204, 0)', 'rgb(255, 218, 61 )', 'rgb(255, 234, 0 )', 'rgb(253, 255, 252 )', 'rgb(206, 212, 218)', 'rgb(0, 180, 216)', 'rgb(52, 58, 64 )', 'rgb(192, 103, 34 )'];
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
    mainDisplay = createCanvas(1200, 850, WEBGL);// canvas en 3D
    mainDisplay.parent("canvasDisplay");
    angleMode(DEGREES);// angles en degrés
    camera2 = createCamera();//création d'une deuxième caméra
    camera2.setPosition(0,-500,3000);
    camera2.lookAt(nx / 2 * unit, -0, nz / 2 * unit);
    camera = createCamera();
    camera.setPosition(-300, -500, -300);// placement de la caméra au départ, vise le centre
    camera.lookAt(nx / 2 * unit, -0, nz / 2 * unit);
    normalMaterial(250);// matériaux solides
    fnTiles();// Ajoute à aWorld un certain nombre de tuiles pour le sol
    frameRate(30);// On rafraîchit x fois par seconde
    ctxPersonStatus = document.getElementById("canvasPersonStatus").getContext("2d");
    ctxPersonPersonality = document.getElementById("canvasPersonPersonality").getContext("2d");
    ctxPersonStatus.canvas.width = 600;
    ctxPersonStatus.canvas.height = 370;
    ctxPersonPersonality.canvas.width = 600;
    ctxPersonPersonality.canvas.height = 370;
    createListOfCreatures();
}

function get_random(list) {
    return list[Math.floor((Math.random() * list.length))];
}

function fnTiles() {
    //Crée un certain nb de tuiles
    for (x = 0; x <= nx; x++) {
        for (z = 0; z <= nz; z++) {
            aWorld.push({ "name": "tile", "type": "plane", "x": x * unit, "y": 0, "z": z * unit, "rx": 90, "ry": 0, "rz": 0, "l1": tileSize, "l2": tileSize, "color": "#90BE6D" }); //tuiles vertes
        }
    }
}

function draw() {
    // fonction appelée x fois par seconde (selon le frameRate choisi)
    // NB : même les objets statiques (ex: la grille) doivent être redessinés à chaque fois, pas possible de les
    //      dessiner juste une fois dans le setup.
    background("lightblue");
    lights();//Allumer les lumières
    directionalLight(250, 250, 250, 0.2, 1, 0.6);
    orbitControl(0.5, 0.5, 0.5);//autorise le controle par souris
    if (booleanPause == 0){
        fnEngine(); // Calcule le monde de l'état suivant (se trouve dans engine.js)
    }

    fnDisplay(); // Affiche les fonds des 3 canvas, le monde, les créatures et les graphes
}

function fnDisplay() {
    // Dessin du monde : grille, axes et autres objets statiques (ex: bâtiments)
    for (let i = 0; i < aWorld.length; i++) {
        fnDisplayObject(aWorld[i]);
    }

    // Dessin des créatures
    for (let i = 0; i < creatureTotal.length; i++) {
        fnDisplayCreature(creatureTotal[i]);
    }

    // Fond du canvas PersonStatus
    ctxPersonStatus.fillStyle = "lightblue";
    ctxPersonStatus.fillRect(0, 0, 600, 600);

    // Fond du canvas PersonPersonality
    ctxPersonPersonality.fillStyle = "lightblue";
    ctxPersonPersonality.fillRect(0, 0, 600, 600);

    // Dessin des graphes
    bars(legendsStatus, 130, 335, 300, 300, colors);
    spider(legendsPersonality, 300, 188, 150, "purple", "yellow");

    // MAJ de l'affichage du nombre de cycles
    document.getElementById("cyclesNumber").innerHTML = "Cycles : " + cycles;
}

function fnUpdatePause(){
    if(booleanPause == 0){
        booleanPause = 1;
        document.getElementById("cyclesPauseButton").innerHTML = "Reprendre";
    }
    else{
        booleanPause = 0;
        document.getElementById("cyclesPauseButton").innerHTML = "Mettre en pause";
    }
}

function fnCameraSwitch(){//fonction de changement de caméra
    if(booleanCam == 0){
        booleanCam = 1;
        setCamera(camera2); //changement de caméra
        document.getElementById("SwitchCameras").innerHTML = "Caméra 1";
    }
    else{
        booleanCam = 0;
        setCamera(camera); //changement de caméra
        document.getElementById("SwitchCameras").innerHTML = "Caméra 2";
    }
}

function fnDisplayCreature(o) {

    // Rappel : "translate(o.position.x*unit, 0, o.position.z*unit)" représente LE MILIEU d'une tuile, pas un de ses coins

    let legCylinderHeight = 50;
    let legCylinderRadius = 6;
    let legHeight = legCylinderHeight + legCylinderRadius;

    // Met en évidence la créature sélectionnée (jambes blanches + disque blanc en-dessous)
    if (o.ID == selectedCreatureIndex) {
        legsColor = "white";
        push();
        translate(o.position.x * unit, 0, o.position.z * unit);
        fill("white");
        cylinder(50, 2);
        pop();
    }
    else {
        legsColor = "black";
    }

    // Quand une créature est immobile, elle est orientée vers le bas. C'est un choix arbitraire en attendant mieux, par exemple
    // de s'orienter vers la dernière direction connue.
    switch (o.type) {
        case 1: // cylinder

            // Tête
            push();
            translate(o.position.x * unit, -legHeight - 10, o.position.z * unit);
            fill(ColorCylinder);
            // Les fonctions rotate effectuent une rotation de tout le référentiel : x, y, et z ne pointent plus dans
            // les mêmes directions qu'à l'origine
            // Les fonctions rotate effectuent une rotation dans le sens trigonométrique (anti-horaire)
            if(o.direction == 2 || o.direction == 0 || o.direction == 4) rotateZ(90); // bas et haut et immobile
            else if(o.direction == 1 || o.direction == 3) rotateX(90); // gauche et droite
            cylinder(15, 90);
            pop();

            // Yeux et nez
            push();
            fill("black");
            translate(o.position.x * unit, -legHeight - 20, o.position.z * unit);
            if(o.direction == 2) rotateY(0); // bas
            else if(o.direction == 0) rotateY(180); // haut
            else if(o.direction == 3) rotateY(90); // droite
            else if(o.direction == 1) rotateY(-90); // gauche
            translate(-15, 0, -8);
            sphere(5); // oeil gauche
            translate(30, 0, 0);
            sphere(5); // oeil droit
            translate(-15, 3, -8);
            fill("black");
            sphere(3); // nez
            pop();

            // Pieds et jambes
            push();
            fill(legsColor);
            translate(o.position.x * unit, -6 - 25, o.position.z * unit);
            if(o.direction == 1 || o.direction == 3) rotateY(90); // gauche et droite
            translate(-10, 0, 0);
            cylinder(legCylinderRadius, legCylinderHeight); // jambe gauche
            translate(20, 0, 0);
            cylinder(legCylinderRadius, legCylinderHeight); // jambe droite
            translate(0, 25, 0);
            fill(legsColor);
            sphere(legCylinderRadius); // pied droit
            translate(-20, 0, 0);
            sphere(legCylinderRadius); // pied gauche
            pop();
            break;

        case 2: // box

            // Tête
            push();
            translate(o.position.x * unit, -legHeight - tileSize / 2, o.position.z * unit);
            fill(ColorCube);
            box(tileSize, tileSize, tileSize);
            pop();

            // Yeux et nez
            push();
            fill("black");
            translate(o.position.x * unit, -legHeight - 35, o.position.z * unit);
            if(o.direction == 2) rotateY(0); // bas
            else if(o.direction == 0) rotateY(180); // haut
            else if(o.direction == 3) rotateY(90); // droite
            else if(o.direction == 1) rotateY(-90); // gauche
            translate(-10, 0, -23);
            sphere(5); // oeil gauche
            translate(+20, 0, 0);
            sphere(5); // oeil droit
            translate(-10, 15, 0);
            fill("black");
            sphere(8); // nez
            pop();

            // Pieds et jambes
            push();
            fill(legsColor);
            translate(o.position.x * unit, -6 - 25, o.position.z * unit)
            if(o.direction == 1 || o.direction == 3) rotateY(90); // gauche et droite
            translate(-10, 0, 0)
            cylinder(legCylinderRadius, legCylinderHeight); // jambe gauche
            translate(20, 0, 0);
            cylinder(legCylinderRadius, legCylinderHeight); // jambe droite
            translate(0, 25, 0);
            fill(legsColor);
            sphere(legCylinderRadius); // pied droit
            translate(-20, 0, 0);
            sphere(legCylinderRadius); // pied gauche
            pop();
            break;

        case 3: // cone

            // Tête
            push();
            translate(o.position.x * unit, -legHeight - 35, o.position.z * unit);
            fill(ColorCone);
            rotateZ(180);
            cone(25, 70);
            pop();

            // Yeux et nez
            push();
            fill("black");
            translate(o.position.x * unit, -legHeight - 50, o.position.z * unit);
            if(o.direction == 2) rotateY(0); // bas
            else if(o.direction == 0) rotateY(180); // haut
            else if(o.direction == 3) rotateY(90); // droite
            else if(o.direction == 1) rotateY(-90); // gauche
            translate(-5, 0, -2);
            sphere(5); // oeil gauche
            translate(10, 0, 0);
            sphere(5); // oeil droit
            translate(-5, 3, -8);
            fill("black");
            sphere(3); // nez
            pop();

            // Pieds et jambes
            push();
            fill(legsColor);
            translate(o.position.x * unit, -6 - 25, o.position.z * unit)
            if(o.direction == 1 || o.direction == 3) rotateY(90); // gauche et droite
            translate(-10, 0, 0);
            cylinder(legCylinderRadius, legCylinderHeight); // jambe gauche
            translate(20, 0, 0);
            cylinder(legCylinderRadius, legCylinderHeight); // jambe droite
            translate(0, 25, 0);
            fill(legsColor);
            sphere(legCylinderRadius); // pied droit
            translate(-20, 0, 0);
            sphere(legCylinderRadius); // pied gauche
            pop();
            break;

        case 4: // torus

            // Tête
            push();
            translate(o.position.x * unit, -legHeight - 30, o.position.z * unit);
            if(o.direction == 1 || o.direction == 3) rotateY(90); // gauche et droite
            fill(ColorTorus);
            torus(30, 10);
            pop();

            // Yeux et nez
            push();
            fill("black");
            translate(o.position.x * unit, -legHeight - 60, o.position.z * unit);
            if(o.direction == 2) rotateY(0); // bas
            else if(o.direction == 0) rotateY(180); // haut
            else if(o.direction == 3) rotateY(90); // droite
            else if(o.direction == 1) rotateY(-90); // gauche
            translate(-15, 0, -8);
            sphere(5); // oeil gauche
            translate(30, 0, 0);
            sphere(5); // oeil droit
            translate(-15, 3, -8);
            fill("black");
            sphere(3); // nez
            pop();

            // Pieds et jambes
            push();
            fill(legsColor);
            translate(o.position.x * unit, -6 - 25, o.position.z * unit)
            if(o.direction == 1 || o.direction == 3) rotateY(90); // gauche et droite
            translate(-10, 0, 0);
            cylinder(legCylinderRadius, legCylinderHeight); // jambe gauche
            translate(20, 0, 0);
            cylinder(legCylinderRadius, legCylinderHeight); // jambe droite
            translate(0, 25, 0);
            fill(legsColor);
            sphere(legCylinderRadius); // pied droit
            translate(-20, 0, 0);
            sphere(legCylinderRadius); // pied gauche
            pop();
            break;
    }
}

function bars(legends, x, y, l, h, colors) {
    //Cette fonction dessine un graphique en barres à partir
    //de x et y, de largeur l et de hauteur h

    // Pour stocker les valeurs de personnalité de l'individu sélectionné
    let arrayPersonalityStatus = [];

    for (let x in creatureTotal[selectedCreatureIndex].status) {
        arrayPersonalityStatus.push(creatureTotal[selectedCreatureIndex].status[x]);
    }

    // barres
    let largeur = l / arrayPersonalityStatus.length;

    for (let i = 0; i < arrayPersonalityStatus.length; i++) {
        ctxPersonStatus.fillStyle = colors[i];
        ctxPersonStatus.fillRect(x + i * largeur, y, largeur, -h * arrayPersonalityStatus[i] / 100);
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
    for (let i = 0; i < legends.length; i++) {
        ctxPersonStatus.fillText(legends[i], x + largeur * (i + 0.25), y + 25);
    }
}

function spider(legends, x, y, r, c1, c2) {
    // Cette fonction dessine un graphique en toile d'araignée
    // dans le dessin ctx, avec le tableau des valeurs et le tableau des légendes
    // Le graphique est placé en x, y et a pour rayon r
    // Les maxi sont repérés par la couleur c1, les valeurs par c2
    // Ici c'est le milieu du graphe qui est en x, y (pas le coin en haut à gauche)

    // Pour stocker les valeurs de personnalité de l'individu sélectionné
    let arrayPersonalityValues = [];

    for (let x in creatureTotal[selectedCreatureIndex].profile) {
        arrayPersonalityValues.push(creatureTotal[selectedCreatureIndex].profile[x]);
    }

    // Autre méthode : avec dictionnaire (buggé : les valeurs du array sont toujours 0,1,2,3,4)
    /* for(const [key] of Object.entries(creatureTotal[selectedCreatureIndex].profile))
    {
        arrayPersonalityValues.push(key);
    } */

    // Zone de maxi (en fond)
    ctxPersonPersonality.beginPath();
    for (let i = 0; i < arrayPersonalityValues.length; i++) {
        let angle = -i * 2 * Math.PI / arrayPersonalityValues.length; // Avec le - on tourne dans le sens horaire
        ctxPersonPersonality.lineTo(x + (r+15) * Math.cos(angle), y - (r+15) * Math.sin(angle));
    }
    ctxPersonPersonality.fillStyle = c1;
    ctxPersonPersonality.fill();

    //Zone des valeurs (par-dessus le fond)
    ctxPersonPersonality.beginPath();

    for (let i = 0; i < arrayPersonalityValues.length; i++) {
        let angle = -i * 2 * Math.PI / arrayPersonalityValues.length;

        ctxPersonPersonality.lineTo(x + (arrayPersonalityValues[i] * r+15) * Math.cos(angle),y - (arrayPersonalityValues[i] * r+15) * Math.sin(angle));
    }

    ctxPersonPersonality.fillStyle = c2;
    ctxPersonPersonality.fill();

    // Zone centrale
    ctxPersonPersonality.beginPath();
    for (let i = 0; i < arrayPersonalityValues.length; i++) {
        let angle = -i * 2 * Math.PI / arrayPersonalityValues.length; // Avec le - on tourne dans le sens horaire
        ctxPersonPersonality.lineTo(x + 15 * Math.cos(angle), y - 15 * Math.sin(angle));
    }
    ctxPersonPersonality.fillStyle = "black";
    ctxPersonPersonality.fill();

    // Zone de moitié (par-dessus le fond et les valeurs, épaisseur 1)
    // Pareil que le fond mais r*0,5 au lieu de r et stroke() au lieu de fill()
    ctxPersonPersonality.beginPath();
    for (let i = 0; i <= arrayPersonalityValues.length; i++) {
        let angle = -i * 2 * Math.PI / arrayPersonalityValues.length;
        ctxPersonPersonality.lineTo(x + (0.5 * r+15) * Math.cos(angle), y - (0.5 * r+15) * Math.sin(angle));
    }
    ctxPersonPersonality.stroke();

    // Tracé des axes (épaisseur 2, couleur noire)
    for (let i = 0; i < arrayPersonalityValues.length; i++) {
        let angle = i * 2 * Math.PI / arrayPersonalityValues.length;
        ctxPersonPersonality.beginPath();
        ctxPersonPersonality.moveTo(x, y);
        ctxPersonPersonality.lineTo(x + 1.1 * r * Math.cos(angle), y - 1.1 * r * Math.sin(angle));
        ctxPersonPersonality.lineWidth = 2;
        ctxPersonPersonality.stroke();
    }

    // Ecritures des légendes (noir, 15pt Arial)
    ctxPersonPersonality.font = "15pt Arial";
    ctxPersonPersonality.fillStyle = "black";
    for (let i = 0; i < legends.length; i++) {
        let angle = -i * 2 * Math.PI / legends.length;
        ctxPersonPersonality.fillText(legends[i], x - 5 + 1.2 * r * Math.cos(angle), y + 5 - 1.2 * r * Math.sin(angle));
        // "-5" et "+5" uniquement pour peaufiner l'emplacement des légendes
    }
}

// Reçoit un objet en argument et le dessine
function fnDisplayObject(o) {
    switch (o.type) {
        case 'line':
            stroke(o.color);
            line(o.x, o.y, o.z, o.x1, o.y1, o.z1);
            noStroke();
            break;

        case 'cylinder':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            cylinder(o.r, o.l);
            pop();
            break;
        case 'plane':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(60,225,90,150); // couleur des tuiles, 150 correspond au niveau de transparence de la couleur
            plane(o.l1, o.l2);
            pop();
            break;
        case 'box':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            box(o.l1, o.l2, o.l3);
            pop();
            break;
        case 'sphere':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            sphere(o.r);
            pop();
            break;
        case 'ellipsoid':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            ellipsoid(o.r1, o.r2, o.r3);
            pop();
            break;
        case 'cone':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            cone(o.r, o.h);
            pop();
            break;
        case 'torus':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            torus(o.r1, o.r2);
            pop();
            break;
        case "monde":
            push();
            translate(o.x,o.y,o.z);
            rotateX(o.rx);
            rotateY(180);
            rotateZ(o.rz);
            //texture(matrix);
            sphere(4800,4800);
            pop();
            break;
    }
}

// Crée la liste des créatures sur la page HTML à partir du tableau creatureTotal
function createListOfCreatures() {
    for (let i = 0; i < creatureTotal.length; i++) {
        let optElement = document.createElement("option");
        optElement.setAttribute("value", creatureTotal[i].name); // Peut-être optionnel
        // optElement.setAttribute("id", i); // Probablement optionnel
        let optNode = document.createTextNode(creatureTotal[i].name);
        optElement.appendChild(optNode);
        let rootElement = document.getElementById("listPerson");
        rootElement.appendChild(optElement);
    }
}

// Appelée quand une créature est sélectionnée dans la liste
// Met à jour la variable globale avec l'index de la créature sélectionnée
function updateSelectedCreature() {
    let selectedElement = document.getElementById("listPerson");
    selectedCreatureIndex = selectedElement.selectedIndex;
    let selectedCreatureDisplay = selectedCreatureIndex + 1;

    //console.log("Index créature sélectionnée : " + selectedCreatureIndex);
    //console.log("Donc créature sélectionnée : " + selectedCreatureDisplay);
}

// Appelée en cliquant sur l'onglet "État du monde"
// Lien pour le calcul de la moyenne avec la fonction reduce() : https://www.codingem.com/javascript-calculate-average/
function fnDisplayWorldStatus() {
    let textToDisplay = "<tr> <td></td><td>Minimum</td><td>Moyenne</td><td>Maximum</td> </tr>";

    textToDisplay += fnStatusValues("Force", "FC");
    textToDisplay += fnStatusValues("Compétences", "CP");
    textToDisplay += fnStatusValues("Argent", "RA");
    textToDisplay += fnStatusValues("Patrimoine", "RP");
    textToDisplay += fnStatusValues("Compétences", "CP");
    textToDisplay += fnStatusValues("Bien-être", "BE");
    textToDisplay += fnStatusValues("Relations", "RE");

    document.getElementById("tableWorldEtat").innerHTML = textToDisplay;
}

function fnStatusValues(statusFullName, statusShortName) {
    let arrayValues = [];
    for (let i = 0; i < creatureTotal.length; i++)
    {
        arrayValues.push(creatureTotal[i].status[statusShortName]);
    }

    let min = Math.min(...arrayValues);
    let avg = arrayValues.reduce((a, b) => a + b, 0) / arrayValues.length;
    let max = Math.max(...arrayValues);

    if(statusShortName == "RA") {
        min *= 1000;
        avg *= 1000;
        max *= 1000;
    }

    return "<tr> <td>" + statusFullName + "</td><td>" + min + "</td><td>" + avg + "</td><td>" + max + "</td> </tr>";
}