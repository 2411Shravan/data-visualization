const UKtickersMonthly = document.getElementById('UKtickersMonthly');
// const loaderDouble = document.getElementById('loaderDouble');
var monthly_dates = [];
var monthly_ohlc = [];
var final_monthly = [];

UKtickersMonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loaderDouble.style.display = 'block';
    const req_data = document.getElementById('tickerM').value;
    console.log(req_data);
    ready_monthly_data(req_data);
});

function ready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+stre+'.LON&apikey=WH75LQJ4BD7S15TO';
    fetchMonthlyData(api);
}

async function fetchMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    sortMontlyData(responseData);
}

function sortMontlyData(responses){
    var redData = responses['Monthly Adjusted Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_key,ref_val);
    updateMonthlyData(ref_key, ref_val);
}

function updateMonthlyData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        monthly_dates.push(value);
    });

    console.log(monthly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        monthly_ohlc.push(temp_arr);
    });
    console.log(monthly_ohlc);
    mergeMonthlyData();
}

function mergeMonthlyData(){
    for (var i = 0; i < monthly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = monthly_dates[i];
        //console.log(i);
        final_monthly.push(resi);
    }

    for (var j = 0; j < monthly_ohlc.length; j++) {
        final_monthly[j]['y'] = monthly_ohlc[j];
    }

    console.log(final_monthly);
    // loaderDouble.style.display = 'none';
    var options = {
        series: [{
            data: final_monthly,
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

    const div = document.getElementById('shareMonthlyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}