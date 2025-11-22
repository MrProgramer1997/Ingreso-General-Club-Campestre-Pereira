// assets/js/admin.js

console.log("admin.js cargado");

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
    loginStatus.classList.remove("error");
    loginStatus.classList.add("ok");

    loginSection.style.display = "none";
    adminContent.style.display = "block";
  } else {
    loginStatus.textContent = "Contraseña incorrecta.";
    loginStatus.classList.remove("ok");
    loginStatus.classList.add("error");
  }
});

// --- DESCARGA INVITADOS ---
btnExportInvitados?.addEventListener("click", async () => {
  try {
    const url = `${SUPABASE_URL}/rest/v1/invitados_externos?select=*`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_ANON_KEY }
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    downloadCSV("invitados_externos.csv", data);
  } catch (err) {
    console.error("Error exportando invitados:", err);
    alert("Error al exportar invitados. Revisa la consola.");
  }
});

// --- DESCARGA CANJES ---
btnExportCanjes?.addEventListener("click", async () => {
  try {
    const url = `${SUPABASE_URL}/rest/v1/canjes?select=*`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_ANON_KEY }
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    downloadCSV("canjes.csv", data);
  } catch (err) {
    console.error("Error exportando canjes:", err);
    alert("Error al exportar canjes. Revisa la consola.");
  }
});

// --- MOSTRAR CLUBES ---
btnVerClubs?.addEventListener("click", async () => {
  clubManager.style.display = "block";
  loadClubs();
});

async function loadClubs() {
  try {
    const url = `${SUPABASE_URL}/rest/v1/convenios_clubes?select=*`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_ANON_KEY }
    });
    if (!res.ok) throw new Error(await res.text());
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
          <button class="btn btn-xs" onclick="toggleClub('${c.id_club}', ${c.activo})">
            ${c.activo ? "Desactivar" : "Activar"}
          </button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error cargando clubes:", err);
    alert("Error al cargar clubes. Revisa la consola.");
  }
}

// --- ACTIVAR / DESACTIVAR CLUB ---
async function toggleClub(id_club, current) {
  try {
    const url = `${SUPABASE_URL}/rest/v1/convenios_clubes?id_club=eq.${id_club}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ activo: !current })
    });
    if (!res.ok) throw new Error(await res.text());
    loadClubs();
  } catch (err) {
    console.error("Error actualizando club:", err);
    alert("Error al actualizar club. Revisa la consola.");
  }
}
