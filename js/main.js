import {data} from '../data.js'

document.addEventListener("DOMContentLoaded", function () {

    const displayChartButton = document.getElementById('displayChart');
    let displayChart = true;
    displayChartButton.addEventListener('click', () => {
        let chart = document.getElementById('myChart');
        if(displayChart) {
            displayChartButton.innerHTML = 'Show Chart';
            chart.style.display = 'none';
            displayChart = false;
        } else {
            displayChartButton.innerHTML = 'Hide Chart';
            chart.style.display = 'block';
            displayChart = true;
        }
    });

    const labels = data.map(function (element) {
        let listCountry = document.getElementById('listCountry');
        let listCountryOptions =  e("option", element.country, listCountry);
        let listYear = document.getElementById('listYear');
        let listYearOptions =  e("option", element.year, listYear);
        return element.country;
    });
    const datas = data.map(function(element) {
        return element.percent;
    });


    function displayNewData(country, code, year, percent) {
        addedDatas.push({country: country, code: code, year: year, percent: percent});
        labels.push({country: country});
        datas.push({percent: percent});


        let percentBar =  e("div", null, document.body, 'percentBar');
        let percentBarTitle =  e("div", null, percentBar, 'percentBarTitle');
        let percentBarTitleSpan = e("span", country, percentBarTitle);
        let percentBarBar=  e("div", percent, percentBar, 'percentBarBar');
        let percentBarPercent=  e("div", `${percent}% - ${year}`, percentBar, 'percentBarPercent');

        percentBarBar.style.width = percent+"%";
    }

    const addedDatas = [];

    document.querySelector("#tools button")
        .addEventListener("click", function() {
            let country = document.querySelector("#country").value;
            let code = document.querySelector("#code").value;
            let year = document.querySelector("#year").value;
            let percent = document.querySelector("#percent").value;

            displayNewData(country, code, year, percent);
        });

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: '% of internet user by year',
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                data: datas
            }],
        },

        // Configuration options go here
        options: {
            onClick: graphClickEvent
        }
    });

    function graphClickEvent() {
        const randomColorR = Math.floor(Math.random() * Math.floor(255));
        const randomColorG = Math.floor(Math.random() * Math.floor(255));
        const randomColorB = Math.floor(Math.random() * Math.floor(255));

        const buttonStyles = document.querySelectorAll(".buttonStyle");
        for(let buttonStyle of buttonStyles) {
            buttonStyle.style.backgroundColor =  `rgb(${randomColorR}, ${randomColorG}, ${randomColorB}`;
        }

        const percentBarTitles = document.querySelectorAll(".percentBarTitle");
        for(let percentBarTitle of percentBarTitles) {
            percentBarTitle.style.backgroundColor =  `rgb(${randomColorR}, ${randomColorG}, ${randomColorB}`;
        }

        const percentBarBars = document.querySelectorAll(".percentBarBar");
        for(let percentBarBar of percentBarBars) {
            percentBarBar.style.backgroundColor =  `rgb(${randomColorR}, ${randomColorG}, ${randomColorB}`;
        }

        chart.data.datasets[0].backgroundColor = `rgb(${randomColorR}, ${randomColorG}, ${randomColorB}`;
        chart.data.datasets[0].borderColor = `rgb(${randomColorR}, ${randomColorG}, ${randomColorB}`;
        chart.data.datasets[0]._meta[0].type = "pie";
        chart.update();
    }

    function e(tag, text, parent, classs=null, id=null) {
        let o = document.createElement(tag);
        if (text != null)
            o.appendChild(document.createTextNode(text));
        if (classs != null)
            o.classList.add(classs);
        if (id != null)
            o.id = id;
        parent.appendChild(o);
        return o
    }

});
