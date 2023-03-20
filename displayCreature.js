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

            if (randomCylinder == 1){ //Caractéristique force
                fill(ColorCylinder); //bras du personnage
                translate(40,7,10);
                sphere(14);
                translate(10,3,-10);
                sphere(10);
                translate(-2,6,-8);
                fill("black");
                sphere(6);
                translate(-96,-25,8); //haltère du personnage
                cylinder(14,3);
                translate(0,-10,0)
                fill("gray")
                cylinder(2,25);
                translate(0,-10,0);
                fill("black");
                cylinder(14,3);}


            if (randomCylinder == 2){ //Caractéristique richesse argent
                translate(-40,25,5);    //billet
                fill("green");
                box(5,14);
                fill("white");
                rotateY(90);
                box(2,6);
                translate(0,5,0);
                box(2,6);
                translate(0,-10,0);
                box(2,6);
                rotateY(90);
                rotateX(45);
                translate(-25,-20,18);  //monocle
                fill("gold");
                torus(7,1);
                translate(4,10,-1);
                rotateX(-20);
                torus(4,1);
                translate(5,5,-1);
                rotateX(-20);
                torus(2,1);}


            if (randomCylinder == 3){   //caractéristique relation
                translate(0,-20,15);    //halo de lumière
                rotateX(90);
                emissiveMaterial(255, 249, 21);
                torus(15,3);
                fill("white");  //ailes d'ange
                translate(0,0,-22);
                rotateZ(90);
                ellipsoid(5,70);
                translate(0,0,-5);
                ellipsoid(5,65);
                translate(0,0,-5);
                ellipsoid(5,60);}

            if (randomCylinder == 4){   //Caractéristique compétence
                translate(30,7,15); //bretelle1
                rotateZ(90);
                cylinder(17,5);
                translate(0,60,0);  //bretelle2
                cylinder(17,5);
                rotateY(90);    //sac et poche
                rotateX(90);
                translate(-18,0,30);
                box(4,35,75);
                translate(0,5,0);
                fill("#8400FF");
                box(10,15,55); //profondeur, hauteur, largeur, poche
                translate(0,-22,0)
                rotateY(90);
                torus(5,1);}

            if (randomCylinder == 5){   //Caractéristique bien-être
                fill("yellow"); //fleur et pétales
                rotateX(-30);
                translate(33,-5,0);
                sphere(3);
                fill("rose");
                translate(0,0,1);
                ellipsoid(3,6);
                rotateZ(90);
                ellipsoid(3,6);
                rotateZ(-90);
                rotateX(30);
                translate(-70,20,-5)//Coco
                fill("#5E3927");
                sphere(8);
                fill("red");
                translate(0,-10,0);//paillebas
                rotateZ(90)
                rotateX(30)
                box(9.5,2,2);
                translate(-7,-3,0); //paillehaut
                rotateZ(45);
                box(8,2,2);}

            if (randomCylinder == 6){   //Caratéristique richesse possession
                emissiveMaterial(255, 249, 21); //colliers
                fill("gold");
                translate(35,8,16);
                rotateY(90);
                torus(16,2);
                rotateY(-90);
                translate(-70,0,0);
                rotateY(90);
                torus(16,2);
                rotateY(-90);
                fill("gold");   //dollar
                translate(0,17,-1);
                sphere(1);
                translate(0,2,0);
                box(8,2,2);
                translate(4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(-4,4,0);
                box(8,2,2);
                translate(-4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(4,4,0);
                box(8,2,2);
                translate(-1,-8,0);
                rotateZ(-90)
                box(19,1,1);
                translate(0,2,0);
                box(19,1,1);
                rotateZ(90);
                rotateY(90);
                translate(0,-27,70);
                rotateY(-90);
                fill("gold");   //dollar
                translate(0,17,-1);
                sphere(1);
                translate(0,2,0);
                box(8,2,2);
                translate(4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(-4,4,0);
                box(8,2,2);
                translate(-4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(4,4,0);
                box(8,2,2);
                translate(-1,-8,0);
                rotateZ(-90)
                box(19,1,1);
                translate(0,2,0);
                box(19,1,1);}

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

            if (randomCube == 1){ //Caractéristique force
                fill(ColorCube);    //bras du personnage
                translate(30,7,10);
                sphere(14);
                translate(10,3,-10);
                sphere(10);
                translate(-2,6,-8);
                fill("black");
                sphere(6);
                translate(-76,-25,8);   //haltère
                cylinder(14,3);
                translate(0,-10,0)
                fill("gray")
                cylinder(2,25);
                translate(0,-10,0);
                fill("black");
                cylinder(14,3);}

            if (randomCube == 2){   //Caractéristique richesse argent
                translate(-25,0,5); //Billet
                fill("green");
                box(5,14);
                fill("white");
                rotateY(90);
                box(2,6);
                translate(0,5,0);
                box(2,6);
                translate(0,-10,0);
                box(2,6);
                rotateY(90);
                translate(-15,-10,8); //Monocle
                fill("gold");
                torus(7,1);
                translate(4,10,0);
                torus(4,1);
                translate(5,5,0);
                torus(2,1);}


            if (randomCube == 3){   //Caractéristique relation
                translate(0,-40,23);  //Halo de lumière
                rotateX(90);
                emissiveMaterial(255, 249, 21);
                torus(15,3);
                fill("white");  //Ailes d'ange
                translate(0,0,-30);
                rotateZ(90);
                ellipsoid(5,45);
                translate(0,0,-5);
                ellipsoid(5,40);
                translate(0,0,-5);
                ellipsoid(5,35);}

            if (randomCube == 4){   //Caractéristique compétence
                translate(20,-4,25);
                box(4,53); //bretelle1
                translate(-40,0,0);
                box(4,53); //bretelle2
                rotateY(90);
                translate(-28,10,20);
                box(4,35,45); //sac et poche
                translate(0,5,0);
                fill("#8400FF");
                box(10,15,25); //profondeur, hauteur, largeur, poche
                translate(0,-22,0)
                rotateY(90);
                torus(5,1);}

            if (randomCube == 5){   //Caractéristique bien-être
                fill("yellow"); //Fleur et pétales
                translate(20,-25,-3);
                sphere(3);
                fill("rose");
                translate(0,0,1);
                ellipsoid(3,6);
                rotateZ(90);
                ellipsoid(3,6);
                rotateZ(-90);
                translate(-40,30,-5)//Coco
                fill("#5E3927");
                sphere(8);
                fill("red");
                translate(0,-10,0);//paillebas
                rotateZ(90)
                rotateX(30)
                box(9.5,2,2);
                translate(-7,-3,0); //paillehaut
                rotateZ(45);
                box(8,2,2);}

            if (randomCube == 6){   //Caractéristique richesse possession
                emissiveMaterial(255, 249, 21); //Collier
                fill("gold");
                translate(21,16,-2);
                torus(3,1);
                translate(-7,0,0);
                torus(3,1);
                translate(-7,0,0);
                torus(3,1);
                translate(-7,0,0);
                torus(3,1);
                translate(-7,0,0);
                torus(3,1);
                translate(-7,0,0);
                torus(3,1);
                translate(-7,0,0);
                torus(3,1);
                fill("gold");
                translate(21,4,-1);
                sphere(1);  //dollar
                translate(0,2,0);
                box(8,2,2);
                translate(4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(-4,4,0);
                box(8,2,2);
                translate(-4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(4,4,0);
                box(8,2,2);
                translate(-1,-8,0);
                rotateZ(-90)
                box(19,1,1);
                translate(0,2,0);
                box(19,1,1);}


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



            if (randomCone == 1){   //Caractéristique force
                fill(ColorCone);
                translate(20,20,10);    //Bras du personnage
                sphere(14);
                translate(10,3,-10);
                sphere(10);
                translate(-2,6,-8);
                fill("black");
                sphere(6);
                translate(-50,-20,8);   //Haltère
                cylinder(14,3);
                translate(0,-10,0)
                fill("gray")
                cylinder(2,25);
                translate(0,-10,0);
                fill("black");
                cylinder(14,3);}


            if (randomCone == 2){   //Caractéristique relation
                rotateX(90);  //Halo de lumière
                translate(0,10,15);
                emissiveMaterial(255, 249, 21);
                torus(15,3);
                fill("white");  //Ailes d'anges
                translate(0,0,-30);
                rotateZ(90);
                ellipsoid(5,35);
                translate(0,0,-5);
                ellipsoid(5,30);
                translate(0,0,-5);
                ellipsoid(5,25);}


            if (randomCone == 3){   //Caractéristique richesse argent
                rotateZ(17);    //Billet
                translate(-13,30,10);
                fill("green");
                box(5,14);
                fill("white");
                rotateY(90);
                box(2,6);
                translate(0,5,0);
                box(2,6);
                translate(0,-10,0);
                box(2,6);
                rotateY(90);
                translate(-4,-25,3);
                rotateY(40);
                fill("gold");   //Monocle
                torus(7,1);
                translate(4,10,0);
                torus(4,1);
                translate(5,5,0);
                torus(2,1);}

            if (randomCone == 4){   //Caractéristique Compétence
                translate(40,30,10);
                translate(-40,0,0);
                cylinder(21,7); //bretelle1
                rotateY(90);
                translate(-20,-10,0);
                box(4,35,45); //sac et poche
                translate(0,5,0);
                fill("#8400FF");
                box(10,15,25); //profondeur, hauteur, largeur, poche
                translate(0,-22,0)
                rotateY(90);
                torus(5,1);}

            if (randomCone == 5){ //Caractéristique bien-être
                fill("yellow"); //Fleur et pétales
                rotateX(-15);
                translate(0,-23,0);
                sphere(3);
                fill("rose");
                translate(0,0,1);
                ellipsoid(3,6);
                rotateZ(90);
                ellipsoid(3,6);
                rotateZ(-90);
                rotateX(15);
                translate(-10,45,-15)//Coco
                fill("#5E3927");
                sphere(8);
                fill("red");
                translate(0,-10,0);//paillebas
                rotateZ(90)
                rotateX(30)
                box(9.5,2,2);
                translate(-7,-3,0); //paillehaut
                rotateZ(45);
                box(8,2,2);}

            if (randomCone == 6){   //Caractéristique richesse possession
                rotateX(-20);   //Collier
                emissiveMaterial(255, 249, 21);
                fill("gold");
                translate(0,16,1);
                torus(3,1);
                translate(7,-3,2);
                rotateY(-20);
                torus(3,1);
                translate(7,-3,2);
                rotateY(-30);
                torus(3,1);
                rotateY(50);
                translate(-13,6,-4)
                translate(-7,-3,0);
                rotateY(20);
                torus(3,1);
                translate(-7,-3,2);
                rotateY(30);
                torus(3,1);
                rotateY(-50);
                rotateX(20)
                fill("gold");
                rotateX(-20);
                translate(13,11,-7);
                sphere(1);  //dollar
                translate(0,2,0);
                box(8,2,2);
                translate(4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(-4,4,0);
                box(8,2,2);
                translate(-4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(4,4,0);
                box(8,2,2);
                translate(-1,-8,0);
                rotateZ(-90)
                box(19,1,1);
                translate(0,2,0);
                box(19,1,1);}

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
            translate(-15, 3, -5);
            fill("black");
            sphere(3); // nez


            if (randomTorus == 1){ //Caractéristique force
                fill(ColorTorus);   //Bras du personnage
                translate(40,30,10);
                sphere(14);
                translate(10,3,-10);
                sphere(10);
                translate(-2,6,-8);
                fill("black");
                sphere(6);
                translate(-96,-25,8);   //Haltère
                cylinder(14,3);
                translate(0,-10,0)
                fill("gray")
                cylinder(2,25);
                translate(0,-10,0);
                fill("black");
                cylinder(14,3);}


            if (randomTorus == 2){  //Caractéristique richesse argent
                translate(-40,25,3);   //Billet
                fill("green");
                box(5,14);
                fill("white");
                rotateY(90);
                box(2,6);
                translate(0,5,0);
                box(2,6);
                translate(0,-10,0);
                box(2,6);
                rotateY(90);
                translate(-25,-23,0);   //Monocle
                fill("gold");
                torus(7,1);
                translate(4,10,0);
                torus(4,1);
                translate(5,5,0);
                torus(2,1);}


            if (randomTorus == 3){  //Caractéristique relation
                rotateX(90);    //Halo de lumière
                translate(0,12,20);
                emissiveMaterial(255, 249, 21);
                torus(15,3);
                fill("white");  //Ailes d'anges
                translate(40,2,-40);
                rotateZ(90);
                ellipsoid(5,20);
                translate(0,0,-5);
                ellipsoid(5,15);
                translate(0,0,-5);
                ellipsoid(5,10);
                translate(0,80,10);
                ellipsoid(5,20);
                translate(0,0,-5);
                ellipsoid(5,15);
                translate(0,0,-5);
                ellipsoid(5,10);}

            if (randomTorus == 4){  //Caractéristique Compétence
                translate(22,7,12);
                rotateZ(140);
                cylinder(12,5); //bretelle1
                translate(35,28,0);
                rotateZ(-100);
                cylinder(12,5); //bretelle2
                rotateY(90);
                rotateX(90);
                translate(-10,30,0);
                rotateX(-50);
                box(4,35,75); //sac et poche
                translate(0,5,0);
                fill("#8400FF");
                box(10,15,55); //profondeur, hauteur, largeur, poche
                translate(0,-22,0)
                rotateY(90);
                torus(5,1);}

            if (randomTorus == 5){  //Caractéristique bien-être
                fill("yellow"); //Fleur et pétales
                rotateX(-15);
                translate(30,5,5);
                sphere(3);
                fill("rose");
                translate(0,0,1);
                ellipsoid(3,6);
                rotateZ(90);
                ellipsoid(3,6);
                rotateZ(-90);
                rotateX(15);
                translate(-60,20,-5)//Coco
                fill("#5E3927");
                sphere(8);
                fill("red");
                translate(0,-10,0);//paillebas
                rotateZ(90)
                rotateX(30)
                box(9.5,2,2);
                translate(-7,-3,0); //paillehaut
                rotateZ(45);
                box(8,2,2);}

            if (randomTorus == 6){  //Caractéristique richesse possession
                emissiveMaterial(255, 249, 21); //collier
                fill("gold");
                translate(21,16,-2);
                torus(3,1);
                translate(-7,3,0);
                torus(3,1);
                translate(-7,3,0);
                torus(3,1);
                translate(-7,3,0);
                torus(3,1);
                translate(-7,-3,0);
                torus(3,1);
                translate(-7,-3,0);
                torus(3,1);
                translate(-7,-3,0);
                torus(3,1);
                fill("gold");
                translate(21,13,-1);
                sphere(1);  //dollar
                translate(0,2,0);
                box(8,2,2);
                translate(4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(-4,4,0);
                box(8,2,2);
                translate(-4,4,0);
                rotateZ(-90);
                box(8,2,2);
                rotateZ(90);
                translate(4,4,0);
                box(8,2,2);
                translate(-1,-8,0);
                rotateZ(-90)
                box(19,1,1);
                translate(0,2,0);
                box(19,1,1);}

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