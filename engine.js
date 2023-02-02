// BMWorld, engine.js
// SI-CA1a
// groupe moteur du monde
// début 30.01.2023
// Ce fichier contient tout pour animer les créatures.

//tableau des créatures
let acr=[];

function fnCreatures(n){
    //Crée un certain nb de créatures
    for (c=0;c<n;c++) {
        x=Math.floor(Math.random()*nx)-nx/2;
        z=Math.floor(Math.random()*nz)-nz/2;
        acr.push({"name":c,"type":"box","x":x*size,"y":-size-30,"z":z*size,"rx":0,"ry":0,"rz":0,"r1":size/2,"r2":size,"r3":size/2,"color":'#'+(Math.random()*0xFFFFFF<<0).toString(16)});
    }
}

function fnEngine(){
    //Cette fonction va faire
    fnMove();
}
function fnMove() {
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
