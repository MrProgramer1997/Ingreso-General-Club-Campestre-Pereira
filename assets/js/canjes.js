// assets/js/canjes.js

console.log("canjes.js cargado");

// Config de clubes (ejemplo). Ajusta id_club y dias_canje con tus datos reales.
const CLUBES_CONVENIOS = {
  "ARM-CC":        { nombre_club: "Armenia: Club Campestre", ciudad: "Armenia", dias_canje: 15 },
  "BQA-CC":        { nombre_club: "Barranquilla: Country Club", ciudad: "Barranquilla", dias_canje: 10 },
  "BGT-ARRAY":     { nombre_club: "Bogotá: Arrayanes", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-CC":        { nombre_club: "Bogotá: Country Club", ciudad: "Bogotá", dias_canje: 7 },
  "MDL-CC":        { nombre_club: "Medellín: Club Campestre", ciudad: "Medellín", dias_canje: 10 },
  "PNA-GOLF":      { nombre_club: "Panamá: Club de Golf", ciudad: "Panamá", dias_canje: 7 },
  "SANT-RUITOQUE": { nombre_club: "Santander: Ruitoque", ciudad: "Santander", dias_canje: 10 }
};

const formValidaClub = document.getElementById("formValidaClub");
const statusClub = document.getElementById("statusClub");
const sectionCanje = document.getElementById("sectionCanje");
const tagClub = document.getElementById("tagClub");

const formCanje = document.getElementById("formCanje");
const statusCanje = document.getElementById("statusCanje");
const infoPeriodo = document.getElementById("infoPeriodo");
const btnCalcularPeriodo = document.getElementById("btnCalcularPeriodo");

let clubSeleccionado = null;

// Validación de ID de club
formValidaClub?.addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = new FormData(formValidaClub).get("id_club");
  const idClub = (raw || "").toString().trim().toUpperCase();

  console.log("ID de club ingresado:", raw, "→ normalizado:", idClub);

  const club = CLUBES_CONVENIOS[idClub];
  if (!club) {
    statusClub.textContent =
      "ID de club no reconocido. Prueba con: ARM-CC, BQA-CC, BGT-ARRAY, BGT-CC, MDL-CC, PNA-GOLF, SANT-RUITOQUE.";
    statusClub.classList.add("error");
    sectionCanje.style.display = "none";
    clubSeleccionado = null;
    return;
  }

  clubSeleccionado = { id_club: idClub, ...club };
  statusClub.textContent = "Club validado. Formulario de canje habilitado.";
  statusClub.classList.remove("error");
  statusClub.classList.add("ok");
  tagClub.textContent = `${club.nombre_club} · ${club.ciudad} · ${club.dias_canje} días de canje`;
  sectionCanje.style.display = "block";

  if (formCanje?.elements["ciudad_club"]) {
    formCanje.elements["ciudad_club"].value = club.ciudad;
  }
});

// --- Cálculo del período de canje, usando toISOString() ---
function calcularPeriodo() {
  if (!clubSeleccionado || !formCanje) return;

  const dias = Number(clubSeleccionado.dias_canje) || 0;
  const inicioStr = formCanje.elements["fecha_inicio_canje"].value;

  if (!inicioStr) return;

  // inicioStr de un <input type="date"> SIEMPRE viene como "yyyy-MM-dd"
  const inicio = new Date(inicioStr);
  if (Number.isNaN(inicio.getTime())) {
    console.warn("Fecha inicio inválida:", inicioStr);
    return;
  }

  const fin = new Date(inicio);
  fin.setDate(fin.getDate() + dias - 1);

  // Formato seguro para <input type="date">
  const finISO = fin.toISOString().slice(0, 10); // yyyy-MM-dd

  console.log("Período calculado:", { inicio: inicioStr, dias, finISO });

  const finInput = formCanje.elements["fecha_fin_canje"];
  if (finInput) {
    finInput.value = finISO;
  }

  if (infoPeriodo) {
    const [yyyy, mm, dd] = finISO.split("-");
    infoPeriodo.textContent =
      `Período de canje: ${dias} día(s). Fin automático: ${dd}/${mm}/${yyyy}.`;
  }
}

// Calcular al cambiar la fecha
formCanje?.elements["fecha_inicio_canje"]?.addEventListener("change", calcularPeriodo);

// Calcular al pulsar el botón
btnCalcularPeriodo?.addEventListener("click", calcularPeriodo);

// --- Envío del formulario de canje ---
formCanje?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!clubSeleccionado) {
    statusCanje.textContent = "Primero debes validar el ID del club emisor.";
    statusCanje.classList.add("error");
    return;
  }

  const data = Object.fromEntries(new FormData(formCanje).entries());
  const camposObligatorios = [
    "pais_club","ciudad_club","numero_accion","nombres_titular",
    "tipo_documento","numero_documento","celular",
    "vienen_beneficiarios","grupo_reside_misma_ciudad",
    "info_diligencia_nombre","info_diligencia_cargo",
    "info_diligencia_contacto","info_diligencia_correo",
    "fecha_inicio_canje"
  ];

  for (const c of camposObligatorios) {
    if (!data[c]) {
      statusCanje.textContent = "Completa todos los campos obligatorios.";
      statusCanje.classList.add("error");
      return;
    }
  }

  // Conversiones básicas
  data.id_club = clubSeleccionado.id_club;
  data.nombre_club = clubSeleccionado.nombre_club;
  data.dias_canje = clubSeleccionado.dias_canje;
  data.vienen_beneficiarios = data.vienen_beneficiarios === "true";
  data.grupo_reside_misma_ciudad = data.grupo_reside_misma_ciudad === "true";

  statusCanje.textContent = "Guardando registro de canje…";
  statusCanje.classList.remove("ok","error");

  try {
    const res = await apiInsert("canjes", data);
    console.log("Insert canjes OK:", res);
    statusCanje.textContent = "Canje registrado correctamente.";
    statusCanje.classList.add("ok");
    formCanje.reset();
    if (infoPeriodo) {
      infoPeriodo.textContent =
        "Pulsa “Calcular período” o cambia la fecha de inicio.";
    }
  } catch (err) {
    console.error("Error al guardar canje:", err);
    statusCanje.textContent =
      "Error al guardar el canje: " + (err.message || "revisa la consola (F12).");
    statusCanje.classList.add("error");
  }
});
