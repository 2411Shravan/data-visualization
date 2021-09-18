const shanghaitickersWeekly = document.getElementById('shanghaitickersWeekly');
const loaderSpark = document.getElementById('loaderSpark');
var shanghai_monthly_dates = [];
var shanghai_monthly_ohlc = [];
var shanghai_final_monthly = [];

shanghaitickersWeekly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderSpark.style.display = 'block';
    const req_data = document.getElementById('shanghaitickerW').value;
    console.log(req_data);
    shanghaiready_monthly_data(req_data);
});

function shanghaiready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+stre+'.SHH&apikey=WH75LQJ4BD7S15TO';
    fetchshanghaiMonthlyData(api);
}

async function fetchshanghaiMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    sortshanghaiMontlyUKData(responseData);
}

function sortshanghaiMontlyUKData(responses){
    var redData = responses['Weekly Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_key,ref_val);
    updateshanghaiMonthlyUKData(ref_key, ref_val);
}

function updateshanghaiMonthlyUKData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        shanghai_monthly_dates.push(value);
    });

    console.log(shanghai_monthly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        shanghai_monthly_ohlc.push(temp_arr);
    });
    console.log(shanghai_monthly_ohlc);
    mergeshanghaiMonthlyData();
}

function mergeshanghaiMonthlyData(){
    for (var i = 0; i <shanghai_monthly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = shanghai_monthly_dates[i];
        //console.log(i);
        shanghai_final_monthly.push(resi);
    }

    for (var j = 0; j < shanghai_monthly_ohlc.length; j++) {
        shanghai_final_monthly[j]['y'] = shanghai_monthly_ohlc[j];
    }

    console.log(shanghai_final_monthly);
    loaderSpark.style.display = 'none';
    var options = {
        series: [{
            data: shanghai_final_monthly,
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

    const opt = document.getElementById('shanghaiWeeklyChart');


    var chart = new ApexCharts(opt, options);
    chart.render();
}