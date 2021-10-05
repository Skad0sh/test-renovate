
render = (num,product)=>{
    const card=document.getElementById('card');
    const template=`<div class="card">
    <div class="box">
    <div class="content">
        <h2>${num}</h2>
        <h3>${product}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam velit? Iure nemo labore inventore?</p>
        <button>add to cart</button>
    </div>
    </div>
    </div>`
    
    card.innerHTML+=template;
}

products=async()=>{
    let response = await fetch('/products' ,{credentials: "same-origin"});

    let result = await response.json();
   console.log(result[0]);;
}
window.onload=products()

