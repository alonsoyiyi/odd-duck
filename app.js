/* eslint-disable indent */
'use strict';
const productsName = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];
const state = {
    totalProducts: [],
    rounds: 0,
    totalClicks: 0,
};
function Product(name, path, views = 0, clicks = 0) {
    this.name = name;
    this.path = path;
    this.clicks = clicks;
    this.views = views;
}
(function createAlbum() {
    let lsState = localStorage.getItem('state');
    if (lsState) {
        const lsProductsObjects = JSON.parse(lsState).totalProducts;
        state.rounds = JSON.parse(lsState).rounds;
        state.totalClicks = JSON.parse(lsState).totalClicks;
        for (let i = 0; i < lsProductsObjects.length; i++) {
            let product = new Product(lsProductsObjects[i].name, lsProductsObjects[i].path, lsProductsObjects[i].views, lsProductsObjects[i].clicks);
            state.totalProducts.push(product);
        }
    } else {
        for (let i = 0; i < productsName.length; i++) {
            let product = new Product(productsName[i], 'img/' + productsName[i] + '.jpg');
            state.totalProducts.push(product);
        }
    }
})();
const chosenProducts = {
    chart: null,
    leftObj: null,
    centerObj: null,
    rightObj: null,
    leftElem: document.getElementById('img1'),
    centerElem: document.getElementById('img2'),
    rightElem: document.getElementById('img3'),
    imgElem: document.getElementById('images'),
    resultElem: document.getElementById('results'),
    resultButton: document.getElementById('showResults'),
    resetButton: document.getElementById('reset'),
    getRandomIndex: function () {
        return Math.floor(Math.random() * productsName.length);
    },
    showImages: function () {
        chosenProducts.leftObj = state.totalProducts[chosenProducts.getRandomIndex()];
        chosenProducts.centerObj = state.totalProducts[chosenProducts.getRandomIndex()];
        chosenProducts.rightObj = state.totalProducts[chosenProducts.getRandomIndex()];
        if (chosenProducts.leftObj === chosenProducts.centerObj || chosenProducts.leftObj === chosenProducts.rightObj || chosenProducts.centerObj === chosenProducts.rightObj) {
            chosenProducts.showImages();
        }
        chosenProducts.leftObj.views += 1;
        chosenProducts.centerObj.views += 1;
        chosenProducts.rightObj.views += 1;
        localStorage.setItem('state', JSON.stringify(state));
        chosenProducts.leftElem.src = chosenProducts.leftObj.path;
        chosenProducts.leftElem.id = chosenProducts.leftObj.name;
        chosenProducts.centerElem.src = chosenProducts.centerObj.path;
        chosenProducts.centerElem.id = chosenProducts.centerObj.name;
        chosenProducts.rightElem.src = chosenProducts.rightObj.path;
        chosenProducts.rightElem.id = chosenProducts.rightObj.name;
    },
    clickCount: function (idProducts) {
        for (let i = 0; i < state.totalProducts.length; i++) {
            if (state.totalProducts[i].name === idProducts) {
                state.totalProducts[i].clicks += 1;
                state.totalClicks += 1;
                localStorage.setItem('state', JSON.stringify(state));
                console.log(state.totalProducts[i].name + ' tiene ' + state.totalProducts[i].clicks + ' voto');
            }
        }
        chosenProducts.showResults();
        chosenProducts.showList();
    },
    showResults: function () {
        this.resultElem.innerHTML = '';
        this.showChart();
    },

    showList: function () {
        const list = document.createElement('ul');
        for (let i = 0; i < state.totalProducts.length; i++) {
            const firstLi = document.createElement('li');
            const info = state.totalProducts[i].name + ' tiene ' + state.totalProducts[i].clicks + ' votos y ' + state.totalProducts[i].views + ' vistas.';
            firstLi.textContent = info;
            list.appendChild(firstLi);
        }
        const secondLi = document.createElement('li');
        secondLi.textContent = 'Total de clicks: ' + state.totalClicks;
        const lineBreak = document.createElement('br');
        list.appendChild(lineBreak);
        list.appendChild(secondLi);
        this.resultElem.appendChild(list);
    },

    showChart: function () {
        const ctx = document.getElementById('myChart');

        const productsViews = [];
        const productsClicks = [];

        for (let i = 0; i < state.totalProducts.length; i++) {
            productsViews.push(state.totalProducts[i].views);
            productsClicks.push(state.totalProducts[i].clicks);
        }

        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: productsName,
                datasets: [{
                    label: 'views',
                    data: productsViews,
                    borderWidth: 1,
                    backgroundColor: "#CB00EB",
                },
                {
                    label: 'clicks',
                    data: productsClicks,
                    borderWidth: 1,
                    backgroundColor: "#EFE415",
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
        );
    },


    onClick: function (event) {
        if (event.target.id === chosenProducts.leftObj.name || event.target.id === chosenProducts.centerObj.name || event.target.id === chosenProducts.rightObj.name) {
            chosenProducts.clickCount(event.target.id);
            if (state.totalClicks > 0) {
                chosenProducts.resetButton.hidden = false;
            }
            chosenProducts.showImages();
            console.log(event);
        } else {
            alert('Haz click dentro de la imagen que desees');
        }
    }
};

chosenProducts.imgElem.addEventListener('click', chosenProducts.onClick);
chosenProducts.resetButton.addEventListener('click', function () {
    chosenProducts.resetButton.hidden = true;
    localStorage.removeItem('state');
    location.reload();
});
chosenProducts.showImages();
