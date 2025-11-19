// admin/admin.js
const ADMIN_PASSWORD = "CCP-SISTEMAS-2025"; // cámbiala por la que deseen internamente

const formLoginAdmin = document.getElementById("formLoginAdmin");
const statusLogin = document.getElementById("statusLogin");
const sectionLogin = document.getElementById("sectionLogin");
const sectionPanel = document.getElementById("sectionPanel");
const statusAdmin = document.getElementById("statusAdmin");

const btnExcelInvitados = document.getElementById("btnExcelInvitados");
const btnExcelCanjes = document.getElementById("btnExcelCanjes");

formLoginAdmin?.addEventListener("submit", (e) => {
  e.preventDefault();
  const clave = new FormData(formLoginAdmin).get("clave");
  if (clave === ADMIN_PASSWORD) {
    sectionLogin.style.display = "none";
    sectionPanel.style.display = "block";
  } else {
    statusLogin.textContent = "Clave incorrecta.";
    statusLogin.classList.add("error");
  }
});

// Ejemplo sencillo: leer todo y generar CSV desde el navegador
btnExcelInvitados?.addEventListener("click", async () => {
  statusAdmin.textContent = "Descargando invitados…";
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/invitados_externos?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) {
      statusAdmin.textContent = "No hay registros de invitados.";
      return;
    }
    downloadCSV("invitados_externos.csv", data);
    statusAdmin.textContent = "Archivo de invitados generado.";
  } catch (e) {
    console.error(e);
    statusAdmin.textContent = "Error al obtener invitados.";
  }
});

btnExcelCanjes?.addEventListener("click", async () => {
  statusAdmin.textContent = "Descargando canjes…";
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/canjes?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) {
      statusAdmin.textContent = "No hay registros de canjes.";
      return;
    }
    downloadCSV("canjes.csv", data);
    statusAdmin.textContent = "Archivo de canjes generado.";
  } catch (e) {
    console.error(e);
    statusAdmin.textContent = "Error al obtener canjes.";
  }
});
