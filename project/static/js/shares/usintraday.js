const tickers = document.getElementById('tickersdata');

tickers.addEventListener('submit', (e) => {
    // chase.style.display = 'block';
    e.preventDefault();
    const req_data = document.getElementById('ticker').value;
    console.log(req_data);
    // CVAR = currencyDataA.value;
    // CDAR = coinDataA.value;
    // console.log(CVAR, CDAR);
    // getDataDialy(CVAR, CDAR);
    console.log("Hello world");
    getShareData(req_data);
});

function getShareData(data) {
    var api = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + data + '&interval=5min&apikey=WH75LQJ4BD7S15TO';
    fetchShareData(api);
}


async function fetchShareData(API) {
    const response = await fetch(API);
    const resposneData = await response.json();
    console.log(resposneData);
    sortData(resposneData);
}

function sortData(data) {
    var redData = data['Time Series (5min)'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    console.log(ref_val);
    console.log(ref_key);
    updateData(ref_val, ref_key);
}

function updateData() {

}
// var options = {
//     series: [{
//         data: {
//             {
//                 low | safe
//             }
//         }
//     }],
//     chart: {
//         type: 'candlestick',
//         height: 350
//     },
//     title: {
//         text: 'CandleStick Chart',
//         align: 'left'
//     },
//     xaxis: {
//         type: 'datetime'
//     },
//     yaxis: {
//         tooltip: {
//             enabled: true
//         }
//     }
// };

// var chart = new ApexCharts(document.querySelector("#chart"), options);
// chart.render();