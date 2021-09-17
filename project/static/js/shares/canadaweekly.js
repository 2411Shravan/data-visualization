const CanadatickersWeekly = document.getElementById('CanadatickersWeekly');
const loaderCoffee = document.getElementById('loaderCoffee');
var canada_week_dates = [];
var canada_week_ohlc = [];
var canada_final_week = [];

CanadatickersWeekly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderCoffee.style.display = 'block';
    const req_data = document.getElementById('CanadatickerW').value;
    console.log(req_data);
    canada_weekly_data(req_data);
});

function canada_weekly_data(redata){
    // console.log(redata);
    var str=redata.toUpperCase();
    console.log(str);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+str+'.TRT&apikey=WH75LQJ4BD7S15TO';
    fetchCANADAWeeklydata(api);
}

async function fetchCANADAWeeklydata(API) {
    const response =await fetch(API);
    const resposneData = await response.json();
    console.log(resposneData);
    sortcanadaWeeklyData(resposneData);
}

function sortcanadaWeeklyData(datas){
    var redData = datas['Weekly Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    updatecanadaWeeklyData(ref_key, ref_val);
}

function updatecanadaWeeklyData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        canada_week_dates.push(value);
    });

    console.log(week_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        canada_week_ohlc.push(temp_arr);
    });
    // console.log(ohlc);
    mergecanadaWeeklyData();
}

function mergecanadaWeeklyData() {
    for (var i = 0; i < canada_week_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = canada_week_dates[i];
        //console.log(i);
        canada_final_week.push(resi);
    }

    for (var j = 0; j < canada_week_ohlc.length; j++) {
        canada_final_week[j]['y'] = canada_week_ohlc[j];
    }

    console.log(canada_final_week);
    loaderCoffee.style.display = 'none';
    var options = {
        series: [{
            data: canada_final_week,
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

    const div = document.getElementById('canadaWeeklyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}