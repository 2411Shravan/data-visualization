const shenzentickersMonthly = document.getElementById('shenzentickersMonthly');
const loaderCycleSpinner = document.getElementById('loaderCycleSpinner');
var china_shenzen_monthly_dates = [];
var china_shenzen_monthly_ohlc = [];
var china_shenzen_final_monthly = [];

shenzentickersMonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderCycleSpinner.style.display = 'block';
    const req_data = document.getElementById('shenzentickerM').value;
    console.log(req_data);
    shenzen_shanghaiready_monthly_data(req_data);
});

function shenzen_shanghaiready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+stre+'.SHH&apikey=WH75LQJ4BD7S15TO';
    shenzen_fetchshanghaiMonthlyData(api);
}

async function shenzen_fetchshanghaiMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    // console.log(responseData);
    shenzen_sortshanghaiMontlyUKData(responseData);
}

function shenzen_sortshanghaiMontlyUKData(responses){
    var redData = responses['Monthly Adjusted Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    // console.log(ref_key,ref_val);
    shenzen_updateshanghaiMonthlyUKData(ref_key, ref_val);
}

function shenzen_updateshanghaiMonthlyUKData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        china_shenzen_monthly_dates.push(value);
    });

    console.log(china_shenzen_monthly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        china_shenzen_monthly_ohlc.push(temp_arr);
    });
    console.log(china_shenzen_monthly_ohlc);
    china_mergeshenzenMonthlyData();
}

function china_mergeshenzenMonthlyData(){
    for (var i = 0; i <china_shenzen_monthly_dates.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = china_shenzen_monthly_dates[i];
        //console.log(i);
        china_shenzen_final_monthly.push(resi);
    }

    for (var j = 0; j < china_shenzen_monthly_ohlc.length; j++) {
        china_shenzen_final_monthly[j]['y'] = china_shenzen_monthly_ohlc[j];
    }

    console.log(china_shenzen_final_monthly);
    loaderCycleSpinner.style.display = 'none';
    var options = {
        series: [{
            data: china_shenzen_final_monthly,
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