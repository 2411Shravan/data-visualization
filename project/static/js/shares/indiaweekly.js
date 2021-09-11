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

function getIndianWeeklyData(data){
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+IBM+'.BSE&apikey=WH75LQJ4BD7S15TO'
}