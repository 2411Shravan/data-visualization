const IndiantickersMonthly = document.getElementById('IndiantickersMonthly');
// const loaderTimer = document.getElementById('loaderTimer');

IndiantickersMonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loaderTimer.style.display = 'block';
    const req_data = document.getElementById('IndiantickerM').value;
    const updata=req_data.toUpperCase();
    console.log(updata);

    getIndianMonthlyData(updata);
});

function getIndianMonthlyData(getData){
    console.log(getData);
    var api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+getData+'.BSE&apikey=WH75LQJ4BD7S15TO'
   fetchIndianMonthlyData(api);
}

async function fetchIndianMonthlyData(API){
    const response = await fetch(API);
    const responseData=await response.json();
    console.log(responseData);
}