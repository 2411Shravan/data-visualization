const IndiantickersWeekly = document.getElementById('IndiantickersWeekly');
const loadExchange = document.getElementById('loaderExchange');

IndiantickersWeekly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loadExchange.style.display = 'block';
    const req_data = document.getElementById('IndiantickerW').value;
    const updata=req_data.toUpperCase();
    console.log(updata);

    //getShareData(req_data);
});