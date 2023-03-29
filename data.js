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
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus,"RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    : Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 1, "name": "MICHAEL",
        "position" : {"x": 10, "z": 10},
        "profile"  : [0.02,1.00,0.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 2, "name": "LEO",
        "position" : {"x": 20, "z": 20},
        "profile"  : [0.00,0.00,1.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 3, "name": "SIMONNE",
        "position" : {"x": 30, "z": 30},
        "profile"  : [0.00,0.00,0.02,1.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 4, "name": "ROSE",
        "position" : {"x": 30, "z": 29},
        "profile"  : [0.00,0.00,0.00,0.02,1.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 5, "name": "NICOLAS",
        "position" : {"x": 34, "z": 34},
        "profile"  : [1.00,1.00,0.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 6, "name": "ANTOINE",
        "position" : {"x": 35, "z": 35},
        "profile"  : [1.00,0.02,1.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 7, "name": "KAREN",
        "position" : {"x": 25, "z": 25},
        "profile"  : [1.00,0.02,0.02,1.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 8, "name": "PATRICK",
        "position" : {"x": 15, "z": 15},
        "profile"  : [1.00,0.02,0.00,0.02,1.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 9, "name": "MAX",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,1.00,0.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 10, "name": "NICK",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,0.02,1.00,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 11, "name": "PAUL",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,0.02,0.02,0.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 12, "name": "HOPE",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,1.00,1.00,0.02],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus,  "BC": valDefStatus, "BL": valDefStatus, "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 13, "name": "ARTHUR",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,1.00,0.02,1.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus,  "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    },
    {   "ID": 14, "name": "ADAM",
        "position" : {"x": 5, "z": 5},
        "profile"  : [1.00,1.00,1.00,1.00,1.00],
        "status"   : {"FC": valDefStatus, "CP": valDefStatus, "RA": valDefStatus, "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus,  "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
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
            "RP": valDefStatus, "BC": valDefStatus, "BL": valDefStatus,  "RE": valDefStatus},
        "direction": Math.floor(Math.random() * 4),
        "type"     : Math.floor(Math.random() * 4) + 1,
        "color"    :Math.floor(Math.random()*24),
        "near"     : null,
        "action"   : null,
        "actualSpecialChar"  : 0
    })
}
//Fin les creatures---------------------------------------------------------------------------------------------------

//Probabilité action--------------------------------------------------------------------------------------------------

//les actions: type 1= indiv, type 2= à deux, type=4 avec gagnant ou perdant
actions= [
    {"ID":"ETU","type":1,"prob":[0, 2, 0, 0, 1],"effect":{"FC": -1,"CP":3,"RA":-0.2,"RP":-0.5,"BC":0,"BL":1,"RE":1}, "effect2":[0, 0.005,0,0,0.0025]},
    {"ID":"TRA","type":1,"prob":[0, 1, 0, 1, 1],"effect":{"FC": 1,"CP":1,"RA":2,"RP":0.5,"BC":0,"BL":1,"RE":2}, "effect2":[-0.0025, 0.005,0,0.005,0.005]},
    {"ID":"JOS","type":1,"prob":[2, 0, -1, 0, 0],"effect":{"FC": -1,"CP":0.5,"RA":0,"RP":0,"BC":2,"BL":1,"RE":-1}, "effect2":[0.005, -0.0025,0,0,0]},
    {"ID":"SPS","type":1,"prob":[0.5, 1, 0, 0, 0],"effect":{"FC":3,"CP":0,"RA":-0.1,"RP":0,"BC":0.5,"BL":1,"RE":-1}, "effect2":[0.0025, 0.0025,0,0,0]},
    {"ID":"COS","type":1,"prob":[2, -1, 0, 0, -1],"effect":{"FC":-2,"CP":-3,"RA":-0.4,"RP":-1,"BC":1,"BL":-2,"RE":-2}, "effect2":[0.005, -0.005,-0.0025,0,-0.005]},
    {"ID":"COB","type":1,"prob":[2, 0, 0, 2, 0],"effect":{"FC":0,"CP":0,"RA":-0.2,"RP":2,"BC":2,"BL":0.5,"RE":0}, "effect2":[0.005, 0,0,0.005,-0.005]},

    {"ID":"JO2","type":2,"prob":[1, 0, 2, 0, 0],"effect":{"FC":-1,"CP":0.5,"RA":0,"RP":0,"BC":2,"BL":1,"RE":2}, "effect2":[0.005, 0,0.005,0,0.0025]},
    {"ID":"DI2","type":2,"prob":[1, 0, 2, 0, 0],"effect":{"FC":0,"CP":1,"RA":0,"RP":0,"BC":1,"BL":0,"RE":2}, "effect2":[0.0025, 0.0025,0.01,0,0.0025]},
    {"ID":"SP2","type":2,"prob":[1, 1, 1, 0, 0], "effect":{"FC":4,"CP":0,"RA":-0.1,"RP":0,"BC":0.5,"BL":1,"RE":2}, "effect2":[0.01, 0.0025,0.01,0,0]},//ici les deux sont gagnants

    {"ID":"VOS","type":3,"prob":[2, 0, 0, 1, -2],"effect":[{"FC":0,"CP":0,"RA":0.1,"RP":0,"BC":2,"BL":2,"RE":1},{"FC":0,"CP":0,"RA":0,"RP":0,"BC":-2,"BL":-2,"RE":-1},
                                                           {"FC":0,"CP":0,"RA":0,"RP":0,"BC":0.5,"BL":0,"RE":0},{"FC":0,"CP":0,"RA":0,"RP":0,"BC":-3,"BL":-3,"RE":-2}], 
                                                 "effect2":[[0.0025, -0.0025,0,0.0025,-0.005],[-0.01, -0.005,-0.0025,-0.005,0.0025],
                                                            [0.0025, 0,0,0,-0.005],[-0.005, 0.0025,-0.0025,0,-0.0025]]},
    // effect[0] vole et pas attrapé // effect[1] vole et attrapé // effect[2] vole pas et pas attrapé // effect[3] vole pas et attrapé

    {"ID":"VO2","type":4,"prob":[1, -1, 0, 1, -2], "effect":[{"FC":0,"CP":0.5,"RA":0.2,"RP":0.5,"BC":2,"BL":1,"RE":0},{"FC":0,"CP":0,"RA":0,"RP":0,"BC":-2,"BL":-1,"RE":-1},
                                                             {"FC":0,"CP":0,"RA":0,"RP":0,"BC":0.5,"BL":-0.5,"RE":0},{"FC":0,"CP":0,"RA":0,"RP":0,"BC":-3,"BL":-2,"RE":-1}], 
                                                   "effect2":[[0.005, 0,0.001,0.0025,-0.0025],[-0.0025, 0,0,0.001,0],
                                                              [0,0,0,0.0025,-0.001],[-0.005, 0.0025,-0.001,-0.001,0]]},//ici le premier est le gagnant
    // effect[0] vole et pas attrapé // effect[1] vole et attrapé // effect[2] vole pas et pas attrapé // effect[3] vole pas et attrapé
    {"ID":"VO2b","type":5,"effect":[{"FC":0,"CP":0,"RA":-0.1,"RP":-0.5,"BC":-5,"BL":-3,"RE":-2},{"FC":0,"CP":0,"RA":0,"RP":0,"BC":-2,"BL":0,"RE":-1},
                                    {"FC":0,"CP":0,"RA":0,"RP":0,"BC":-1,"BL":0,"RE":-1},{"FC":0,"CP":0,"RA":0,"RP":0,"BC":1,"BL":1,"RE":-1}], 
                          "effect2":[[-0.0025,-0.0025,-0.0025,0.0025,0.01],[0,-0.0025,-0.0025,0,0],
                                     [0,-0.001,-0.001,0,0],[0,0,-0.001,0,0.0025]]}//ici le second le perdant
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
    {"state":"AUT", "penalty":0.2,"conditionHelp":0, "help":0, "conditionTax": 30,"tax": 10, "salary":0.8, "probaArrest": 2},
    {"state":"ANA", "penalty":0, "conditionHelp":0, "help":0, "conditionTax": 100, "tax":0, "salary":0, "probaArrest": 1000},
    {"state":"DEM", "penalty": 0.3, "conditionHelp":20, "help":20, "conditionTax": 70, "tax":15, "salary":2.5, "probaArrest": 3},
    {"state":"LIB", "penalty":0.3, "conditionHelp":20,"help": 15, "conditionTax": 60, "tax":15, "salary":3.5, "probaArrest": 3},
    {"state":"OLI", "penalty":0.1, "conditionHelp":0, "help":0, "conditionTax": 0, "tax": 7, "salary":0.7, "probaArrest": 4},
    {"state":"THE", "penalty":0.45, "conditionHelp":0, "help":0, "conditionTax": 25, "tax":10, "salary":0.6, "probaArrest": 2},
    {"state":"COM", "penalty":0.5, "conditionHelp":30, "help":20, "conditionTax": 50, "tax":10, "salary":0.6, "probaArrest": 2},
    {"state":"MON", "penalty":0.5, "conditionHelp":0, "help":0, "conditionTax": 30, "tax":15, "salary":0.5, "probaArrest": 2}
]
//Fin les systèmes politiques----------------------------------------------------------------------------------------