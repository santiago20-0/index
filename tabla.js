document.addEventListener("DOMContentLoaded", () => {
    cargarTabla();
});

function cargarTabla() {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const tbody = document.getElementById("tablaRegistrosBody");
    tbody.innerHTML = "";
    
    registros.forEach(registro => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${registro.id}</td>
            <td>${registro.nombre}</td>
            <td>${registro.duracion}</td>
            <td>${registro.fecha_inicio}</td>
            <td>${registro.fecha_final}</td>
            <td>${registro.descripcion}</td>
            <td>
                <button onclick="editarRegistro(${registro.id})">Editar</button>
                <button onclick="eliminarRegistro(${registro.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editarRegistro(id) {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const registro = registros.find(r => r.id === id);
    if (!registro) return;
    
    document.getElementById("nombre").value = registro.nombre;
    document.getElementById("duracion").value = registro.duracion;
    document.getElementById("fecha_inicio").value = registro.fecha_inicio;
    document.getElementById("fecha_final").value = registro.fecha_final;
    document.getElementById("descripcion").value = registro.descripcion;
    
    eliminarRegistro(id);
}

function eliminarRegistro(id) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros = registros.filter(registro => registro.id !== id);
    localStorage.setItem("registros", JSON.stringify(registros));
    cargarTabla();
}
