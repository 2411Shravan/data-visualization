const UKtickersWeekly = document.getElementById('UKtickersWeekly');
// const loaderCycle = document.getElementById('loaderCycle');
var week_dates = [];
var week_ohlc = [];
var final_weekl = [];

UKtickersWeekly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loaderCycle.style.display = 'block';
    const req_data = document.getElementById('UKtickerW').value;
    console.log(req_data);
    UK_weekly_data(req_data);
});

function UK_weekly_data(redata){
    // console.log(redata);
    var str=redata.toUpperCase();
    console.log(str);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+str+'.LON&apikey=WH75LQJ4BD7S15TO';
    fetchUKWeeklydata(api);
}

async function fetchUKWeeklydata(API) {
    const response =await fetch(API);
    const resposneData = await response.json();
    console.log(resposneData);
    sortUKWeeklyData(resposneData);
}

function sortUKWeeklyData(datas){
    var redData = datas['Weekly Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    updateUKWeeklyData(ref_key, ref_val);
}

function updateWeeklyData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        weekly_dates.push(value);
    });

    console.log(weekly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        weekly_ohlc.push(temp_arr);
    });
    // console.log(ohlc);
    mergeWeeklyData();
}

function mergeWeeklyData() {
    for (var i = 0; i < weekly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = weekly_dates[i];
        //console.log(i);
        final_weekly.push(resi);
    }

    for (var j = 0; j < weekly_ohlc.length; j++) {
        final_weekly[j]['y'] = weekly_ohlc[j];
    }

    console.log(final_weekly);
    loaderCycle.style.display = 'none';
    var options = {
        series: [{
            data: final_weekly,
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

    const div = document.getElementById('shareWeeklyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}