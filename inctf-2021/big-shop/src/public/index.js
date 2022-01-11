
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
  const formData = new FormData();
  formData.append('pid',e)
    let response = await fetch('/add', {
      method: 'POST',
      body: formData
    });

    let result = await response.json();

    alert(result.message);
    
      
  };

products=async()=>{
    let response = await fetch('/api/products' ,{credentials: "same-origin"});

    let result = await response.json();
    console.log(result)
   for(var i=0;i<result.length;i++){
       render(result[i].pid,result[i].p_name,result[i].price)
   }
   let resp= await fetch('/api/user',{credentials:"same-origin"});
   let user= await resp.json()
   const coin=document.getElementById('coins');
   coin.innerHTML=`your coins :<b>${user[0].coins} </b><i class="fas fa-coins" style="color: darkgray;"></i>`

}
window.onload=products()

