const Canadatickersmonthly = document.getElementById('Canadatickersmonthly');
// const loaderIndicator = document.getElementById('loaderIndicator');
var canada_monthly_dates = [];
var canada_monthly_ohlc = [];
var canada_final_monthly = [];

Canadatickersmonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loaderIndicator.style.display = 'block';
    const req_data = document.getElementById('CanadatickerM').value;
    console.log(req_data);
    canadaready_monthly_data(req_data);
});

function canadaready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+stre+'.TRT&apikey=WH75LQJ4BD7S15TO';
    fetchcanadaMonthlyData(api);
}

async function fetchcanadaMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    sortMontlycanadaData(responseData);
}

function sortMontlycanadaData(responses){
    var redData = responses['Monthly Adjusted Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_key,ref_val);
    updateMonthlycanadaData(ref_key, ref_val);
}

function updateMonthlycanadaData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        canada_monthly_dates.push(value);
    });

    console.log(uk_monthly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        canada_monthly_ohlc.push(temp_arr);
    });
    console.log(canada_monthly_ohlc);
    mergecanadaMonthlyData();
}

function mergecanadaMonthlyData(){
    for (var i = 0; i < canada_monthly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = canada_monthly_dates[i];
        //console.log(i);
        canada_final_monthly.push(resi);
    }

    for (var j = 0; j < canada_monthly_ohlc.length; j++) {
        canada_final_monthly[j]['y'] = canada_monthly_ohlc[j];
    }

    console.log(canada_final_monthly);
    // loaderIndicator.style.display = 'none';
    var options = {
        series: [{
            data: canada_final_monthly,
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

    const div = document.getElementById('UKMonthlyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}