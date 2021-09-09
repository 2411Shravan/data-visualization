const tickersdataMonthly = document.getElementById('tickersdataMonthly');
// const loaderCycle = document.getElementById('loaderCycle');
var monthly_dates = [];
var monthly_ohlc = [];
var final_monthly = [];

tickersdataMonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loaderCycle.style.display = 'block';
    const req_data = document.getElementById('tickerM').value;
    console.log(req_data);
    ready_monthly_data(req_data);
});

function ready_monthly_data(rd){
    var stre=rd.toUpperCase();
    console.log(stre);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+stre+'&apikey=WH75LQJ4BD7S15TO';
    fetchMonthlyData(api);
}

async function fetchMonthlyData(API){
    const response = await fetch(API);
    const responseData = await response.json();
    console.log(responseData);
    sortMontlyData(responseData);
}

function sortMontlyData(responses){
    var redData = responses['Monthly Adjusted Time Series'];
    var ref_val = Object.values(redData);
    var ref_key = Object.keys(redData);
    console.log(ref_key,ref_val);
    updateMonthlyData(ref_key, ref_val);
}

function updateMonthlyData(key, val) {
    // console.log(key.length);
    // console.log(val.length);
    key.forEach(value => {
        weekly_dates.push(value);
    });

    console.log(weekly_dates);

    val.forEach(data => {
        var temp_arr = [];
        temp_arr.push(parseFloat(data['1. open']));
        temp_arr.push(parseFloat(data['2. high']));
        temp_arr.push(parseFloat(data['3. low']));
        temp_arr.push(parseFloat(data['4. close']));
        weekly_ohlc.push(temp_arr);
    });
    // console.log(ohlc);
    mergeWeeklyData();
}