const form = document.getElementById("financeForm");
const tableBody = document.querySelector("#financeTable tbody");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const concepto = document.getElementById("concepto").value;
  const monto = parseFloat(document.getElementById("monto").value.replace(",", ".")).toFixed(2);
  const tipo = document.getElementById("tipo").value;

  // Mostrar en la tabla
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${concepto}</td>
    <td>S/ ${monto}</td>
    <td>${tipo}</td>
    <td>
      <button onclick="editRow(this)">Editar</button>
      <button onclick="deleteRow(this)">Eliminar</button>
    </td>
  `;
  tableBody.appendChild(row);

  try {
  const response = await fetch("https://script.google.com/macros/s/AKfycbw7d9XqEXqKOpOqlque7UfmL1oB555cbQpRoCAIwlZwpmYT1wmIJsbSxIDgM6oI_PMJ/exec", {
    method: "POST",
    body: JSON.stringify({ concepto, monto, tipo }),
    headers: { "Content-Type": "application/json" }
  });

  console.log("Código de estado:", response.status); // 👈 muestra 200, 403, 404, etc.
  const text = await response.text();
  console.log("Respuesta del servidor:", text); // 👈 muestra el mensaje que devuelve tu Apps Script

  if (response.ok) {
    Swal.fire({
      icon: "success",
      title: "Registro guardado",
      text: "El registro se envió correctamente a Google Sheets.",
      confirmButtonColor: "#003399"
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo enviar el registro.",
      confirmButtonColor: "#dc3545"
    });
  }
  } catch (error) {
  console.error("Error en fetch:", error); // 👈 muestra detalles del error
  Swal.fire({
    icon: "error",
    title: "Error de conexión",
    text: "Verifica la URL del Web App o tu conexión a internet.",
    confirmButtonColor: "#dc3545"
  });
}
});
