import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const feed = document.querySelector("#carsFeed");

function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function card(p){
  const img = p.images?.[0] || "https://via.placeholder.com/500x320?text=Veiculo";
  return `<div class="card">
    <img src="${img}" alt="${esc(p.title)}">
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.description||"")}</p>
    <p><strong>${esc(p.price||"Consulte")}</strong></p>
    <a class="btn" href="https://api.whatsapp.com/send?phone=5514997425761&text=Tenho%20interesse%20no%20${encodeURIComponent(p.title)}" target="_blank">Tenho interesse</a>
  </div>`;
}
async function load(){
 const {data,error}=await supabase.from("posts").select("*").order("created_at",{ascending:false});
 if(error){feed.innerHTML="<p>Configure o sistema de publicações para carregar os veículos.</p>";return;}
 feed.innerHTML=data.length?data.map(card).join(""):"<p>Nenhum veículo publicado ainda.</p>";
}
load();
