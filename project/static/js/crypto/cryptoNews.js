const fader= document.getElementById('fader');
const conta= document.getElementById('conta');



const news=[];
function loadNews(){
    fader.style.display="block";
    console.log("Hello world!");
    getNews();
}

async function getNews(){
    const response = await fetch('https://finnhub.io/api/v1/news?category=crypto&token=c2vgio2ad3i9mrpv9i2g');
    const responseData = await response.json();
    console.log(responseData);
    fader.style.display="none";
    showNews(responseData);
}

function showNews(datas) {

    datas.forEach(data=>{
        news.push(data);
    });

    console.log(news);

    displayNews();
}

function displayNews() {
    
    news.forEach(ne=>{

        var timestamp = ne.datetime
        var date = new Date(timestamp);
       
        //console.log(date)

        conta.innerHTML += `

        <div class="col-lg-6 col-xxl-4 mb-5">
        <div class="card">
            <div class="card-inner">
                <div class="panel-logo">
                <div class="panel d-flex">
                  <img src="${ne.image}" style='border-radius: 6px;'>
                  <div style="display:flex;flex-direction: column;">
                    <div>
                        <h5 class='text-dark ml-4'>${ne.headline}</h5>
                      </div>

                      <div>
                        <h6 class="text-dark ml-4">Source -${ne.source}</h6> 
                      </div>
                      <div>
                      <a href="${ne.url}" class=" ml-4">Read more...</a> 
                    </div>
                  </div>
                  
                </div>

                </div>
            </div>
        </div>
    </div>
    
    `;
    })


}