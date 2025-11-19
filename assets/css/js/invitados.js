// assets/js/invitados.js
const formInvitado = document.getElementById("formInvitado");
const statusInvitado = document.getElementById("statusInvitado");
const fechaNacimientoInput = formInvitado?.elements["fecha_nacimiento"];
const edadInput = formInvitado?.elements["edad"];

function calcularEdad(fechaStr) {
  if (!fechaStr) return "";
  const hoy = new Date();
  const nacimiento = new Date(fechaStr);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad >= 0 ? edad : "";
}

fechaNacimientoInput?.addEventListener("change", () => {
  const edad = calcularEdad(fechaNacimientoInput.value);
  edadInput.value = edad || "";
});

formInvitado?.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusInvitado.textContent = "Guardando, por favor espera…";
  statusInvitado.classList.remove("ok", "error");

  const data = Object.fromEntries(new FormData(formInvitado).entries());
  const camposObligatorios = [
    "nombres","apellidos","tipo_documento","numero_documento",
    "ciudad_residencia","direccion","fecha_nacimiento","celular","correo"
  ];

  for (const c of camposObligatorios) {
    if (!data[c]) {
      statusInvitado.textContent = "Por favor completa todos los campos obligatorios.";
      statusInvitado.classList.add("error");
      return;
    }
  }

  // asegurar edad calculada
  data.edad = calcularEdad(data.fecha_nacimiento);

  try {
    await apiInsert("invitados_externos", data);
    statusInvitado.textContent = "Invitado registrado correctamente.";
    statusInvitado.classList.add("ok");
    formInvitado.reset();
    edadInput.value = "";
  } catch (err) {
    console.error(err);
    statusInvitado.textContent = "Error al guardar. Revisa la conexión o consulta a Sistemas.";
    statusInvitado.classList.add("error");
  }
});
