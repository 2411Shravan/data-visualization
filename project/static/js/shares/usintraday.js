const tickers = document.getElementById('tickersdata');
const loadExchange = document.getElementById('loaderExchange');
const dshow = document.getElementById('dshow');
tickers.addEventListener('submit', (e) => {

    e.preventDefault();
    dshow.style.display = 'none';
    const req_data = document.getElementById('ticker').value;
    loadExchange.style.display = 'block';

    getShareData(req_data);
});

function getShareData(data) {
    var api = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + data + '&interval=5min&apikey=WH75LQJ4BD7S15TO';
    fetchShareData(api);
}

var key = [];
var value = [];
const final_res = [];

async function fetchShareData(API) {
    const response = await fetch(API);
    const resposneData = await response.json();
    // console.log(resposneData);
    sortData(resposneData);
}

function sortData(data) {
    var redData = data['Time Series (5min)'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_val);
    // console.log(ref_key);
    updateData(ref_key, ref_val);
}

function updateData(keys, values) {
    keys.forEach(data => {
        key.push(data);
    });
    // console.log(key);
    values.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        value.push(temp_arr);
    });
    mergeData();
}

function mergeData() {
    for (var i = 0; i < key.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = key[i];
        //console.log(i);
        final_res.push(resi);
    }

    for (var j = 0; j < value.length; j++) {
        final_res[j]['y'] = value[j];
    }
    loadExchange.style.display = 'none';
    dshow.style.display = 'block';
    console.log(final_res);
    var options = {
        series: [{
            data: final_res,
        }],
        chart: {
            type: 'candlestick',
            height: 400,
            foreColor: '#000000'
        },
        title: {
            text: 'MetaData',
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
        theme: {
            mode: 'light',
            palette: 'palette1',
            monochrome: {
                enabled: false,
                color: '#ffffff',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        }
    };

    const div = document.getElementById('shareChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}