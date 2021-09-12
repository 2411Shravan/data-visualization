const IndiantickersWeekly = document.getElementById('IndiantickersWeekly');
// const loadExchange = document.getElementById('loaderExchange');

IndiantickersWeekly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loadExchange.style.display = 'block';
    const req_data = document.getElementById('IndiantickerW').value;
    const updata=req_data.toUpperCase();
    console.log(updata);

    getIndianWeeklyData(req_data);
});

var keyWeek=[];
var valueWeek=[];
var final_result=[];



function getIndianWeeklyData(data){
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+data+'.BSE&apikey=WH75LQJ4BD7S15TO'
    fetchIndianWeeklyData(api);
}

async function fetchIndianWeeklyData(API) {
    const response = await fetch(API);
    const responseData = await response.json();
    console.log(responseData);
    sortIndianWeeklyData(responseData);
}

function sortIndianWeeklyData(sortingData){
    console.log(sortingData);
    var redData = sortingData['Weekly Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    console.log(ref_val);
    console.log(ref_key);
    updateIndianWeeklyData(ref_key, ref_val);
}

function updateIndianWeeklyData(key,val){
    key.forEach(data => {
        keyWeek.push(data);
    });
    // console.log(key);
    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        valueWeek.push(temp_arr);
    });
    mergeWeeklyData();
}
function mergeWeeklyData() {
    for (var i = 0; i < keyWeek.length; i++) {
        var resi = {};
        // console.log(objects [i]);
        resi['x'] = keyWeek[i];
        //console.log(i);
        final_result.push(resi);
    }

    for (var j = 0; j < valueWeek.length; j++) {
        final_result[j]['y'] = valueWeek[j];
    }
    // loadExchange.style.display = 'none';

    console.log(final_result);
    var options = {
        series: [{
            data: final_result,
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

    const div = document.getElementById('IndianWeeklyChart');


    var chart = new ApexCharts(div, options);
    chart.render();
}