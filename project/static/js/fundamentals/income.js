const requiredIncome=document.getElementById('getIncomeSt');
// const lol= document.getElementById('lol');
// const loaf=document.getElementById('loafing');

requiredIncome.addEventListener('submit',function (e){
    
    e.preventDefault();
    console.log('hello world');
    
    var UI=document.getElementById('compa').value;
    var res=UI.toUpperCase();
    console.log(res);
    // getBasicFinData(res);
    getIncome(res);
})


var fde=[];
var cor=[];
var comprehensiveIncomeNetOfTax=[];
var costofGoodsAndServicesSold=[];
var depreciation=[];
var grossProfit=[];
var interestIncome=[];
var netIncome=[];
var operatingIncome=[];
var researchAndDevelopment=[];
var sellingGeneralAndAdministrative=[];
var totalRevenue=[];
var incomeTaxExpense=[];

function getIncome(resi){
    var api='https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol='+resi+'&apikey=WH75LQJ4BD7S15TO'
    fetchIncome(api);
}

async function fetchIncome(API){
    const response = await fetch(API);
    const responseData = await response.json();
   console.log(responseData);
   const{annualReports}=responseData;
    if(annualReports){
        startsortIncome(responseData);
    }
    else{
        console.log('wrong response');
    }
}

function startsortIncome(responses){
    const{annualReports,quarterlyReports} = responses;
    console.log(annualReports);
    // console.log(quarterlyReports);
    sortIncome(annualReports);
}

function sortIncome(annuals){
    annuals.forEach(annual=>{
        // console.log(annual);
        console.log(annual);
        fde.push(annual['fiscalDateEnding']);
        cor.push(parseInt(annual['costOfRevenue']));
        comprehensiveIncomeNetOfTax.push(parseInt(annual['comprehensiveIncomeNetOfTax']));
        costofGoodsAndServicesSold.push(parseInt(annual['costofGoodsAndServicesSold']));
        depreciation.push(parseInt(annual['depreciation']));
        grossProfit.push(parseInt(annual['grossProfit']));
        incomeTaxExpense.push(parseInt(annual['incomeTaxExpense']));
        interestIncome.push(parseInt(annual['interestIncome']));
        netIncome.push(parseInt(annual['netIncome']));
        operatingIncome.push(parseInt(annual['operatingIncome']));
        researchAndDevelopment.push(parseInt(annual['researchAndDevelopment']));
        sellingGeneralAndAdministrative.push(parseInt(annual['sellingGeneralAndAdministrative']));
        totalRevenue.push(parseInt(annual['totalRevenue']))
    });

    console.log(fde,cor,comprehensiveIncomeNetOfTax,costofGoodsAndServicesSold);




    var options = {
        series: [{
        name: 'Cost of revenue',
        data:cor
      }, {
        name: 'comprehensive Tax',
        data: comprehensiveIncomeNetOfTax
      },
      {
        name: 'cost of Goods And Services Sold',
        data: costofGoodsAndServicesSold
      },
      {
        name: 'depreciation',
        data: depreciation
      },
      {
        name: 'grossProfit',
        data: grossProfit
      },
      {
        name: 'interestIncome',
        data: interestIncome
      },
      {
        name: 'netIncome',
        data: netIncome
      },
      {
        name: 'operatingIncome',
        data: operatingIncome
      },
      {
        name: 'research And Development',
        data: researchAndDevelopment
      },
      {
        name: 'selling General And Administrative',
        data: sellingGeneralAndAdministrative
      },
      {
        name: 'income-Tax Expense',
        data: incomeTaxExpense
      },
      {
        name: 'totalRevenue',
        data: totalRevenue
      }],
        chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
     
        categories:fde
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
      };
    
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
}


