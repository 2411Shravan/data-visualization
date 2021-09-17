const CanadaVenturetickersMonthly = document.getElementById('CanadaVenturetickersMonthly');
const loaderDice = document.getElementById('loaderDice');
var canadaventure_monthly_dates = [];
var canadaventure_monthly_ohlc = [];
var canadaventure_final_monthly = [];

CanadaVenturetickersMonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderDice.style.display = 'block';
    const req_data = document.getElementById('CanadaVenturetickerM').value;
    console.log(req_data);
    canadaventureready_monthly_data(req_data);
});

function canadaventureready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+stre+'.TRV&apikey=WH75LQJ4BD7S15TO';
    fetchcanadaventureMonthlyData(api);
}

async function fetchcanadaventureMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    sortMontlycanadaventureData(responseData);
}

function sortMontlycanadaventureData(responses){
    var redData = responses['Monthly Adjusted Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_key,ref_val);
    updateMonthlycanadaventureData(ref_key, ref_val);
}

function updateMonthlycanadaventureData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        canadaventure_monthly_dates.push(value);
    });

    console.log(canadaventure_monthly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        canadaventure_monthly_ohlc.push(temp_arr);
    });
    console.log(canadaventure_monthly_ohlc);
    mergecanadaventureMonthlyData();
}

function mergecanadaventureMonthlyData(){
    for (var i = 0; i < canadaventure_monthly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = canadaventure_monthly_dates[i];
        //console.log(i);
        canadaventure_final_monthly.push(resi);
    }

    for (var j = 0; j < canadaventure_monthly_ohlc.length; j++) {
        canadaventure_final_monthly[j]['y'] = canadaventure_monthly_ohlc[j];
    }

    console.log(canadaventure_final_monthly);
    loaderDice.style.display = 'none';
    var options = {
        series: [{
            data: canadaventure_final_monthly,
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

    const div = document.getElementById('canadaVentureMonthlyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}