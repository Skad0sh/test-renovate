
render = (num,product,price)=>{
    const card=document.getElementById('card');
    const template=`<div class="card">
    <div class="box">
    <div class="content">
        <h2>${num}</h2>
        <h3>${product}</h3>
        <p>price : ${price}</p>

        <button onclick='add(${num})'>buy</button>
    </div>
    </div>
    </div>`
    
    card.innerHTML+=template;
}

render_not = (num,product,price)=>{
  const card=document.getElementById('card');
  const template=`<div class="card">
  <div class="box">
  <div class="content">
      <h2>${num}</h2>
      <h3>${product}</h3>
      <p>price : ${price}</p>

      <h3>sorry!, you have not enough money to buy</h3>
  </div>
  </div>
  </div>`
  
  card.innerHTML+=template;
}

render_buy = (num,product,price)=>{
  const card=document.getElementById('card');
  const template=`<div class="card">
  <div class="box">
  <div class="content">
      <h2>${num}</h2>
      <h3>${product}</h3>
      <p>price : ${price}</p>

      <button onclick=open_product(${num})>open</button>
  </div>
  </div>
  </div>`
  
  card.innerHTML+=template;
}


 add=async (e) => {
  const formData = new FormData();
  formData.append('pid',e);
    let response = await fetch('/buy', {
      method: 'POST',
      body: formData
    });

    let result = await response.json();

    alert(result.message);
    if(result.message==="product buyed")
    location.reload();
    
      
  };

open_product=async(e)=>{
  const formData = new FormData();
  formData.append('pid',e);
    let response = await fetch('/open', {
      method: 'POST',
      body: formData
    });

    let result = await response.json();

    alert(result.message);
}

products=async()=>{
    let response = await fetch('/api/cart' ,{credentials: "same-origin"});

    let result = await response.json();
    //console.log(result)
    if(result.length==0){
      card.innerHTML+='<p style="color: darkgray;"> no items in cart<p>';
    }else{
   for(var i=0;i<result.length;i++){
       if(result[i].buy===1){
        render_buy(result[i].pid,result[i].p_name,result[i].price)
       }
       else{
          render(result[i].pid,result[i].p_name,result[i].price)
       }
   }
  }
   let resp= await fetch('/api/user',{credentials:"same-origin"});
   let user= await resp.json()
   const coin=document.getElementById('coins');
   coin.innerHTML=`your coins :<b>${user[0].coins} </b><i class="fas fa-coins" style="color: darkgray;"></i>`

}
window.onload=products()

