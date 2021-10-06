
render = (num,product,price)=>{
    const card=document.getElementById('card');
    const template=`<div class="card">
    <div class="box">
    <div class="content">
        <h2>${num}</h2>
        <h3>${product}</h3>
        <p>price : ${price}</p>
        <button onclick='add(${num})'>add to cart</button>
    </div>
    </div>
    </div>`
    
    card.innerHTML+=template;
}


 add=async (e) => {
    

    let response = await fetch('/add', {
      method: 'POST',
      body: `pid=${e}`
    });

    let result = await response.json();

    alert(result.message);
    
      
  };

products=async()=>{
    let response = await fetch('/products' ,{credentials: "same-origin"});

    let result = await response.json();
    console.log(result)
   for(var i=0;i<result.length;i++){
       render(result[i].pid,result[i].p_name,result[i].price)
   }
}
window.onload=products()

