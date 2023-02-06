// BMWorld, engine.js
// SI-CA1a
// groupe moteur du monde
// début 30.01.2023
// Ce fichier contient tout pour animer les créatures.

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
const creatureDef = [
{"ID": 0, "name": "creature1", 
 "position" : {"x": 0, "z": 0}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 1, "name": "creature2", 
 "position" : {"x": 10, "z": 10}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 2, "name": "creature3", 
 "position" : {"x": 20, "z": 20}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 3, "name": "creature4", 
 "position" : {"x": 30, "z": 30}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 4, "name": "creature5", 
 "position" : {"x": 40, "z": 40}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 5, "name": "creature6", 
 "position" : {"x": 34, "z": 34}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 6, "name": "creatur7", 
 "position" : {"x": 35, "z": 35}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 7, "name": "creature8", 
 "position" : {"x": 25, "z": 25}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 8, "name": "creature9", 
 "position" : {"x": 15, "z": 15}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
},
{"ID": 9, "name": "creature10", 
 "position" : {"x": 5, "z": 5}, 
 "profile"  : {"I": 0.15, "F": 0.15, "R": 0.15, "P": 0.15, "E": 0.15},
 "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
 "direction" :  Math.floor(Math.random() * 4),
 "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
}
]

//JSON pour tous les creatures (100)
let creatureTotal = creatureDef;

//Ajouter le reste de creature
for(let i = (creatureDef.length);i < 100; i++) {
    creatureTotal.push(
    {"ID": i,
    "name": "creature" + (i+1), 
    "position" : {"x": Math.floor(Math.random() * 41), "z": Math.floor(Math.random() * 41)}, 
    "profile"  : {"I": (Math.random() * 1.01).toFixed(2), "F": (Math.random() * 1.01).toFixed(2),
                "R": (Math.random() * 1.01).toFixed(2), "P": (Math.random() * 1.01).toFixed(2), "E": (Math.random() * 1.01).toFixed(2)},
    "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RA": valDefStatus, 
                "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
    "direction" :  Math.floor(Math.random() * 4),
    "color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)
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
    fnMove();
}

let PositionCreatures = [];

// creating two-dimensional array
for (let i = 0; i < 40; i++) {
    PositionCreatures[i] = [];
  for (let j = 0; j < 40; j++) {
    PositionCreatures[i][j] = [];
  }
}

function fnMove() {
    //fait bouger les créatures de 2 max
    for (i=0;i<creatureTotal.length;i++){
        dx=Math.round(Math.random()*2-1);
        dz=Math.round(Math.random()*2-1);
        if (creatureTotal[i].position.x+dx>0 && creatureTotal[i].position.x+dx<nx &&
            creatureTotal[i].position.z+dz>0 && creatureTotal[i].position.z+dz<nz){
            creatureTotal[i].position.x+=dx;
            creatureTotal[i].position.z+=dz;
            PositionCreatures[creatureTotal[i].position.x][creatureTotal[i].position.z].push(creatureTotal[i].name);

        }

    }
}
console.log(PositionCreatures);
