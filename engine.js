// BMWorld, engine.js
// SI-CA1a
// groupe moteur du monde
// début 30.01.2023
// Ce fichier contient tout pour animer les créatures.

let stepCount = 0;





//profil
//	I = immédiat, envie de plaisir immédiat (par. Ex jouer)
//	F = future, envie d'investir pour le futur (p. exemple travailler, étudier)
//	R = relation, envie d'investir dans des relations
//	P = possession, envie de posséder un max d'argent (AG) et d'objets (OB)
//	E = Ethique, plus le niveau est haut, moins la créature se permet des actions douteuses
//	Le profil est susceptible d'être modifié en fonction des expériences, des relations…

//état
//	FC = Force, quel état de force (dépend du sport)
//	CP = Compétences, dépend des études
//	RA = Richesse sous forme argent
//	RP = Richesse sous forme possession
//	BE = bien-être, qui dépend des activités et du profil.
//	RE = qualité/quantité de relations





//Probabilité action
//les actions: type 1= indiv, type 2= à deux, type=4 avec gagnant ou perdant 
actions= [
    {"ID":"ETU","type":1,"prob":[0, 2, 0, 0, 1],"effect":{"FC": 0,"CP":2,"RA":0,"RP":0,"BE":0,"RE":1}, "effect2":[0, 0,0,0,0]},
    {"ID":"TRA","type":1,"prob":[0, 2, 0, 1, 1],"effect":{"FC": 0,"CP":1,"RA":1000,"RP":0,"BE":0,"RE":1}, "effect2":[0, 0,0,0,0]},
    {"ID":"JOS","type":1,"prob":[2, 0, -1, 0, 0],"effect":{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":2,"RE":0}, "effect2":[0, 0,0,0,0]},
    {"ID":"SPS","type":1,"prob":[0, 1, 0, 0, 0],"effect":{"FC": 2,"CP":0,"RA":0,"RP":0,"BE":1,"RE":0}, "effect2":[0, 0,0,0,0]},
    {"ID":"VOS","type":1,"prob":[1, -1, 0, 2, -2],"effect":{"FC": 0,"CP":0,"RA":200,"RP":2,"BE":0,"RE":-1}, "effect2":[0, 0,0,0,0]},
    {"ID":"COS","type":1,"prob":[2, 0, 0, 0, -2],"effect":{"FC": -1,"CP":-1,"RA":-500,"RP":0,"BE":1,"RE":0}, "effect2":[-0.02, 0,0,0,0]},      
    {"ID":"COB","type":1,"prob":[1, 0, 0, 2, 0],"effect":{"FC": 0,"CP": 0,"RA":-200,"RP":1,"BE":1,"RE":0}, "effect2":[0, 0,0,0,0]}, 
    
    {"ID":"JO2","type":2,"prob":[1, 0, 2, 0, 0],"effect":{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":2,"RE":2}, "effect2":[0, 0,0,0,0]},
    {"ID":"DI2","type":2,"prob":[1, 0, 2, 0, 0],"effect":{"FC": 0,"CP":1,"RA":0,"RP":0,"BE":1,"RE":2}, "effect2":[0, 0,0,0,0]},
    {"ID":"SP2","type":2,"prob":[1, 1, 1, 0, 0], "effect":{"FC": 2,"CP":0,"RA":0,"RP":0,"BE":1,"RE":1}, "effect2":[0, 0,0,0,0]},//ici les deux sont gagnants
    {"ID":"VO2","type":4,"prob":[1, -1, 0, 2, -2], "effect":[{"FC": 0,"CP":0,"RA":200,"RP":1,"BE":1,"RE":0},{"FC": 0,"CP":0,"RA":200,"RP":1,"BE":1,"RE":-2},{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":-1,"RE":0},{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":-2,"RE":-2}], "effect2":[0, 0,0,0,0]},//ici le premier est le gagnant 
    // effect[0] vole et pas attrapé // effect[1] vole et attrapé // effect[2] vole pas et pas attrapé // effect[3] vole pas et attrapé 

    {"ID":"VO2b","type":4,"effect":[{"FC": 0,"CP":0,"RA":-200,"RP":-1,"BE":-1,"RE":0},{"FC": 0,"CP":0,"RA":-200,"RP":-1,"BE":-1,"RE":-1},{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":0,"RE":0},{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":2,"RE":0}], "effect2":[0, 0,0,0,0]}//ici le second le perdant   
    // effect[0] se fait voler et voleur pas attrapé // effect[1] se fait voler et voleur attrapé // effect[2] se fait pas voler et voleur pas attrapé // effect[3] se fait pas voler et voleur attrapé 
]
 



//Creature-----------------------------------------------------------------------
//fix les valeurs pour tous les satatus à 50
const valDefStatus = 50;


 /*
   I = immédiat, F = future, R = relation, P = possession, E = Ethique
   FC = Force, CP = Compétences, RA = Richesse sous forme argent, RP = Richesse sous forme possession, BE = bien-être, o	RE = qualité/quantité de relations
 */

//15 creatures defaults
//JSON pour tous les creatures (100)
let creatureTotal = [
    {   "ID": 0, "name": "BOB",
        "position" : {"x": 0, "z": 0},
        "profile"  : [1.00,0.00,0.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 1, "name": "MICHAEL",
        "position" : {"x": 10, "z": 10},
        "profile"  : [0.02,1.00,0.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 2, "name": "LEO",
        "position" : {"x": 20, "z": 20},
        "profile"  : [0.00,0.00,1.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 3, "name": "SIMONNE",
        "position" : {"x": 30, "z": 30},
        "profile"  : [0.00,0.00,0.02,1.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 4, "name": "ROSE",
        "position" : {"x": 30, "z": 29},
        "profile"  : [0.00,0.00,0.00,0.02,1.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 5, "name": "NICOLAS",
        "position" : {"x": 34, "z": 34},
        "profile"  : [1.00,1.00,0.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 6, "name": "ANTOINE",
        "position" : {"x": 35, "z": 35},
        "profile"  : [1.00,0.02,1.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 7, "name": "KAREN",
        "position" : {"x": 25, "z": 25},
        "profile"  : [1.00,0.02,0.02,1.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 8, "name": "PATRICK",
        "position" : {"x": 15, "z": 15},
        "profile"  : [1.00,0.02,0.00,0.02,1.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 9, "name": "MAX",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,1.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 10, "name": "NICK",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,0.02,1.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 11, "name": "PAUL",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,0.02,0.02,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 12, "name": "HOPE",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,1.00,1.00,0.02],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 13, "name": "ARTHUR",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,1.00,0.02,1.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    },
    {   "ID": 14, "name": "ADAM",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,1.00,1.00,1.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    }
]


//Ajouter le reste de creature
for(let i = (creatureTotal.length);i < 100; i++) {
    creatureTotal.push({
    "ID"       : i,
    "name"     : "creature " + (i+1), 
    "position" : {"x": Math.floor(Math.random() * 40), "z": Math.floor(Math.random() * 40)}, 
    "profile"  : [(Math.random() * 1.01).toFixed(2),   (Math.random() * 1.01).toFixed(2),
                  (Math.random() * 1.01).toFixed(2),   (Math.random() * 1.01).toFixed(2),   (Math.random() * 1.01).toFixed(2)],
    "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, 
                  "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
    "direction": Math.floor(Math.random() * 4),
    "type"     : Math.floor(Math.random() * 4) + 1,
    "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
    "near"     : null,
    "action"   : null
    })
}



//-----------------------------------------------------------------------fin 


function fnEngine(){
    //Cette fonction va faire
    //frameRate(0.000001); //permet de mettre le monde en "pause afin de checker l'avancement pas à pas"
    fnMove();

    stepCount++;
}

let PositionCreatures = [];

function fnResetPositionCreatures(){ //pour initilaliser le tableau "PositionCreatures" à null

    for (let i = 0; i < 40; i++) {
        PositionCreatures[i] = [];
        for(let j = 0; j < 40; j++) {
            PositionCreatures[i][j] = [];
        }
        
    }

}

function fnMove() {
    //fait bouger les créatures de 2 max
    fnResetPositionCreatures();//maikol//reset le tableau qui stock la position des créatures afin de savoir s'il y a des créatures proche les unes des autres

    for (i=0;i<creatureTotal.length;i++){
        switch(creatureTotal[i].direction) { //AYAMI
            case 0: //up
            if(creatureTotal[i].position.z + 0.1 < 40) {
                creatureTotal[i].position.z += 0.1;
            } else {
                fnChangeDirection();
            }
            break;
            case 1: //right
            if(creatureTotal[i].position.x + 0.1 < 40) {
                creatureTotal[i].position.x += 0.1;
            } else {
                fnChangeDirection();
            }
            break;
            case 2: //down
            if(creatureTotal[i].position.z - 0.1 >= 0) {
                creatureTotal[i].position.z -= 0.1;
            } else {
                fnChangeDirection();
            }
            break;
            case 3: // left
            if(creatureTotal[i].position.x - 0.1 >= 0) {
                creatureTotal[i].position.x -= 0.1;
            } else {
                fnChangeDirection();
            } 

        }

        //Random pour le possibilité à changer le direction
        let randomProbability
        if (creatureTotal[i].direction == 4){//si la créature ne bouge pas, elle a plus de chance de changer de direction
            randomProbability = 10;
        }
        else{
            randomProbability = 20;
        }
        let probability = Math.floor(Math.random() *randomProbability) 
        if(probability == 0 ) {
            fnChangeDirection();
        }
        console.log(Math.round(creatureTotal[i].position.x),Math.round(creatureTotal[i].position.z));
        let x = Math.min(39, Math.round(creatureTotal[i].position.x))
        let z = Math.min(39, Math.round(creatureTotal[i].position.z))
        PositionCreatures[x][z].push(creatureTotal[i].ID);
        creatureTotal[i].near = null;//maikol
        creatureTotal[i].action = null;//maikol   
    
    }
    if(stepCount%50==0){
        fnCheckPosOtherCreatures();//maikol 
        fnActionProba();//maikol 
        fnActionEffect();//maikol
    }     
    
}

function fnChangeDirection (){ //pour changer le direction
    let newDirection;
    do {
        newDirection = Math.floor(Math.random() * 5);
    }
    while(newDirection == creatureTotal[i].direction)
    creatureTotal[i].direction = newDirection;
}

function fnCheckPosOtherCreatures (){//pour checker la postion des autres créatures afin de déterminer si une créature peut jouer avec une autre ou non
    for (let i = 0; i < creatureTotal.length; i++)
    {
        let CreatureTemp = [];//tableau pour mettre des autre créatures autour du creatureTotal[i]
        if (creatureTotal[i].near != null){//Checker si le créature a déjà un autre creature pour jouer
            continue;//passe à la boucle suivante
        }
        let creatureX = Math.min(39, Math.round(creatureTotal[i].position.x))
        let creatureZ = Math.min(39, Math.round(creatureTotal[i].position.z))
        for (let x = -1; x < 2; x++)//check les cases autour
        {
            for (let z = -1; z < 2; z++)
            {
                if (creatureX+x>=0 && creatureZ+z>=0 && creatureX+x<40 && creatureZ+z<40)
                {
                    if(PositionCreatures[creatureX+x][creatureZ+z].length != 0)//s'il y a des créatures, alors ajoute à CreatureTemp
                    {
                        PositionCreatures[creatureX+x][creatureZ+z].forEach(element => {
                            if ( element != creatureTotal[i].ID)
                            {
                                CreatureTemp.push(element);
                            }
                        });
                    }
                }
            }
        }
        if (CreatureTemp.length == 0)
        {
            continue;//passe à la boucle suivante
        }
        RandomCreature = Math.floor(Math.random() * CreatureTemp.length);//prend une créature au hasard si plusieurs autour
        if (creatureTotal[CreatureTemp[RandomCreature]].near == null){
            creatureTotal[i].near = CreatureTemp[RandomCreature];//Mettre ID du créature partantaire dans creatureTotal[i].near
            creatureTotal[CreatureTemp[RandomCreature]].near = creatureTotal[i].ID;
            fnDeleteCreatureOfArrayPos(creatureTotal[i].position, i);//efface les 2 créatures du tableau des positions
            fnDeleteCreatureOfArrayPos(creatureTotal[CreatureTemp[RandomCreature]].position, CreatureTemp[RandomCreature]);
        }
    }

}

function fnDeleteCreatureOfArrayPos(position, id){//pour effacer les créatures du tableau des positions afin qu'elles ne soit pas réattribuer à une autre créature
    PositionCreatures[Math.min(39, Math.round(position.x))][Math.min(39, Math.round(position.z))].splice(PositionCreatures[Math.min(39, Math.round(position.x))][Math.min(39, Math.round(position.z))].indexOf(id),1);
}

function fnConsole (text){//pour afficher des textes dans le textbox "textEngine"
    document.getElementById("textEngine").value += "\n" + text;
}


function fnActionProba(){//pour calculer des probabilité des chaques actions
    for (let i = 0; i < creatureTotal.length; i++){
        let tempArr = [];//Tableau qui 
        if (creatureTotal[i].action != null){
            continue;
        }

        tempArr.push({"nom" : "ETU", "prob" : fnAddProba(actions[0].prob, i), "type" : actions[0].type})
        tempArr.push({"nom" : "TRA", "prob" : fnAddProba(actions[1].prob, i), "type" : actions[1].type})
        tempArr.push({"nom" : "JOS", "prob": fnAddProba(actions[2].prob, i), "type" : actions[2].type})
        tempArr.push({"nom" : "SPS", "prob" : fnAddProba(actions[3].prob, i), "type" : actions[3].type})
        tempArr.push({"nom" : "VOS", "prob" : fnAddProba(actions[4].prob, i), "type" : actions[4].type})
        tempArr.push({"nom" : "COS", "prob" : fnAddProba(actions[5].prob, i), "type" : actions[5].type})
        tempArr.push({"nom" : "COB", "prob" : fnAddProba(actions[6].prob, i), "type" : actions[6].type})

        if (creatureTotal[i].near != null){
            tempArr.push({"nom" : "JO2", "prob" : fnAddProba(actions[7].prob, i), "type" : actions[7].type})
            tempArr.push({"nom" : "DI2", "prob" : fnAddProba(actions[8].prob, i), "type" : actions[8].type})
            tempArr.push({"nom" : "SP2", "prob" : fnAddProba(actions[9].prob, i), "type" : actions[9].type})
            tempArr.push({"nom" : "VO2", "prob" : fnAddProba(actions[10].prob, i), "type" : actions[10].type})
        }

        let nbIndex = fnTakeOneIndexAction(tempArr);

        if (nbIndex == 0){
            continue;
        }

        if (tempArr[nbIndex].type == 1){
            creatureTotal[i].action = tempArr[nbIndex].nom;
        }
        else if (tempArr[nbIndex].type == 2){
            creatureTotal[i].action = tempArr[nbIndex].nom;
            creatureTotal[creatureTotal[i].near].action = tempArr[nbIndex].nom;
        }
        else{
            creatureTotal[i].action = tempArr[nbIndex].nom;
            creatureTotal[creatureTotal[i].near].action = tempArr[nbIndex].nom+"b";
        }
    }
}

function fnAddProba(arr, creaID){//pour additioner tous les probabilité
    let totalProba = 0;
    for (let i = 0; i < arr.length; i++) {
        totalProba += arr[i] * creatureTotal[creaID].profile[i]
    }
    return totalProba;
}

function fnTakeOneIndexAction(arr){
    let totalProba = 0;//Calculer la somme, uniquement des >0
    for (i = 0; i < arr.length; i++){
        if (arr[i].prob>0) {
            totalProba += arr[i].prob;
        }
    }
    if (totalProba == 0){
        return 0;
    }
    let nb = Math.random() * totalProba;//Tirer un nombre aléatoire de 0 à somme
    let tempTotalProba = 0
    for (i = 0 ;i < arr.length; i++){
        if (arr[i].prob > 0){
            tempTotalProba += arr[i].prob;
            if (tempTotalProba >= nb){
                return i
            }
        }
    }
}


function fnActionEffect(){
    let currentActionArray;
    let effectArray;
    let steal = 0;
    for (let i = 0; i < creatureTotal.length; i++){
        let currentAction = creatureTotal[i].action

        if (currentAction == "VO2b" || currentAction == null){
            continue;
        }

        for (let j = 0; j < actions.length; j++){
            if (currentAction == actions[j].ID){
                currentActionArray = actions[j]
                break;
            }
        }

        if (currentActionArray.type == 4){
 
            if (creatureTotal[i].status.FC > creatureTotal[creatureTotal[i].near].status.FC){//true si le voleur à plus de force que la victime
                steal = 0; //voleur vole
            }
            else{
                steal = 2;//voleur vole pas
            }

            let probability = Math.floor(Math.random() * 2) //définit si attrapé ou non
            if(probability == 0 ) {
                steal++;// voleur attrapé
            }

            effectArray = actions[11].effect[steal];
            //conséquence pour la victime
            creatureTotal[creatureTotal[i].near].status.FC += effectArray.FC;
            creatureTotal[creatureTotal[i].near].status.CP += effectArray.CP;
            creatureTotal[creatureTotal[i].near].status.RA += effectArray.RA;
            if (creatureTotal[creatureTotal[i].near].status.RA < 0){
                creatureTotal[creatureTotal[i].near].status.RA = 0;
            }
            creatureTotal[creatureTotal[i].near].status.RP += effectArray.RP;
            if (creatureTotal[creatureTotal[i].near].status.RP < 0){
                creatureTotal[creatureTotal[i].near].status.RP = 0;
            }
            creatureTotal[creatureTotal[i].near].status.BE += effectArray.BE;
            if (creatureTotal[creatureTotal[i].near].status.BE > 100){
                creatureTotal[creatureTotal[i].near].status.BE = 100;
            }
            creatureTotal[creatureTotal[i].near].status.RE += effectArray.RE;
            if (creatureTotal[creatureTotal[i].near].status.RE < 0){
                creatureTotal[creatureTotal[i].near].status.RE = 0;
            }

            effectArray = currentActionArray.effect[steal]; //conséquence pour le voleur


        }
        else{
            effectArray = currentActionArray.effect;
        }

        for (const [key, value] of Object.entries(effectArray)) {
            creatureTotal[i].status[key] += value;
            if (creatureTotal[i].status[key] < 0){
                creatureTotal[i].status[key] = 0;
            }
            else if (creatureTotal[i].status[key] > 100){
                creatureTotal[i].status[key] = 100;
            }

        }

        for (let j = 0; j < currentActionArray.effect2.length; j++){
            creatureTotal[i].profile[j] += currentActionArray.effect2[j];
            if (creatureTotal[i].profile[j] < 0){
                creatureTotal[i].profile[j] = 0;
            }
            else if (creatureTotal[i].profile[j] > 1){
                creatureTotal[i].profile[j] = 1;
            }
        }

    }

    //fnLog(creatureTotal);

}


function fnLog(text){
    document.getElementById("textEngine").value += "\n\nstepCount : " + stepCount + "\n\n" + text;
    console.log(text);
}