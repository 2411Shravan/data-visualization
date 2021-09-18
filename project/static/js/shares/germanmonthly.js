const Germantickersmonthly = document.getElementById('Germantickersmonthly');
// const loaderIndicator = document.getElementById('loaderIndicator');
var german_monthly_dates = [];
var german_monthly_ohlc = [];
var german_final_monthly = [];

Germantickersmonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loaderIndicator.style.display = 'block';
    const req_data = document.getElementById('GermantickerM').value;
    console.log(req_data);
    germanready_monthly_data(req_data);
});

function germanready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+stre+'.DEX&apikey=WH75LQJ4BD7S15TO';
    fetchgermanMonthlyData(api);
}

async function fetchgermanMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    sortgermanMontlyUKData(responseData);
}

function sortgermanMontlyUKData(responses){
    var redData = responses['Monthly Adjusted Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_key,ref_val);
    updategermanMonthlyUKData(ref_key, ref_val);
}

function updategermanMonthlyUKData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        german_monthly_dates.push(value);
    });

    console.log(german_monthly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        german_monthly_ohlc.push(temp_arr);
    });
    console.log(german_monthly_ohlc);
    mergegermanMonthlyData();
}

function mergegermanMonthlyData(){
    for (var i = 0; i <german_monthly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = german_monthly_dates[i];
        //console.log(i);
        german_final_monthly.push(resi);
    }

    for (var j = 0; j < german_monthly_ohlc.length; j++) {
        german_final_monthly[j]['y'] = german_monthly_ohlc[j];
    }

    console.log(german_final_monthly);
    // loaderIndicator.style.display = 'none';
    var options = {
        series: [{
            data: german_final_monthly,
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

    const opt = document.getElementById('germanWeeklyChart');


    var chart = new ApexCharts(opt, options);
    chart.render();
}