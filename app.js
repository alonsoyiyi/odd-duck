/* eslint-disable indent */
'use strict';
const productsName = ['boots','bathroom','breakfast','bubblegum','chair','dog-duck','tauntaun', 'scissors', 'water-can','wine-glass','bag','banana','cthulhu','dragon','pen','pet-sweep','shark','sweep','unicorn'];
const state = {
    totalProducts: [],
};
function Product(name, path){
    this.name = name;
    this.path = path;
    this.counter=0;
    this.views=0;
}
(function createAlbum(){
    for(let i=0; i<productsName.length; i++){
        let product = new Product(productsName[i],'imgs/'+ productsName[i]+ '.jpg');
        state.totalProducts.push(product);
    }
})();
const chosenProducts = {
    totalClick:0,
    rounds:25,
    leftObj: null,
    centerObj: null,
    rightObj: null,
    leftElem: document.getElementById('img1'),
    centerElem: document.getElementById('img2'),
    rightElem: document.getElementById('img3'),
    imgElem: document.getElementById('images'),
    resultElem: document.getElementById('resultados'),
    resultButton: document.getElementById('mostrarResultados'),
    resetButton: document.getElementById('reset'),
    getRandomIndex: function() {
        return Math.floor(Math.random() * productsName.length);
    },
};