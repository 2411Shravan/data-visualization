const tickersdataDaily = document.getElementById('tickersdataDaily');
const loaderEye = document.getElementById('loaderEye');
var daily_dates = [];
var ohlc = [];
var final_barstick = [];

tickersdataDaily.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderEye.style.display = 'block';
    const req_data = document.getElementById('tickerD').value;
    // console.log(req_data);
    ready_data(req_data);
});


function ready_data(data) {
    console.log(data.toUpperCase());
    var final_name = data.toUpperCase();
    var api = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + final_name + '&apikey=WH75LQJ4BD7S15TO';
    // console.log(api);
    fetchDailyData(api);
}

async function fetchDailyData(API) {
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    sortDailyData(responseData);
}

function sortDailyData(rd) {
    var redData = rd['Time Series (Daily)'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_val);
    // console.log(ref_key);
    updateDailyData(ref_key, ref_val);
}

function updateDailyData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        daily_dates.push(value);
    });

    console.log(daily_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        ohlc.push(temp_arr);
    });
    // console.log(ohlc);
    mergeDailyData();
}

function mergeDailyData() {
    for (var i = 0; i < daily_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = daily_dates[i];
        //console.log(i);
        final_barstick.push(resi);
    }

    for (var j = 0; j < ohlc.length; j++) {
        final_barstick[j]['y'] = ohlc[j];
    }

    console.log(final_barstick);
    loaderEye.style.display = 'none';
    var options = {
        series: [{
            data: final_barstick,
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

    const div = document.getElementById('shareDailyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}