const IndiantickersMonthly = document.getElementById('IndiantickersMonthly');
const loaderTimer = document.getElementById('loaderTimer');

IndiantickersMonthly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loaderTimer.style.display = 'block';
    const req_data = document.getElementById('IndiantickerM').value;
    const updata=req_data.toUpperCase();
    console.log(updata);

    getIndianWMonthlyData(req_data);
});

function getIndianWMonthlyData(getData){
    console.log(getData);
}