const M=[
['Burrata Garden','starter',58000,'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85','Burrata creamy, tomato & basil oil.'],
['Truffle Arancini','starter',65000,'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85','Crispy risotto, parmesan & truffle cream.'],
['Beef Carpaccio','starter',78000,'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=85','Beef, rocket, parmesan & lemon.'],
['French Onion Soup','starter',52000,'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=85','Classic onion soup & gruyere.'],
['Wagyu Signature','main',185000,'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85','Wagyu, rosemary jus & vegetables.'],
['Truffle Pasta','main',125000,'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85','Handmade pasta, parmesan & truffle.'],
['Salmon Royale','main',112000,'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85','Roasted salmon, potato puree & herbs.'],
['Lobster Risotto','main',158000,'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=85','Risotto, lobster & saffron.'],
['Duck Confit','main',135000,'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85','Slow duck, orange glaze & greens.'],
['Chocolate Fondant','dessert',62000,'https://images.unsplash.com/photo-1606313564200-e75d5e30476a?auto=format&fit=crop&w=900&q=85','Warm chocolate cake & vanilla ice cream.'],
['Pistachio Tiramisu','dessert',58000,'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85','Mascarpone, espresso & pistachio.'],
['Berry Pavlova','dessert',55000,'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=900&q=85','Meringue, berries & cream.'],
['Royal Espresso','drink',35000,'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85','Espresso dengan aroma dark chocolate.'],
['Strawberry Fizz','drink',42000,'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85','Strawberry, citrus & sparkling soda.'],
['Matcha Cream','drink',45000,'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=85','Ceremonial matcha, milk & cream.'],
['Golden Lemonade','drink',38000,'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85','Fresh lemon, honey & sparkling water.']
];
let s={money:+localStorage.eatMoney||250000,rep:+localStorage.eatRep||82,served:+localStorage.eatServed||0,combo:0,order:[]};
const $=x=>document.querySelector(x),fmt=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
function save(){localStorage.eatMoney=s.money;localStorage.eatRep=s.rep;localStorage.eatServed=s.served}
function stats(){$('#money').textContent=fmt(s.money);$('#rep').textContent=s.rep+' / 100';$('#served').textContent=s.served;$('#combo').textContent='x'+s.combo;$('#bar').style.width=Math.min(100,s.served*20)+'%';$('#goal').textContent=Math.min(5,s.served)+' / 5 tamu'}
function menu(cat='all'){$('#grid').innerHTML=M.filter(x=>cat==='all'||x[1]===cat).map((x,i)=>`<article class="dish"><img src="${x[3]}" alt="${x[0]}" loading="lazy"><div><small>${x[1]}</small><h3>${x[0]}</h3><p>${x[4]}</p><div class="row"><span class="price">${fmt(x[2])}</span><button class="add" data-i="${M.indexOf(x)}">+ Tambah</button></div></div></article>`).join('');document.querySelectorAll('.add').forEach(b=>b.onclick=()=>add(+b.dataset.i))}
function add(i){let x=M[i],o=s.order.find(v=>v[0]===x[0]);o?o[5]++:s.order.push([...x,1]);orders();toast(x[0]+' ditambahkan')}
function orders(){let total=0,c=0;s.order.forEach(x=>{total+=x[2]*x[5];c+=x[5]});$('#count').textContent=c;$('#total').textContent=fmt(total);$('#orders').innerHTML=s.order.length?s.order.map((x,i)=>`<div class="order"><div><b>${x[0]}</b><small>${fmt(x[2])} × ${x[5]}</small></div><div class="qty"><button data-m="${i}">−</button> ${x[5]} <button data-p="${i}">+</button></div></div>`).join(''):'<p style="color:#8a7971">Belum ada hidangan.</p>';document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>qty(+b.dataset.m,-1));document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>qty(+b.dataset.p,1))}
function qty(i,d){s.order[i][5]+=d;if(s.order[i][5]<=0)s.order.splice(i,1);orders()}
function toast(t){let e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1700)}
function openCart(){$('#drawer').classList.add('open');$('#shade').classList.add('open')}function closeCart(){$('#drawer').classList.remove('open');$('#shade').classList.remove('open')}
function modal(t,p){$('#modalTitle').textContent=t;$('#modalText').textContent=p;$('#modal').classList.add('open')}
document.querySelectorAll('#filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');menu(b.dataset.cat)});
$('#cart').onclick=openCart;$('#close').onclick=closeCart;$('#shade').onclick=closeCart;
$('#checkout').onclick=()=>{if(!s.order.length)return toast('Pilih menu terlebih dahulu');s.order=[];orders();closeCart();toast('Pesanan berhasil dikirim ke dapur 👨‍🍳')};
$('#serve').onclick=()=>{s.served++;s.combo++;s.money+=15000+s.combo*2500;s.rep=Math.min(100,s.rep+(s.combo%3===0?2:1));save();stats();$('#guest').textContent=String(s.served+1).padStart(2,'0');toast('Service sukses! Tip masuk 💰');if(s.served===5)modal('Target tercapai!','Kamu berhasil melayani 5 tamu. Reputasi restoranmu makin tinggi.')};
$('#start').onclick=()=>{$('#menus').scrollIntoView({behavior:'smooth'});toast('Service dimulai. Good luck, Chef!')};
$('#how').onclick=()=>modal('Cara Main','Pilih hidangan untuk memasukkannya ke pesanan. Buka Pesanan lalu kirim ke dapur. Tekan Layani saat tamu datang untuk mendapatkan tip, combo, dan reputasi.');
$('#modalClose').onclick=()=>$('#modal').classList.remove('open');$('#modalOk').onclick=()=>$('#modal').classList.remove('open');
document.querySelectorAll('[data-special]').forEach(b=>b.onclick=()=>add(M.findIndex(x=>x[0]===b.dataset.special)));
menu();orders();stats();