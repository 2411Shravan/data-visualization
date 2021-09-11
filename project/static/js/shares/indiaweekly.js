const IndiantickersWeekly = document.getElementById('IndiantickersWeekly');
const loadExchange = document.getElementById('loaderExchange');

IndiantickersWeekly.addEventListener('submit', (e) => {

    e.preventDefault();
    // loadExchange.style.display = 'block';
    const req_data = document.getElementById('ticker').value;
    

    getShareData(req_data);
});