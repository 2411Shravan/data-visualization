const tickersdataWeekly = document.getElementById('tickersdataWeekly');
// const loaderEye = document.getElementById('loaderEye');
var daily_dates = [];
var ohlc = [];
var final_barstick = [];

tickersdataWeekly.addEventListener('submit', (e) => {

    e.preventDefault();

    const req_data = document.getElementById('tickerW').value;
    console.log(req_data);
    
});
