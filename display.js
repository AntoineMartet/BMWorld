// BMWorld, display.js
// SI-CA1a
// groupe représentation, affichage
// début 30.01.2023

    let values=[0.1,0.5,0.8,0.2,0.7]; // valeurs à afficher
    let legends=["I","P","F","C","T"]; // légendes à afficher
    let colors=["yellow","orange","red","purple","blue"]; // couleurs (pour les barres)

    let nx= 40;//nombre de tuiles en x
    let nz=40; // nombre de tuiles en y
    let size=50; // taille des tuiles (carrées)
    let aWorld=[
        {"name":"axe X","type":"line","x":0,"y":0,"z":0,"x1":700,"y1":0,"z1":0,"color":"red"},
        {"name":"axe Y","type":"line","x":0,"y":0,"z":0,"x1":0,"y1":700,"z1":0,"color":"green"},
        {"name":"axe Z","type":"line","x":0,"y":0,"z":0,"x1":0,"y1":0,"z1":700,"color":"blue"},
        {"name":"batiment","type":"box","x":0,"y":-50,"z":0,"rx":0,"ry":0,"rz":0,"l1":100,"l2":100,"l3":100,"color":"green"}
    ];
    let ctxPerson;
    let ctxPerson2;
    /* Dans ctxPerson : créer un système d'onglets pour afficher :
        - Personnalité d'un individu
        - Etat d'un individu
       Créer une liste des individus pour sélectionner l'un d'eux.
     */
    let ctxWorld;

function setup() {
    //fonction appelée au lancement du programme
    mainDisplay = createCanvas(1000,850,WEBGL);//canvas en 3D
    mainDisplay.parent("canvasDisplay");
    angleMode(DEGREES);//angles en degrés
    camera(-300,-500,-300,nx/2*size,-0,nz/2*size);//placement de la camera au départ, vise le centre
    normalMaterial(250);//matériaux solide
    fnTiles();//Crée des tuiles comme sol
    // fnCreatures(100);//Crée 100 créatures en 3D
    frameRate(20);//2 fois par secondes on rafraichit
    ctxPerson=document.getElementById("canvasPerson").getContext("2d");
    ctxPerson2=document.getElementById("canvasPerson2").getContext("2d");
    ctxWorld=document.getElementById("canvasWorld").getContext("2d");
    ctxPerson.canvas.width  = 600;
    ctxPerson.canvas.height  = 370;
    ctxPerson2.canvas.width  = 600;
    ctxPerson2.canvas.height  = 370;
    ctxWorld.canvas.width  = 600;
    ctxWorld.canvas.height  = 410;
}

function draw() {
    //fonction appelée 2 fois par secondes (suivant le frameRate)
    background("lightblue");
    lights();//Allumer les lumières
    directionalLight(250, 250, 250, -1, -1, -1);
    orbitControl(2,2,2);//autorise le controle par souris
    fnEngine();// appelle le moteur fnEngine qui recalcule le monde de l'état suivant
    fnDisplay();
    bars(values, legends, 130, 335, 300, 300, colors);
    spider(values, legends, 300, 188, 150, "purple", "yellow");
}

function fnDisplay(){

    //Tracé du monde
    for (let i=0;i<aWorld.length;i++){
        fnDisplayObject(aWorld[i]);
    }
    //Dessin des créatures
    for (let i=0;i<creatureTotal.length;i++){
        creatureTotal[i].color="red";
        // fnDisplayObject(creatureTotal[i]);
        fnDisplayCreature(creatureTotal[i]);
    }

    //Fond du canvas personne
    ctxPerson.fillStyle = "lightblue";
    ctxPerson.fillRect(0, 0, 600, 600);

    ctxPerson2.fillStyle = "lightblue";
    ctxPerson2.fillRect(0, 0, 600, 600);



    //Fond du canvas world
    ctxWorld.fillStyle = "lightblue";
    ctxWorld.fillRect(0, 0, 600, 600);

}

function fnTiles(){
    //Crée un certain nb de tuiles
    for (x=0;x<=nx;x++) {
        for (z = 0; z <= nz ; z++) {
            aWorld.push({"name":"t","type":"plane","x":x*size,"y":0,"z":z*size,"rx":90,"ry":0,"rz":0,"l1":size-2,"l2":size-2,"color":"lightgreen"});
        }
    }
}

function fnDisplayCreature(o){
    push();
    translate(o.position.x*size,-50,o.position.z*size);
    fill(o.color);
    box(size/2,size/2,size/2);
    //pop();
    //Dessine les yeux à un objet
    //push();

    translate(-10,-size/2,20);
    sphere(5);
    translate(+20,0,0);
    sphere(5);
    //nez
    translate(-10,15,5);
    cone(10);

    //pieds
    translate(-10,32,-25)
    cone(-14,80);
    translate(20,20,0)
    cone(14,80);
    pop();
}

function bars(values, legends, x, y, l, h, colors){
    //Cette fonction dessine un graphique en barres à partir
    //de x, y, de largeur l, de hauteur h

    // barres
    largeur = l / values.length; // largeur des barres ("l" et non pas "h" !)

    for (b = 0; b < values.length; b++)
    {
        ctxPerson.fillStyle = colors[b];
        ctxPerson.fillRect(x + b * largeur, y, largeur, -h * values[b])
    }

    // axes
    ctxPerson.beginPath();
    ctxPerson.moveTo(x, y);
    ctxPerson.lineTo(x + l * 1.1, y);
    ctxPerson.stroke(); // La méthode stroke() dessine le chemin actuel
    ctxPerson.beginPath();
    ctxPerson.moveTo(x, y);
    ctxPerson.lineTo(x, y - h * 1.1);
    ctxPerson.stroke();
    ctxPerson.strokeRect(x, y, l, -h);

    //Ecritures des légendes (noir, 15pt Arial)
    ctxPerson.font = "15pt Arial";
    for (b = 0; b < legends.length; b++){
        ctxPerson.fillText(legends[b], x + largeur * (b + 0.5), y + 25);
    }
}

function spider(values, legends, x, y, r, c1, c2){
    // Cette fonction dessine un graphique en toile d'araignée
    // dans le dessin ctx, avec le tableau des valeurs et le tableau des légendes
    // Le graphique est placé en x, y et a pour rayon r
    // Les maxi sont repérés par la couleur c1, les valeurs par c2
    // Ici c'est le milieu du graphe qui est en x, y (pas le coin en haut à gauche)

    // Zone de maxi (en fond)
    ctxPerson2.beginPath();
    for (a = 0; a < values.length; a++){
        angle = -a * 2 * Math.PI / values.length; // Avec le - on tourne dans le sens horaire
        ctxPerson2.lineTo(x + r * Math.cos(angle), y - r * Math.sin(angle))
    }
    ctxPerson2.fillStyle = c1;
    ctxPerson2.fill();

    //Zone des valeurs (par-dessus le fond)
    ctxPerson2.beginPath();
    for (a = 0; a < values.length; a++){
        angle = -a * 2 * Math.PI / values.length;
        ctxPerson2.lineTo(x + values[a] * r * Math.cos(angle), y - values[a] * r * Math.sin(angle))
    }
    ctxPerson2.fillStyle = c2;
    ctxPerson2.fill();

    // Zone de moitié (par-dessus le fond et les valeurs, épaisseur 1)
    // Pareil que le fond mais r*0,5 au lieu de r et stroke() au lieu de fill()
    ctxPerson2.beginPath();
    for (a = 0; a <= values.length; a++){
        angle = -a * 2 * Math.PI / values.length;
        ctxPerson2.lineTo(x+0.5*r*Math.cos(angle),y-0.5*r*Math.sin(angle))
    }
    ctxPerson2.stroke();

    // Tracé des axes (épaisseur 2, couleur noire)
    for (a = 0; a < values.length; a++){
        angle = a * 2 * Math.PI / values.length;
        ctxPerson2.beginPath();
        ctxPerson2.moveTo(x,y);
        ctxPerson2.lineTo(x + 1.1 * r * Math.cos(angle), y - 1.1 * r * Math.sin(angle))
        ctxPerson2.lineWidth = 2;
        ctxPerson2.stroke();
    }

    // Ecritures des légendes (noir, 15pt Arial)
    ctxPerson2.font="15pt Arial";
    for (a = 0; a < legends.length; a++){
        angle = -a * 2 * Math.PI / values.length;
        ctxPerson2.fillText(legends[a], x - 5 + 1.2 * r * Math.cos(angle), y + 5 - 1.2 * r * Math.sin(angle));
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
