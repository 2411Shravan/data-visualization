const IndiantickersMonthly = document.getElementById('IndiantickersMonthly');
const loaderMonth = document.getElementById('loaderMonth');

IndiantickersMonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    loaderMonth.style.display = 'block';
    const req_data = document.getElementById('IndiantickerM').value;
    const updata=req_data.toUpperCase();
    console.log(updata);

    getIndianMonthlyData(updata);
});

var keyMonth=[];
var valueMonth=[];
var final_resultMonth=[];

function getIndianMonthlyData(getData){
    console.log(getData);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+getData+'.BSE&apikey=WH75LQJ4BD7S15TO'
   fetchIndianMonthlyData(api);
}

async function fetchIndianMonthlyData(API){
    const response = await fetch(API);
    const responseData=await response.json();
    console.log(responseData);
    sortmonthlydata(responseData);
}

function sortmonthlydata(rd){
    console.log(rd);
    var redData = rd['Monthly Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    console.log(ref_val);
    console.log(ref_key);
    updateIndianMonthlyData(ref_key, ref_val);
}

function updateIndianMonthlyData(keys,values){
    keys.forEach(data => {
        keyMonth.push(data);
    });
    // console.log(key);
    values.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        valueMonth.push(temp_arr);
    });
    mergeMonthlyData();
}

function mergeMonthlyData(){
    for (var i = 0; i < keyMonth.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = keyMonth[i];
        //console.log(i);
        final_resultMonth.push(resi);
    }

    for (var j = 0; j < valueMonth.length; j++) {
        final_resultMonth[j]['y'] = valueMonth[j];
    }
    loaderMonth.style.display = 'none';

    console.log(final_resultMonth);
    var options = {
        series: [{
            data: final_resultMonth,
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

    const div = document.getElementById('IndianMonthlyChart');


    var chart = new ApexCharts(div, options);
    chart.render();

}