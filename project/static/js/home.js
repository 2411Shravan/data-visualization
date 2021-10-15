const loadbackgroundi= document.getElementById('loadbackgroundi');
const requiredicon=document.getElementById('requiredicon');
const photourls=[
    "https://images.unsplash.com/photo-1506794778225-cbf6c8df4c5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
   "https://images.unsplash.com/photo-1478728073286-db190d3d8ce6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
   "https://images.unsplash.com/photo-1501471984908-815b996862f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
   "https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
   "https://images.unsplash.com/photo-1488767136043-c1eb91ca932d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
   "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
   "https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80",
   "https://images.unsplash.com/photo-1492573637402-25691cd9eac2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
   "https://images.unsplash.com/photo-1511279247506-b74bf93feee4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
   "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
   "https://images.unsplash.com/photo-1495592822108-9e6261896da8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
   "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80"
]


const iconurls=[
    '<img src="https://img.icons8.com/external-sbts2018-blue-sbts2018/200/000000/external-stock-market-cryptopcurrency-sbts2018-blue-sbts2018.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-wanicon-flat-wanicon/200/000000/external-stock-market-economic-crisis-wanicon-flat-wanicon.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-wanicon-flat-wanicon/200/000000/external-bull-market-stock-market-wanicon-flat-wanicon.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-wanicon-two-tone-wanicon/200/000000/external-bull-market-stock-market-wanicon-two-tone-wanicon.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/200/000000/external-chart-stock-market-wanicon-lineal-color-wanicon.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/200/000000/external-knowledge-stock-market-wanicon-lineal-color-wanicon.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-wanicon-flat-wanicon/200/000000/external-chart-stock-market-wanicon-flat-wanicon.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-wanicon-flat-wanicon/200/000000/external-knowledge-stock-market-wanicon-flat-wanicon.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/fluency/200/000000/bitcoin.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-justicon-lineal-color-justicon/200/000000/external-bitcoin-cryptocurrency-justicon-lineal-color-justicon-2.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/200/000000/external-bitcoin-cryptocurrency-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-2.png" style="height:300px; width:300px"/>',
    '<img src="https://img.icons8.com/external-prettycons-flat-prettycons/200/000000/external-cryptocurrencies-crypto-and-currency-prettycons-flat-prettycons.png" style="height:300px; width:300px"/>'
]


console.log(iconurls[0]);
    var dist=photourls.length;
   var res=Math.floor(Math.random() * dist);
   var link=photourls[res];
   console.log(link);
   loadbackgroundi.style.backgroundImage+=`url(${link})`;


   var dist1=iconurls.length;
   var res1=Math.floor(Math.random() * dist1);
   requiredicon.innerHTML+=`${iconurls[res1]}`
  
