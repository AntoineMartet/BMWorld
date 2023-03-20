//Fichier uniquement pour le data Json

//Les creatures-------------------------------------------------------------------------------------------------------
//fix les valeurs pour tous les satatus à 50
const valDefStatus = 50;

//profil
//	I[0] = immédiat, envie de plaisir immédiat (par. Ex jouer)
//	F[1]= future, envie d'investir pour le futur (p. exemple travailler, étudier)
//	R[2] = relation, envie d'investir dans des relations
//	P[3] = possession, envie de posséder un max d'argent (AG) et d'objets (OB)
//	E[4] = Ethique, plus le niveau est haut, moins la créature se permet des actions douteuses

//état
//	FC = Force, quel état de force (dépend du sport)
//	CP = Compétences, dépend des études
//	RA = Richesse sous forme argent
//	RP = Richesse sous forme possession
//	BC = bien-être court terme
//  BL = bien-être long terme
//	RE = qualité/quantité de relations

//15 creatures defaults
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
        "profile"  : [Math.random(), Math.random(),
            Math.random(),  Math.random(),   Math.random()],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus,
            "RP": valDefStatus, "BE": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :'#'+(Math.random()*0xFFFFFF<<0).toString(16),
        "near"     : null,
        "action"   : null
    })
}
//Fin les creatures---------------------------------------------------------------------------------------------------

//Probabilité action--------------------------------------------------------------------------------------------------

//les actions: type 1= indiv, type 2= à deux, type=4 avec gagnant ou perdant
actions= [
    {"ID":"ETU","type":1,"prob":[0, 2, 0, 0, 1],"effect":{"FC": -2,"CP":3,"RA":-0.1,"RP":-2,"BE":-3,"RE":1}, "effect2":[0, 0.005,-0.0025,0,0.0025]},
    {"ID":"TRA","type":1,"prob":[0, 1, 0, 0, 1],"effect":{"FC": 1,"CP":1,"RA":0.9,"RP":2,"BE":-2,"RE":2}, "effect2":[-0.0025, 0.005,0.0025,0.005,0.005]},
    {"ID":"JOS","type":1,"prob":[2, 0, -1, 0, 0],"effect":{"FC": -1,"CP":0,"RA":-0.1,"RP":0,"BE":2,"RE":-1}, "effect2":[0.005, -0.0025,-0.005,0,0]},
    {"ID":"SPS","type":1,"prob":[0, 1, 0, 0, 0],"effect":{"FC": 3,"CP":0,"RA":-0.1,"RP":0,"BE":1,"RE":-1}, "effect2":[0.0025, 0.0025,-0.0025,0,0.0025]},
    {"ID":"VOS","type":1,"prob":[2, 0, 0, 0, -2],"effect":{"FC": 0,"CP":0,"RA":0.1,"RP":-2,"BE":-5,"RE":-1}, "effect2":[0.0025, -0.0025,-0.005,0.0025,-0.005]},
    {"ID":"COS","type":1,"prob":[2, 0, 0, 0, 0],"effect":{"FC": -2,"CP":-4,"RA":-0.4,"RP":-2,"BE":1,"RE":-2}, "effect2":[0.01, 0,0,0,-0.005]},
    {"ID":"COB","type":1,"prob":[2, 0, 0, 1, 0],"effect":{"FC": -1,"CP": 0,"RA":-0.2,"RP":2,"BE":2,"RE":0}, "effect2":[0.01, 0,0,0.005,-0.005]},

    {"ID":"JO2","type":2,"prob":[1, 0, 2, 0, 0],"effect":{"FC": -1,"CP":0,"RA":-0.1,"RP":0,"BE":2,"RE":2}, "effect2":[0.01, -0.0025,0.01,0,0.005]},
    {"ID":"DI2","type":2,"prob":[1, 0, 2, 0, 0],"effect":{"FC": -1,"CP":1,"RA":-0.1,"RP":0,"BE":1,"RE":2}, "effect2":[0.01, 0,0.01,0,0.0025]},
    {"ID":"SP2","type":2,"prob":[1, 1, 1, 0, 0], "effect":{"FC": 4,"CP":0,"RA":-0.1,"RP":0,"BE":1,"RE":2}, "effect2":[0.01, 0.005,0.01,0,0.0025]},//ici les deux sont gagnants
    {"ID":"VO2","type":4,"prob":[1, -1, 0, 2, -2], "effect":[{"FC": 0,"CP":0,"RA":0.2,"RP":2,"BE":2,"RE":0},{"FC": 0,"CP":0,"RA":0.2,"RP":0,"BE":-2,"RE":-1},{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":2,"RE":0},{"FC": 0,"CP":0,"RA":0,"RP":-1,"BE":-2,"RE":-1}], "effect2":[-0.01, -0.005,-0.0025,-0.005,-0.005]},//ici le premier est le gagnant
    // effect[0] vole et pas attrapé // effect[1] vole et attrapé // effect[2] vole pas et pas attrapé // effect[3] vole pas et attrapé

    {"ID":"VO2b","type":4,"effect":[{"FC": 0,"CP":0,"RA":-0.2,"RP":-2,"BE":-4,"RE":-2},{"FC": 0,"CP":0,"RA":-0.2,"RP":-2,"BE":-2,"RE":-2},{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":0,"RE":0},{"FC": 0,"CP":0,"RA":0,"RP":0,"BE":0,"RE":0}], "effect2":[-0.0025, -0.0025,-0.0025,0.0025,0.01]}//ici le second le perdant
    // effect[0] se fait voler et voleur pas attrapé // effect[1] se fait voler et voleur attrapé // effect[2] se fait pas voler et voleur pas attrapé // effect[3] se fait pas voler et voleur attrapé
]

//Fin les probabilité action------------------------------------------------------------------------------------------

//Systèmes politiques------------------------------------------------------------------------------------------------
// AUT = AUTOCRACY
// ANA = ANARCHY
// DEM = DEMOCRACY
// LIB = LIBERAL DEMOCRACY
// OLI = OLIGARCHY
// THE = THEOCRACY
// COM = COMMUNISM
// MON = MONARCHY
let societyModels=[
    {"state":"AUT", "penalty":0.2,"conditionHelp":0.5, "help":20, "conditionTax": 0.8,"tax": 20, "salary":0.8},
    {"state":"ANA", "penalty":0, "conditionHelp":0, "help":0, "conditionTax": 0, "tax":0, "salary":0},
    {"state":"DEM", "penalty": 0.3, "conditionHelp":1.5, "help":15, "conditionTax": 2.5, "tax":15, "salary":2.5},
    {"state":"LIB", "penalty":0.3, "conditionHelp":2.0,"help": 15, "conditionTax": 3.5, "tax":15, "salary":3.5},
    {"state":"OLI", "penalty":0.1, "conditionHelp":0, "help":0, "conditionTax": 0, "tax":15, "salary":0.7},
    {"state":"THE", "penalty":0.45, "conditionHelp":0.5, "help":10, "conditionTax": 0.7, "tax":20, "salary":0.6},
    {"state":"COM", "penalty":0.5, "conditionHelp":0.5, "help":10, "conditionTax": 0.8, "tax":10, "salary":0.6},
    {"state":"MON", "penalty":0.5, "conditionHelp":0, "help":0, "conditionTax": 0.8, "tax":30, "salary":0.5}
]
//Fin les systèmes politiques----------------------------------------------------------------------------------------