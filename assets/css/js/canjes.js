// assets/js/canjes.js

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

let clubSeleccionado = null;

// Validación de ID de club
formValidaClub?.addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = new FormData(formValidaClub).get("id_club");
  const idClub = (raw || "").toString().trim().toUpperCase();

  console.log("ID de club ingresado:", raw, "→ normalizado:", idClub);

  const club = CLUBES_CONVENIOS[idClub];
  if (!club) {
    statusClub.textContent = "ID de club no reconocido. Prueba con: ARM-CC, BQA-CC, BGT-ARRAY, BGT-CC, MDL-CC, PNA-GOLF, SANT-RUITOQUE.";
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

  // sugerir ciudad del club en el formulario
  if (formCanje?.elements["ciudad_club"]) {
    formCanje.elements["ciudad_club"].value = club.ciudad;
  }
});

// Cálculo de periodo de canje
formCanje?.elements["fecha_inicio_canje"]?.addEventListener("change", (e) => {
  if (!clubSeleccionado) return;
  const dias = clubSeleccionado.dias_canje;
  const inicioStr = e.target.value;
  if (!inicioStr) return;

  const inicio = new Date(inicioStr);
  if (Number.isNaN(inicio.getTime())) return;

  const fin = new Date(inicio);
  fin.setDate(fin.getDate() + dias - 1);

  const yyyy = fin.getFullYear();
  const mm = String(fin.getMonth() + 1).padStart(2, "0");
  const dd = String(fin.getDate()).padStart(2, "0");
  if (formCanje?.elements["fecha_fin_canje"]) {
    formCanje.elements["fecha_fin_canje"].value = `${yyyy}-${mm}-${dd}`;
  }
  if (infoPeriodo) {
    infoPeriodo.textContent = `Período de canje: ${dias} día(s). Fin automático: ${dd}/${mm}/${yyyy}.`;
  }
});

// Envío del formulario de canje
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
      infoPeriodo.textContent = "El sistema calculará el período según el convenio del club.";
    }
  } catch (err) {
    console.error("Error al guardar canje:", err);
    statusCanje.textContent = "Error al guardar el canje: " + (err.message || "revisa la consola (F12).");
    statusCanje.classList.add("error");
  }
});
