// BMWorld, engine.js
// SI-CA1a
// groupe moteur du monde
// début 30.01.2023
// Ce fichier contient tout pour animer les créatures.



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
    {"ID":"ETU","type":1,"prob":[0, 2, 0, 0, 1],"effect":{"FC": 0,"CP":2,"RA":0,"RP":0,"BE":0,"RE":0}},
    {"ID":"TRA","type":1,"prob":[0, 2, 0, 1, 0],"effect":{"FC": 0,"CP":1,"RA":100,"RP":0,"BE":0,"RE":1}},
    {"ID":"JOS","type":1,"prob":[2, 0, -1, 0, 0],"effect":{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":2,"RE":0}},
    {"ID":"SPS","type":1,"prob":[1, 2, 0, 0, 0],"effect":{"FC": 2,"CP":0,"RA":0,"RP":0,"BE":1,"RE":0}},
    {"ID":"VOS","type":1,"prob":[2, 0, 0, 0, -2],"effect":{"FC": 0,"CP":0,"RA":1,"RP":2,"BE":0,"RE":-1}},
    {"ID":"COS","type":1,"prob":[2, 0, 0, 0, -2],"effect":{"FC": -1,"CP":-1,"RA":-2,"RP":0,"BE":1,"RE":0}},      
    
    {"ID":"JO2","type":2,"prob":[1, 0, 1, 0, 0],"effect":{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":2,"RE":2}},
    {"ID":"DI2","type":2,"prob":[1, 0, 1, 0, 0],"effect":{"FC": 0,"CP":1,"RA":0,"RP":0,"BE":1,"RE":2}},
    {"ID":"SP2","type":2,"prob":[1, 1, 1, 0, 0], "effect":{"FC": 2,"CP":0,"RA":0,"RP":0,"BE":1,"RE":1}},//ici les deux sont gagnants
    {"ID":"VO2","type":4,"prob":[2, 0, -1, 0, -1], "effect":{"FC": 0,"CP":0,"RA":0,"RP":1,"BE":0,"RE":-1}}//ici le premier est le gagnant, le second le perdant
]
 



//Creature-----------------------------------------------------------------------
//fix les valeurs pour tous les satatus à 50
const valDefStatus = 50;

//JSON des creatures defaults
//10 creatures defaults
 /*
   I = immédiat, F = future, R = relation, P = possession, E = Ethique
   FC = Force, CP = Compétences, RA = Richesse sous forme argent, RP = Richesse sous forme possession, BE = bien-être, o	RE = qualité/quantité de relations
 */
//Maybe no need ID ???
let creatureDef = [
{"ID": 0, "name": "creature1", 
 "position" : {"x": 0, "z": 0}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 1, "name": "creature2", 
 "position" : {"x": 10, "z": 10}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 2, "name": "creature3", 
 "position" : {"x": 20, "z": 20}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 3, "name": "creature4", 
 "position" : {"x": 30, "z": 30}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 4, "name": "creature5", 
 "position" : {"x": 30, "z": 29}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 5, "name": "creature6", 
 "position" : {"x": 34, "z": 34}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 6, "name": "creatur7", 
 "position" : {"x": 35, "z": 35}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 7, "name": "creature8", 
 "position" : {"x": 25, "z": 25}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 8, "name": "creature9", 
 "position" : {"x": 15, "z": 15}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
},
{"ID": 9, "name": "creature10", 
 "position" : {"x": 5, "z": 5}, 
 "profile"  : [0.15,   0.15,   0.15,   0.15,   0.15],
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
 "near": null,
 "action" : null
}
]

//JSON pour tous les creatures (100)
let creatureTotal = creatureDef;

//Ajouter le reste de creature
for(let i = (creatureDef.length);i < 100; i++) {
    creatureTotal.push(
    {"ID": i,
    "name": "creature" + (i+1), 
    "position" : {"x": Math.floor(Math.random() * 40), "z": Math.floor(Math.random() * 40)}, 
    "profile"  : [(Math.random() * 1.01).toFixed(2),   (Math.random() * 1.01).toFixed(2),
                  (Math.random() * 1.01).toFixed(2),   (Math.random() * 1.01).toFixed(2),   (Math.random() * 1.01).toFixed(2)],
    "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, 
                "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
    "direction" :  Math.floor(Math.random() * 4),
    "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16),
    "near": null,
    "action" : null
    })
};

//POUR TEST
console.log(creatureTotal);

//-----------------------------------------------------------------------fin 



//tableau des créatures
//let arc=[];

/*
function creatureTotal(n){
    //Crée un certain nb de créatures
    for (c=0;c<n;c++) {
        x=Math.floor(Math.random()*nx)-nx/2;
        z=Math.floor(Math.random()*nz)-nz/2;
        arc.push({"name":c,"type":"box","x":x*size,"y":-size-30,"z":z*size,"rx":0,"ry":0,"rz":0,"r1":size/2,"r2":size,"r3":size/2,"color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)});
    }
}*/

function fnEngine(){
    //Cette fonction va faire
    frameRate(0.000001); //permet de mettre le monde en "pause afin de checker l'avancement pas à pas"
    fnMove();
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
fnResetPositionCreatures();

function fnMove() {
    //fait bouger les créatures de 2 max
    fnResetPositionCreatures();//maikol//reset le tableau qui stock la position des créatures afin de savoir s'il y a des créatures proche les unes des autres

    for (i=0;i<creatureTotal.length;i++){
        switch(creatureTotal[i].direction) { //AYAMI
            case 0: //up
            if(creatureTotal[i].position.z + 1 < 40) {
                creatureTotal[i].position.z += 1;
            } else {
                fnChangeDirection();
            }
            break;
            case 1: //right
            if(creatureTotal[i].position.x + 1 < 40) {
                creatureTotal[i].position.x += 1;
            } else {
                fnChangeDirection();
            }
            break;
            case 2: //down
            if(creatureTotal[i].position.z - 1 >= 0) {
                creatureTotal[i].position.z -= 1;
            } else {
                fnChangeDirection();
            }
            break;
            case 3: // left
            if(creatureTotal[i].position.x - 1 >= 0) {
                creatureTotal[i].position.x -= 1;
            } else {
                fnChangeDirection();
            } 

        }

        //Random pour le possibilité à changer le direction
        let probability = Math.floor(Math.random() *6) 
        if(probability == 0 ) {
            fnChangeDirection();
        }

        PositionCreatures[creatureTotal[i].position.x][creatureTotal[i].position.z].push(creatureTotal[i].ID);
        creatureTotal[i].near = null;//maikol
        creatureTotal[i].action = null;//maikol


        /*for (i=0;i<creatureTotal.length;i++){
            dx=Math.round(Math.random()*2-1);
            dz=Math.round(Math.random()*2-1);
            if (creatureTotal[i].position.x+dx>0 && creatureTotal[i].position.x+dx<nx &&
                creatureTotal[i].position.z+dz>0 && creatureTotal[i].position.z+dz<nz){
                creatureTotal[i].position.x+=dx;
                creatureTotal[i].position.z+=dz;
            }
        }*/
    
    
    }     
    fnCheckPosOtherCreatures();//maikol 
    fnActionProba();//maikol 
}

function fnChangeDirection (){ //pour changer le direction
    let newDirection;
    do {
        newDirection = Math.floor(Math.random() * 4);
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
        for (let x = -1; x < 2; x++)//check les cases autour
        {
            for (let z = -1; z < 2; z++)
            {
                if (creatureTotal[i].position.x+x>=0 && creatureTotal[i].position.z+z>=0 && creatureTotal[i].position.x+x<40 && creatureTotal[i].position.z+z<40)
                {
                    if(PositionCreatures[creatureTotal[i].position.x+x][creatureTotal[i].position.z+z].length != 0)//s'il y a des créatures, alors ajoute à CreatureTemp
                    {
                        PositionCreatures[creatureTotal[i].position.x+x][creatureTotal[i].position.z+z].forEach(element => {
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
            //console.log(i);//pour tester à supprimer!!!!!!!!!!!!!!!!!!!
            fnDeleteCreatureOfArrayPos(creatureTotal[i].position, i);//efface les 2 créatures du tableau des positions
            fnDeleteCreatureOfArrayPos(creatureTotal[CreatureTemp[RandomCreature]].position, CreatureTemp[RandomCreature]);
            //console.log("-----------------");//pour tester à supprimer!!!!!!!!!!!!!!!!!!!
        }
    }

    //console.log(creatureTotal);//pour tester à supprimer!!!!!!!!!!!!!!!!!!!

}

function fnDeleteCreatureOfArrayPos(position, id){//pour effacer les créatures du tableau des positions afin qu'elles ne soit pas réattribuer à une autre créature
    //console.log(PositionCreatures[position.x][position.z]);//pour tester à supprimer!!!!!!!!!!!!!!!!!!!
    PositionCreatures[position.x][position.z].splice(PositionCreatures[position.x][position.z].indexOf(id),1);
    //console.log(PositionCreatures[position.x][position.z]);//pour tester à supprimer!!!!!!!!!!!!!!!!!!!
}


//fnConsole(JSON.stringify(creatureTotal));//pour tester à supprimer!!!!!!!!!!!!!!!!!!!

function fnConsole (text){//pour afficher des textes dans le textbox "textEngine"
    document.getElementById("textEngine").value += "\n" + text;
}


function fnActionProba(){//pour calculer des probabilité des chaques actions
    for (let i = 0; i < creatureTotal.length; i++){
        let tab = [];
        if (creatureTotal[i].action != null){
            continue;
        }
        
        tab.push({"nom" : "ETU", "prob" : fnAddProba(actions[0].prob, i), "type" : actions[0].type})
        tab.push({"nom" : "TRA", "prob" : fnAddProba(actions[1].prob, i), "type" : actions[1].type})
        tab.push({"nom" : "JOS", "prob": fnAddProba(actions[2].prob, i), "type" : actions[2].type})
        tab.push({"nom" : "SPS", "prob" : fnAddProba(actions[3].prob, i), "type" : actions[3].type})
        tab.push({"nom" : "VOS", "prob" : fnAddProba(actions[4].prob, i), "type" : actions[4].type})
        tab.push({"nom" : "COS", "prob" : fnAddProba(actions[5].prob, i), "type" : actions[5].type})

        if (creatureTotal[i].near != null){
            tab.push({"nom" : "JO2", "prob" : fnAddProba(actions[6].prob, i), "type" : actions[6].type})
            tab.push({"nom" : "DI2", "prob" : fnAddProba(actions[7].prob, i), "type" : actions[7].type})
            tab.push({"nom" : "SP2", "prob" : fnAddProba(actions[8].prob, i), "type" : actions[8].type})
            tab.push({"nom" : "VO2", "prob" : fnAddProba(actions[9].prob, i), "type" : actions[9].type})
        }

        let ii = fnTire(tab);

        if (tab[ii].type == 1){
            creatureTotal[i].action = tab[ii].nom;
        }
        else{
            creatureTotal[i].action = tab[ii].nom;
            creatureTotal[creatureTotal[i].near].action = tab[ii].nom;
        }
    }    
}

function fnAddProba(arr, creaID){//pour additioner tous les probabilité
    let sommeTemp = 0;
    for (let i = 0; i < arr.length; i++) {   
        sommeTemp += arr[i] * creatureTotal[creaID].profile[i]
    }
    return sommeTemp;
}

function fnTire(t){
    somme = 0;//Calculer la somme, uniquement des >0
    for (i = 0; i < t.length; i++){
       if (t[i].prob>0) somme += t[i].prob;
    }
    n = Math.random() * somme;//Tirer un nombre aléatoire de 0 à somme
    total = 0
    for (i = 0 ;i < t.length; i++){
        if (t[i].prob > 0){
            total += t[i].prob;
            if (total >= n) return i
        }
    }
}


