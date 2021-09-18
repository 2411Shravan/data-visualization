const shenzentickersWeekly = document.getElementById('shenzentickersWeekly');
const loaderMouse = document.getElementById('loaderMouse');
var shenzen_weekly_dates = [];
var shenzen_weekly_ohlc = [];
var shenzen_weekly_monthly = [];

shenzentickersWeekly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderMouse.style.display = 'block';
    const req_data = document.getElementById('shenzentickerW').value;
    console.log(req_data);
    shenzenready_monthly_data(req_data);
});

function shenzenready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+stre+'.SHZ&apikey=WH75LQJ4BD7S15TO';
    fetchshenzenMonthlyData(api);
}

async function fetchshenzenMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    sortshenzenMontlyUKData(responseData);
}

function sortshenzenMontlyUKData(responses){
    var redData = responses['Weekly Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_key,ref_val);
    updateshenzenMonthlyUKData(ref_key, ref_val);
}

function updateshenzenMonthlyUKData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        shenzen_weekly_dates.push(value);
    });

    console.log(shenzen_weekly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        shenzen_weekly_ohlc.push(temp_arr);
    });
    console.log(shenzen_weekly_ohlc);
    mergeshenzenMonthlyData();
}

function mergeshenzenMonthlyData(){
    for (var i = 0; i <shenzen_weekly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = shenzen_weekly_dates[i];
        //console.log(i);
        shenzen_weekly_monthly.push(resi);
    }

    for (var j = 0; j < shenzen_weekly_ohlc.length; j++) {
        shenzen_weekly_monthly[j]['y'] = shenzen_weekly_ohlc[j];
    }

    console.log(shenzen_weekly_monthly);
    loaderMouse.style.display = 'none';
    var options = {
        series: [{
            data: shenzen_weekly_monthly,
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

    const opt = document.getElementById('shenzenWeeklyChart');


    var chart = new ApexCharts(opt, options);
    chart.render();
}