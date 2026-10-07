import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const feed = document.querySelector("#carsFeed");

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

function card(p, index) {

  const images = Array.isArray(p.images) && p.images.length
    ? p.images
    : ["https://via.placeholder.com/500x320?text=Veiculo"];

  return `
    <div class="card">

      <div class="vehicle-gallery" id="gallery-${index}">

        <img
          class="vehicle-photo"
          src="${images[0]}"
          alt="${esc(p.title)}"
        >

        ${
          images.length > 1
            ? `
              <button
                class="gallery-btn prev"
                type="button"
                onclick="changePhoto(${index}, -1)">
                ‹
              </button>

              <button
                class="gallery-btn next"
                type="button"
                onclick="changePhoto(${index}, 1)">
                ›
              </button>

              <div class="gallery-counter">
                1/${images.length}
              </div>
            `
            : ""
        }

      </div>

      <h3>${esc(p.title)}</h3>

      <p>${esc(p.description || "")}</p>

      <p>
        <strong>${esc(p.price || "Consulte")}</strong>
      </p>

      <a
        class="btn"
        href="https://api.whatsapp.com/send?phone=5514997425761&text=${encodeURIComponent("Tenho interesse no " + p.title)}"
        target="_blank">
        Tenho interesse
      </a>

      <script
        type="application/json"
        id="images-${index}">${JSON.stringify(images)}</script>

    </div>
  `;
}

window.changePhoto = function(index, direction) {

  const gallery = document.getElementById(`gallery-${index}`);
  const data = document.getElementById(`images-${index}`);

  if (!gallery || !data) return;

  const images = JSON.parse(data.textContent);

  const img = gallery.querySelector(".vehicle-photo");
  const counter = gallery.querySelector(".gallery-counter");

  let current = Number(gallery.dataset.current || 0);

  current += direction;

  if (current < 0) {
    current = images.length - 1;
  }

  if (current >= images.length) {
    current = 0;
  }

  gallery.dataset.current = current;

  img.src = images[current];

  if (counter) {
    counter.textContent = `${current + 1}/${images.length}`;
  }
};

async function load() {

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {

    console.error(error);

    feed.innerHTML =
      "<p>Não foi possível carregar os veículos.</p>";

    return;
  }

  if (!data || data.length === 0) {

    feed.innerHTML =
      "<p>Nenhum veículo publicado ainda.</p>";

    return;
  }

  feed.innerHTML = data
    .map((p, index) => card(p, index))
    .join("");
}

load();
