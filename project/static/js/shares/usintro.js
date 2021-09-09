const options=[
    {
        url='https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=891&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=748&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1612010167108-3e6b327405f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1612696874005-d015469bc660?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=341&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1612461313144-fc1676a1bf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=691&q=80'
    },
    {
        url='https://images.unsplash.com/photo-1579407364450-481fe19dbfaa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80'
    }
]

function Loadchange(){
    const bodie=document.getElementById('body-images');
   
    var num = Math.floor(Math.random()*options.length);
        console.log(num);
    
        bodie.className= 'style="<img src="'+options[num].url+'" />"';
}