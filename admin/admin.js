// --- CONFIG ---
const ADMIN_PASSWORD = "CCP-SISTEMAS-2025";

// --- ELEMENTOS ---
const loginSection = document.getElementById("loginSection");
const adminContent = document.getElementById("adminContent");
const loginStatus = document.getElementById("loginStatus");
const btnLogin = document.getElementById("btnLogin");

const btnExportInvitados = document.getElementById("btnExportInvitados");
const btnExportCanjes = document.getElementById("btnExportCanjes");
const btnVerClubs = document.getElementById("btnVerClubs");

const clubManager = document.getElementById("clubManager");
const clubTableBody = document.getElementById("clubTableBody");

// --- LOGIN ---
btnLogin?.addEventListener("click", () => {
  const pass = document.getElementById("adminPass").value.trim();

  if (pass === ADMIN_PASSWORD) {
    loginStatus.textContent = "Acceso autorizado.";
    loginStatus.classList.add("ok");

    loginSection.style.display = "none";
    adminContent.style.display = "block";
  } else {
    loginStatus.textContent = "Contraseña incorrecta.";
    loginStatus.classList.add("error");
  }
});

// --- DESCARGA INVITADOS ---
btnExportInvitados?.addEventListener("click", async () => {
  const url = `${SUPABASE_URL}/rest/v1/invitados_externos?select=*`;

  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY }
  });

  const data = await res.json();
  downloadCSV("invitados_externos.csv", data);
});

// --- DESCARGA CANJES ---
btnExportCanjes?.addEventListener("click", async () => {
  const url = `${SUPABASE_URL}/rest/v1/canjes?select=*`;

  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY }
  });

  const data = await res.json();
  downloadCSV("canjes.csv", data);
});

// --- MOSTRAR CLUBES ---
btnVerClubs?.addEventListener("click", async () => {
  clubManager.style.display = "block";
  loadClubs();
});

async function loadClubs() {
  const url = `${SUPABASE_URL}/rest/v1/convenios_clubes?select=*`;

  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY }
  });

  const clubs = await res.json();

  clubTableBody.innerHTML = clubs
    .map(
      c => `
      <tr>
        <td>${c.id_club}</td>
        <td>${c.nombre_club}</td>
        <td>${c.ciudad}</td>
        <td>${c.dias_canje}</td>
        <td>${c.activo ? "✔" : "✖"}</td>
        <td>
          <button class="btn small" onclick="toggleClub('${c.id_club}', ${c.activo})">
            ${c.activo ? "Desactivar" : "Activar"}
          </button>
        </td>
      </tr>
    `
    )
    .join("");
}

// --- ACTIVAR / DESACTIVAR CLUB ---
async function toggleClub(id_club, current) {
  const url = `${SUPABASE_URL}/rest/v1/convenios_clubes?id_club=eq.${id_club}`;

  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ activo: !current })
  });

  loadClubs();
}
