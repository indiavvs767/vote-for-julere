/* Main site behavior: form handling, cart, redirection */
document.addEventListener('DOMContentLoaded', ()=>{
document.getElementById('year').textContent = new Date().getFullYear();


const openApplyBtns = [document.getElementById('open-apply'), document.getElementById('hero-apply')];
openApplyBtns.forEach(btn => btn && btn.addEventListener('click', ()=>{
document.getElementById('apply').scrollIntoView({behavior:'smooth'});
}));


// Application form submission -> simulate server, redirect
const form = document.getElementById('application-form');
form.addEventListener('submit', (e)=>{
e.preventDefault();
const data = new FormData(form);
// Basic client validation
if(!data.get('fullname') || !data.get('email') || !data.get('bio')){
alert('Please complete all required fields.');
return;
}
// Here you would send data to server. We'll simulate and redirect to a 'thank you'
showRedirect({title:'Application received', message:`Thanks ${data.get('fullname')} — your application was submitted.`});
});


document.getElementById('save-draft').addEventListener('click', ()=>{
const data = new FormData(form);
const draft = {};
for(const [k,v] of data.entries()){ draft[k]=v }
localStorage.setItem('bp_application_draft', JSON.stringify(draft));
alert('Draft saved locally.');
});


// Restore draft if present
const saved = localStorage.getItem('bp_application_draft');
if(saved){
try{
const obj = JSON.parse(saved);
Object.keys(obj).forEach(k=>{
const el = form.elements[k]; if(el) el.value = obj[k];
})
}catch(e){}
}


// Cart system
const cart = [];
const cartItems = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');


function renderCart(){
cartItems.innerHTML='';
let total = 0;
cart.forEach((it, i)=>{
const li = document.createElement('li');
li.textContent = `${it.title} — $${it.pri
