let sketch1 = function(p) {

    p.setup = function() {
        p.createCanvas(400, 400);
    };

    p.draw = function() {
        p.background("#d8b9c3");
        p.fill("#363062");
        p.noStroke();
        p.rect(200, p.mouseY, 150, 150);
    };

};

let myp51 = new p5(sketch1, 'c1');

// Sketch Deux

let sketch2 = function(p) {

    p.setup = function() {
        p.createCanvas(400, 200);
    };

    p.draw = function() {
        p.background("#827397");
        p.fill("#4d4c7d");
        p.noStroke();
        p.ellipse(p.mouseX, 90, 90, 90);
    };

};

var myp52 = new p5(sketch2, 'c2');

// Sketch Trois

var sketch3 = function(p) {

    let vy=0;
    let nx=25;
    let nz=25;
    let size=50;
    let aMonde=[
        {"name":"axe X","type":"line","x":0,"y":0,"z":0,"x1":700,"y1":0,"z1":0,"color":"red"},
        {"name":"axe Y","type":"line","x":0,"y":0,"z":0,"x1":0,"y1":700,"z1":0,"color":"green"},
        {"name":"axe Z","type":"line","x":0,"y":0,"z":0,"x1":0,"y1":0,"z1":700,"color":"blue"},
    ];
    let acr=[];

    p.setup = function() {
        p.createCanvas(1000,800,p.WEBGL);//canvas en 3D
        p.angleMode(p.DEGREES);//angles en degrés
        p.camera(500,-500,1000,0,-0,0);//placement de la camera au départ, vise le centre
        p.normalMaterial(250);//matériaux solide
        p.fnCreeTuiles();//Crée des tuiles comme sol
        p.fnCreatures(100);//Crée 100 créatures en 3D
        p.frameRate(2);//2 fois par secondes on rafraichit
    }

    p.draw=function() {
        p.background("lightblue");

        p.lights();//Allumer les lumières
        p.directionalLight(250, 250, 250, -1, -1, -1);
        p.orbitControl(2,2,2);//autorise le controle par souris
        p.fnBouge();
        p.fnDessine();
    }

    p.fnDessine=function(){

        //Tracé du monde
        for (let i=0;i<aMonde.length;i++){
            p.fnDessineObjet(aMonde[i]);
        }
        //Dessin des créatures
        for (let i=0;i<acr.length;i++){
            p.fnDessineObjet(acr[i]);
        }
        //Dessin de 2 yeux aux créatures
        for (let i=0;i<acr.length;i++){
            p.fnDessineYeux(acr[i]);
        }
    }



    p.fnDessineObjet=function(o){

        switch (o.type) {
            case 'line':
                p.stroke(o.color);
                p.line(o.x,o.y,o.z,o.x1,o.y1,o.z1);
                p.noStroke();
                break;

            case 'cylinder':
                p.push();
                p.translate(o.x,o.y,o.z);
                p.rotateX(o.rx);
                p.rotateY(o.ry);
                p.rotateZ(o.rz);
                p.fill(o.color);
                p.cylinder(o.r,o.l);
                p.pop();
                break;
            case 'plane':
                p.push();
                p.translate(o.x,o.y,o.z);
                p.rotateX(o.rx);
                p.rotateY(o.ry);
                p.rotateZ(o.rz);
                p.fill(o.color);
                p.plane(o.l1,o.l2);
                p.pop();
                break;
            case 'box':
                p.push();
                p.translate(o.x,o.y,o.z);
                p.rotateX(o.rx);
                p.rotateY(o.ry);
                p.rotateZ(o.rz);
                p.fill(o.color);
                p.box(o.l1,o.l2,o.l3);
                p.pop();
                break;
            case 'sphere':
                p.push();
                p.translate(o.x,o.y,o.z);
                p.rotateX(o.rx);
                p.rotateY(o.ry);
                p.rotateZ(o.rz);
                p.fill(o.color);
                p.sphere(o.r);
                p.pop();
                break;
            case 'ellipsoid':
                p.push();
                p.translate(o.x,o.y,o.z);
                p.rotateX(o.rx);
                p.rotateY(o.ry);
                p.rotateZ(o.rz);
                p.fill(o.color);
                p.ellipsoid(o.r1,o.r2,o.r3);
                p.pop();
                break;
            case 'cone':
                p.push();
                p.translate(o.x,o.y,o.z);
                p.rotateX(o.rx);
                p.rotateY(o.ry);
                p.rotateZ(o.rz);
                p.fill(o.color);
                p.cone(o.r,o.h);
                p.pop();
                break;
            case 'torus':
                p.push();
                p.translate(o.x,o.y,o.z);
                p.rotateX(o.rx);
                p.rotateY(o.ry);
                p.rotateZ(o.rz);
                p.fill(o.color);
                p.torus(o.r1,o.r2);
                p.pop();
                break;
        }

    }

    p.fnCreeTuiles=function(){
        //Crée un certain nb de tuiles
        for (x=-nx/2;x<=nx/2;x++) {
            for (z = -nz / 2; z <= nz / 2; z++) {
                aMonde.push({"name":"t","type":"plane","x":x*size,"y":0,"z":z*size,"rx":90,"ry":0,"rz":0,"l1":size-2,"l2":size-2,"color":"lightgreen"});

            }
        }
    }
    p.fnCreatures=function(n){
        //Crée un certain nb de créatures
        for (c=0;c<n;c++) {
            x=Math.floor(Math.random()*nx)-nx/2;
            z=Math.floor(Math.random()*nz)-nz/2;
            acr.push({"name":c,"type":"ellipsoid","x":x*size,"y":-size-5,"z":z*size,"rx":0,"ry":0,"rz":0,"r1":size/2,"r2":size,"r3":size/2,"color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)});
        }
    }

    p.fnBouge=function() {
        //fait bouger les créatures de 2 max
        for (i=0;i<acr.length;i++){
            dx=Math.round(Math.random()*2-1)*1/3;
            dz=Math.round(Math.random()*2-1)*1/3;
            if (acr[i].x+dx*size>-nx/2*size && acr[i].x+dx*size<nx/2*size &&
                acr[i].z+dz*size>-nz/2*size && acr[i].z+dz*size<nz/2*size){
                acr[i].x+=dx*size;
                acr[i].z+=dz*size;
            }

        }
    }

    p.fnDessineYeux=function(o){
        //Dessine les yeux à un objet
        p.push();
        p.fill("black");
        p.translate(o.x-10,o.y-size/2,o.z+20);
        p.sphere(5);
        p.translate(+20,0,0);
        p.sphere(5);
        //nez
        p.translate(-10,15,5);
        p.fill(o.color);
        p.sphere(10);

        //pieds
        p.translate(-10,50,-25)
        p.rotateX(180)
        p.cone(-10,30);
        p.translate(20,0,0)
        p.cone(10,30);
        p.pop();
    }


};

let myp53 = new p5(sketch3, 'c3');