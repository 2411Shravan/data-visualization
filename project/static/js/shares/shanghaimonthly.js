const shanghaitickersMonthly = document.getElementById('shanghaitickersMonthly');
const loaderCycleSpinner = document.getElementById('loaderCycleSpinner');
var china_shanghai_monthly_dates = [];
var china_shanghai_monthly_ohlc = [];
var china_shanghai_final_monthly = [];

shanghaitickersMonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderCycleSpinner.style.display = 'block';
    const req_data = document.getElementById('shanghaitickerM').value;
    console.log(req_data);
    china_shanghaiready_monthly_data(req_data);
});

function china_shanghaiready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+stre+'.SHH&apikey=WH75LQJ4BD7S15TO';
    china_fetchshanghaiMonthlyData(api);
}

async function china_fetchshanghaiMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    china_sortshanghaiMontlyUKData(responseData);
}

function china_sortshanghaiMontlyUKData(responses){
    var redData = responses['Monthly Adjusted Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_key,ref_val);
    china_updateshanghaiMonthlyUKData(ref_key, ref_val);
}

function china_updateshanghaiMonthlyUKData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        china_shanghai_monthly_dates.push(value);
    });

    console.log(china_shanghai_monthly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        china_shanghai_monthly_ohlc.push(temp_arr);
    });
    console.log(china_shanghai_monthly_ohlc);
    china_mergeshanghaiMonthlyData();
}

function china_mergeshanghaiMonthlyData(){
    for (var i = 0; i <china_shanghai_monthly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = china_shanghai_monthly_dates[i];
        //console.log(i);
        china_shanghai_final_monthly.push(resi);
    }

    for (var j = 0; j < china_shanghai_monthly_ohlc.length; j++) {
        china_shanghai_final_monthly[j]['y'] = china_shanghai_monthly_ohlc[j];
    }

    console.log(china_shanghai_final_monthly);
    loaderCycleSpinner.style.display = 'none';
    var options = {
        series: [{
            data: china_shanghai_final_monthly,
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

    const opt = document.getElementById('shanghaiMonthlyChart');


    var chart = new ApexCharts(opt, options);
    chart.render();
}