//Global variables-------------------------------------------------------------------------------
//pour compter le nombre de tuile
let stepCount = 0;
//Affectation du société par defaut (societyModels[0] = AUT:AUTOCRACY)
let actualSociety = societyModels[0];
//tableau 2D pour le log des creatures (Nb du cycle, Type du société, nom, action, status, profile)
let creatureTotalLog = []; //2D array to put an array with action, status and profile of all creature
//tableau pour positions des creatures
let PositionCreatures = [];
//-------------------------------------------------------------------------------------------------

function fnEngine(){
    //Cette fonction va faire
    fnMove();
    stepCount++;

    if(stepCount % 50 == 0){
        cycles += 1; //cycles est declaré dans display.js
        let tempCreatureTotalLog = []; //tableau pour tous les créature pour chaque movement (Commence par l'état initial)
        for (i = 0;i < creatureTotal.length;i++) {
            //Mettre état de chaque créature qui est avant action dans le tableau tempCreatureTotalLog
            tempCreatureTotalLog.push([cycles,actualSociety.state,creatureTotal[i].name,creatureTotal[i].action,
                JSON.parse(JSON.stringify(creatureTotal[i].status)), JSON.parse(JSON.stringify(creatureTotal[i].profile))]);
        }
        creatureTotalLog.push(tempCreatureTotalLog); //Mettre le tabeau log de cette movement
        fnResetActionCreature();
        fnCheckPosOtherCreatures();//maikol
        fnActionProba();//maikol
        fnActionEffect();//maikol

        if(cycles % 30 == 0){
            fnSalary();
            fnHelp();
            fnTax();
        }

    }


}



function fnMove() {//fonction qui gère le mouvement des créature

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
            randomProbability = 15;
        }
        else{
            randomProbability = 20;
        }
        let probability = Math.floor(Math.random() *randomProbability)
        if(probability == 0 ) {
            fnChangeDirection();
        }

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

function fnResetActionCreature(){ // fonction qui reset la position des créatures dans le tableau temporaire et reset les actions
    for (let i = 0; i < 40; i++) {
        PositionCreatures[i] = [];
        for(let j = 0; j < 40; j++) {
            PositionCreatures[i][j] = [];
        }
    }
    for (i = 0;i < creatureTotal.length;i++) {
        let x = Math.min(39, Math.round(creatureTotal[i].position.x))
        let z = Math.min(39, Math.round(creatureTotal[i].position.z))
        PositionCreatures[x][z].push(creatureTotal[i].ID);
        creatureTotal[i].near = null;//maikol
        creatureTotal[i].action = null;//maikol
    }


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

        if (creatureTotal[i].status.FC < 15){

            creatureTotal[i].action = "TRA";
            continue;

        }


        for (let j = 0; j < actions.length; j++){
            if (actions[j].type == 1 || actions[j].type == 3){//si action seul
                tempArr.push({"nom" : actions[j].ID, "prob" : fnAddProba(actions[j].prob, i), "type" : actions[j].type})
            }
            else if((actions[j].type == 2 || actions[j].type == 4) && creatureTotal[i].near != null){//si action à plusieurs, check si quelqu'un est à coté
                tempArr.push({"nom" : actions[j].ID, "prob" : fnAddProba(actions[j].prob, i), "type" : actions[j].type})
            }
        }

        let nbIndex = fnTakeOneIndexAction(tempArr);

        if (nbIndex == null){
            continue;
        }

        if (tempArr[nbIndex].type == 1 || tempArr[nbIndex].type == 3){
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
        return null;
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


function fnActionEffect(){//fonction qui fait les conséquences des actions sur le status et sur le profil
    let currentActionArray;
    let effectArray;
    let effect2Array;
    let steal = 0;
    let stealsolo = 0;
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

            let probability = Math.floor(Math.random() * actualSociety.probaArrest) //définit si attrapé ou non
            if(probability == 0 ) {
                steal++;// voleur attrapé
                fnPenalty(i);
            }

            effectArray = actions[11].effect[steal];
            effect2Array = actions[11].effect2[steal];
            //conséquence pour la victime
            for (const [key, value] of Object.entries(effectArray)) {//parcours la table des actions pour changer le status
                creatureTotal[creatureTotal[i].near].status[key] += value;
                if (creatureTotal[creatureTotal[i].near].status[key] < 0){
                    creatureTotal[creatureTotal[i].near].status[key] = 0;
                }
                else if (creatureTotal[creatureTotal[i].near].status[key] > 100){
                    creatureTotal[creatureTotal[i].near].status[key] = 100;
                }
    
            }

            for (let j = 0; j < effect2Array.length; j++){//parcours la table des actions pour changer le profil
                creatureTotal[creatureTotal[i].near].profile[j] += effect2Array[j];
                if (creatureTotal[creatureTotal[i].near].profile[j] < 0){
                    creatureTotal[creatureTotal[i].near].profile[j] = 0;
                }
                else if (creatureTotal[creatureTotal[i].near].profile[j] > 1){
                    creatureTotal[creatureTotal[i].near].profile[j] = 1;
                }
            }
            

            effectArray = currentActionArray.effect[steal]; //conséquence pour le voleur sur le status
            effect2Array = currentActionArray.effect2[steal]; //conséquence pour le voleur sur le profil


        }
        else if(currentActionArray.type == 3){
            let probability1 = Math.floor(Math.random() * 2) //définit si vole ou non
            if(probability1 == 0 ) {
                stealsolo = 0; //voleur vole
            }
            else{
                stealsolo = 2;//voleur vole pas
            }

            let probability2 = Math.floor(Math.random() * actualSociety.probaArrest) //définit si attrapé ou non
            if(probability2 == 0 ) {
                stealsolo++;// voleur attrapé
                fnPenalty(i);
            }

            effectArray = currentActionArray.effect[stealsolo];
            effect2Array = currentActionArray.effect2[stealsolo];
        }
        else{
            effectArray = currentActionArray.effect;
            effect2Array = currentActionArray.effect2;
        }

        for (const [key, value] of Object.entries(effectArray)) {//parcours la table des actions pour changer le status
            creatureTotal[i].status[key] += value;
            if (creatureTotal[i].status[key] < 0){
                creatureTotal[i].status[key] = 0;
            }
            else if (creatureTotal[i].status[key] > 100){
                creatureTotal[i].status[key] = 100;
            }

        }

        for (let j = 0; j < effect2Array.length; j++){//parcours la table des actions pour changer le profil
            creatureTotal[i].profile[j] += effect2Array[j];
            if (creatureTotal[i].profile[j] < 0){
                creatureTotal[i].profile[j] = 0;
            }
            else if (creatureTotal[i].profile[j] > 1){
                creatureTotal[i].profile[j] = 1;
            }
        }

    }

}

function fnPenalty(voleuse){ // fonction qui inflige une pénalité lorsque les voleurs se font attrapé
    creatureTotal[voleuse].status.RA -= actualSociety.penalty; //execution de peine
    if(creatureTotal[voleuse].status.RA < 0){ // si c'est en dessous de 0, remise à zero
        creatureTotal[voleuse].status.RA = 0;
    }
}

function fnHelp(){ // fonction qui donne une aide aux créatures selon condition de la société
    for(let i = 0; i < creatureTotal[i].length; i++){
        if(creatureTotal[i].status.RA < actualSociety.conditionHelp){ // si la créature rempli la condition pour toucher des aides

            creatureTotal[i].status.RA += (actualSociety.help*actualSociety.conditionHelp)/100; // execution de l'aide 
            if(creatureTotal[i].status.RA > 100){ // si la créature a plus de 100, remise a 100
                creatureTotal[i].status.RA = 100;
            }
        }
    }
}
function fnTax(){ // fonction qui inflige une taxe aux créatures selon condition de la société
    for(let i = 0; i < creatureTotal.length; i++){
        if(creatureTotal[i].status.RA >= actualSociety.conditionTax){ // si creature rempli condition pour etre taxé
            creatureTotal[i].status.RA -= (actualSociety.tax*creatureTotal[i].status.RA)/100 ; // execution tax
            if (creatureTotal[i].status.RA < 0) { // si en dessous de 0, remise a 0
                creatureTotal[i].status.RA = 0;
            }
        }
    }
}

function fnSalary(){// fonction qui donne un salaire aux créatures selon condition de la société
    for(let i = 0; i < creatureTotal.length; i++){ 
            creatureTotal[i].status.RA += actualSociety.salary; // execution salaire
            if(creatureTotal[i].status.RA > 100){ // si la créature a plus de 100, remise a 100
                creatureTotal[i].status.RA = 100;
            }
    }
}

function fnLog(text){//fonction qui permet d'écrire des logs
    document.getElementById("textEngine").value += "\n\n" + text;
    console.log(text);
}








