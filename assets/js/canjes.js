// assets/js/canjes.js

console.log("canjes.js cargado");

/*
  Nomenclaturas usadas (puedes ajustarlas si lo deseas):

  ARM-CC         Armenia: Club Campestre
  BQA-CC         Barranquilla: Country Club
  BQA-LC         Barranquilla: Lagos del Caujaral

  BGT-ARRAY      Bogotá: Arrayanes
  BGT-CC         Bogotá: Country Club
  BGT-GUAY       Bogotá: Guaymaral
  BGT-HATO       Bogotá: Hato Grande
  BGT-POTOSI     Bogotá: La Pradera de Potosí
  BGT-SABANA     Bogotá: La Sabana
  BGT-LAGARTOS   Bogotá: Los Lagartos
  BGT-MILITAR    Bogotá: Militar de Golf
  BGT-PVIEJO     Bogotá: Pueblo Viejo
  BGT-RANCHO     Bogotá: Rancho
  BGT-RINCON     Bogotá: Rincón de Cajicá
  BGT-SANDRES    Bogotá: San Andres Golf
  BGT-SERRE      Bogotá: Serrezuela

  BUC-CC         Bucaramanga: Campestre

  CAL-CC         Cali: Club Campestre
  CAL-FARALLONES Cali: Farallones
  CAL-SHALOM     Cali: Shalom

  CTG-CC         Cartagena: Campestre

  CUC-TENIS      Cúcuta: Tenis Golf Club

  GIR-PENALISA   Girardot: Club Puerto Peñalisa
  GIR-PENON      Girardot: Condominio El Peñón

  IBG-CC         Ibagué: Club Campestre
  MZL-CC         Manizales: Club Campestre

  MDL-CC         Medellín: Club Campestre
  MDL-EJEC       Medellín: Ejecutivos Country Club
  MDL-LLANO      Medellín: Llano Grande
  MDL-RODEO      Medellín: Rodeo

  MTR-CC         Montería: Club Campestre
  MTR-JARAGUAY   Montería: Jaraguay Golf

  NVA-CC         Neiva: Club Campestre

  PNA-GOLF       Panamá: Club de Golf
  PNA-SUMMIT     Panamá: Summit Golf Club

  PAY-CC         Payandé
  POP-CC         Popayán: Club Campestre

  SANT-RUITOQUE  Santander: Ruitoque
*/

// Días de canje: valor sugerido (puedes cambiar de ser necesario)
const CLUBES_CONVENIOS = {
  "ARM-CC":        { nombre_club: "Armenia: Club Campestre", ciudad: "Armenia", dias_canje: 15 },

  "BQA-CC":        { nombre_club: "Barranquilla: Country Club", ciudad: "Barranquilla", dias_canje: 10 },
  "BQA-LC":        { nombre_club: "Barranquilla: Lagos del Caujaral", ciudad: "Barranquilla", dias_canje: 7 },

  "BGT-ARRAY":     { nombre_club: "Bogotá: Arrayanes", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-CC":        { nombre_club: "Bogotá: Country Club", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-GUAY":      { nombre_club: "Bogotá: Guaymaral", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-HATO":      { nombre_club: "Bogotá: Hato Grande", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-POTOSI":    { nombre_club: "Bogotá: La Pradera de Potosí", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-SABANA":    { nombre_club: "Bogotá: La Sabana", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-LAGARTOS":  { nombre_club: "Bogotá: Los Lagartos", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-MILITAR":   { nombre_club: "Bogotá: Militar de Golf", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-PVIEJO":    { nombre_club: "Bogotá: Pueblo Viejo", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-RANCHO":    { nombre_club: "Bogotá: Rancho", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-RINCON":    { nombre_club: "Bogotá: Rincón de Cajicá", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-SANDRES":   { nombre_club: "Bogotá: San Andres Golf", ciudad: "Bogotá", dias_canje: 7 },
  "BGT-SERRE":     { nombre_club: "Bogotá: Serrezuela", ciudad: "Bogotá", dias_canje: 7 },

  "BUC-CC":        { nombre_club: "Bucaramanga: Campestre", ciudad: "Bucaramanga", dias_canje: 7 },

  "CAL-CC":        { nombre_club: "Cali: Club Campestre", ciudad: "Cali", dias_canje: 10 },
  "CAL-FARALLONES": { nombre_club: "Cali: Farallones", ciudad: "Cali", dias_canje: 7 },
  "CAL-SHALOM":    { nombre_club: "Cali: Shalom", ciudad: "Cali", dias_canje: 7 },

  "CTG-CC":        { nombre_club: "Cartagena: Campestre", ciudad: "Cartagena", dias_canje: 7 },

  "CUC-TENIS":     { nombre_club: "Cúcuta: Tenis Golf Club", ciudad: "Cúcuta", dias_canje: 7 },

  "GIR-PENALISA":  { nombre_club: "Girardot: Club Puerto Peñalisa", ciudad: "Girardot", dias_canje: 7 },
  "GIR-PENON":     { nombre_club: "Girardot: Condominio El Peñón", ciudad: "Girardot", dias_canje: 7 },

  "IBG-CC":        { nombre_club: "Ibagué: Club Campestre", ciudad: "Ibagué", dias_canje: 7 },
  "MZL-CC":        { nombre_club: "Manizales: Club Campestre", ciudad: "Manizales", dias_canje: 7 },

  "MDL-CC":        { nombre_club: "Medellín: Club Campestre", ciudad: "Medellín", dias_canje: 10 },
  "MDL-EJEC":      { nombre_club: "Medellín: Ejecutivos Country Club", ciudad: "Medellín", dias_canje: 7 },
  "MDL-LLANO":     { nombre_club: "Medellín: Llano Grande", ciudad: "Medellín", dias_canje: 7 },
  "MDL-RODEO":     { nombre_club: "Medellín: Rodeo", ciudad: "Medellín", dias_canje: 7 },

  "MTR-CC":        { nombre_club: "Montería: Club Campestre", ciudad: "Montería", dias_canje: 7 },
  "MTR-JARAGUAY":  { nombre_club: "Montería: Jaraguay Golf", ciudad: "Montería", dias_canje: 7 },

  "NVA-CC":        { nombre_club: "Neiva: Club Campestre", ciudad: "Neiva", dias_canje: 7 },

  "PNA-GOLF":      { nombre_club: "Panamá: Club de Golf", ciudad: "Panamá", dias_canje: 7 },
  "PNA-SUMMIT":    { nombre_club: "Panamá: Summit Golf Club", ciudad: "Panamá", dias_canje: 7 },

  "PAY-CC":        { nombre_club: "Payandé: Club Campestre", ciudad: "Payandé", dias_canje: 7 },
  "POP-CC":        { nombre_club: "Popayán: Club Campestre", ciudad: "Popayán", dias_canje: 7 },

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

// --- Validación de ID de club ---
formValidaClub?.addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = new FormData(formValidaClub).get("id_club");
  const idClub = (raw || "").toString().trim().toUpperCase();

  console.log("ID de club ingresado:", raw, "→ normalizado:", idClub);

  const club = CLUBES_CONVENIOS[idClub];

  if (!club) {
    statusClub.textContent =
      "ID de club no reconocido. Verifica la nomenclatura o el convenio.";
    statusClub.classList.add("error");
    sectionCanje.style.display = "none";
    clubSeleccionado = null;
    return;
  }

  clubSeleccionado = { id_club: idClub, ...club };
  statusClub.textContent = "Club validado. Formulario de canje habilitado.";
  statusClub.classList.remove("error");
  statusClub.classList.add("ok");
  tagClub.textContent =
    `${club.nombre_club} · ${club.ciudad} · ${club.dias_canje} días de canje`;
  sectionCanje.style.display = "block";

  if (formCanje?.elements["ciudad_club"]) {
    formCanje.elements["ciudad_club"].value = club.ciudad;
  }
});

// --- Cálculo del período de canje ---
function calcularPeriodo() {
  if (!clubSeleccionado || !formCanje) return;

  const dias = Number(clubSeleccionado.dias_canje) || 0;
  const inicioStr = formCanje.elements["fecha_inicio_canje"].value;
  if (!inicioStr) return;

  const inicio = new Date(inicioStr);
  if (Number.isNaN(inicio.getTime())) {
    console.warn("Fecha inicio inválida:", inicioStr);
    return;
  }

  const fin = new Date(inicio);
  fin.setDate(fin.getDate() + dias - 1);

  const finISO = fin.toISOString().slice(0, 10); // yyyy-MM-dd

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

formCanje?.elements["fecha_inicio_canje"]?.addEventListener("change", calcularPeriodo);
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

  // datos adicionales para guardar
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
