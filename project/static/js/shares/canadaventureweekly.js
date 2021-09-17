const CanadaVenturetickersweekly = document.getElementById('CanadaVenturetickersweekly');
const loaderGlass = document.getElementById('loaderGlass');
var canadaventure_week_dates = [];
var canadaventure_week_ohlc = [];
var canadaventure_final_week = [];

CanadaVenturetickersweekly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderGlass.style.display = 'block';
    const req_data = document.getElementById('CanadaVenturetickerW').value;
    console.log(req_data);
    canadaventure_weekly_data(req_data);
});

function canadaventure_weekly_data(redata){
    // console.log(redata);
    var str=redata.toUpperCase();
    console.log(str);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+str+'.TRV&apikey=WH75LQJ4BD7S15TO';
    fetchcanadaVentureWeeklydata(api);
}

async function fetchcanadaVentureWeeklydata(API) {
    const response =await fetch(API);
    const resposneData = await response.json();
    console.log(resposneData);
    sortcanadaVentureWeeklyData(resposneData);
}

function sortcanadaVentureWeeklyData(datas){
    var redData = datas['Weekly Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    
    updatecanadaVentureWeeklyData(ref_key, ref_val);
}

function updatecanadaVentureWeeklyData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        canadaventure_week_dates.push(value);
    });

    console.log(canadaventure_week_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        canadaventure_week_ohlc.push(temp_arr);
    });
    // console.log(ohlc);
    mergecanadaVentureWeeklyData();
}

function mergecanadaVentureWeeklyData() {
    for (var i = 0; i < canadaventure_week_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = canadaventure_week_dates[i];
        //console.log(i);
        canadaventure_final_week.push(resi);
    }

    for (var j = 0; j < canadaventure_week_ohlc.length; j++) {
        canadaventure_final_week[j]['y'] = canadaventure_week_ohlc[j];
    }

    console.log(canadaventure_final_week);
    loaderGlass.style.display = 'none';
    var options = {
        series: [{
            data: canadaventure_final_week,
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

    const div = document.getElementById('canadaVentureWeeklyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}