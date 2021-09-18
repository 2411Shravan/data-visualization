const GermantickersWeekly = document.getElementById('GermantickersWeekly');
const loaderBalance = document.getElementById('loaderBalance');
var german_week_dates = [];
var german_week_ohlc = [];
var german_final_week = [];

GermantickersWeekly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderBalance.style.display = 'block';
    const req_data = document.getElementById('GermantickerW').value;
    console.log(req_data);
    german_weekly_data(req_data);
});

function german_weekly_data(redata){
    // console.log(redata);
    var str=redata.toUpperCase();
    console.log(str);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+str+'.DEX&apikey=WH75LQJ4BD7S15TO';
    fetchgermanWeeklydata(api);
}

async function fetchgermanWeeklydata(API) {
    const response =await fetch(API);
    const resposneData = await response.json();
    console.log(resposneData);
    sortgermanWeeklyData(resposneData);
}

function sortgermanWeeklyData(datas){
    var redData = datas['Weekly Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    updategermanWeeklyData(ref_key, ref_val);
}

function updategermanWeeklyData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        german_week_dates.push(value);
    });

    console.log(german_week_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        german_week_ohlc.push(temp_arr);
    });
    // console.log(ohlc);
    mergegermanWeeklyData();
}

function mergegermanWeeklyData() {
    for (var i = 0; i < german_week_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = german_week_dates[i];
        //console.log(i);
        german_final_week.push(resi);
    }

    for (var j = 0; j < german_week_ohlc.length; j++) {
        german_final_week[j]['y'] = german_week_ohlc[j];
    }

    console.log(german_final_week);
    loaderBalance.style.display = 'none';
    var options = {
        series: [{
            data: german_final_week,
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

    const div = document.getElementById('germanWeeklyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}