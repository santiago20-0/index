document.addEventListener("DOMContentLoaded", () => {
    actualizarTabla();
});

const registroForm = document.getElementById("registroForm");
const registroTableBody = document.getElementById("registroTableBody");
let registros = JSON.parse(localStorage.getItem("registros")) || [];
let editId = null;

registroForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const duracion = document.getElementById("duracion").value.trim();
    const fecha_inicio = document.getElementById("fecha_inicio").value;
    const fecha_final = document.getElementById("fecha_final").value;
    const descripcion = document.getElementById("descripcion").value.trim();

    if (!nombre || !duracion || !fecha_inicio || !fecha_final || !descripcion) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (editId !== null) {
        const index = registros.findIndex(registro => registro.id === editId);
        registros[index] = { id: editId, nombre, duracion, fecha_inicio, fecha_final, descripcion };
        editId = null;
    } else {
        const newId = registros.length ? registros[registros.length - 1].id + 1 : 1;
        registros.push({ id: newId, nombre, duracion, fecha_inicio, fecha_final, descripcion });
    }
    
    localStorage.setItem("registros", JSON.stringify(registros));
    registroForm.reset();
    actualizarTabla();
});

function actualizarTabla() {
    registroTableBody.innerHTML = "";
    registros.forEach((registro) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${registro.id}</td>
            <td>${registro.nombre}</td>
            <td>${registro.duracion}</td>
            <td>${registro.fecha_inicio}</td>
            <td>${registro.fecha_final}</td>
            <td>${registro.descripcion}</td>
            <td>
                <button onclick="editarRegistro(${registro.id})">Editar</button>
                <button onclick="borrarRegistro(${registro.id})">Borrar</button>
            </td>
        `;
        registroTableBody.appendChild(tr);
    });
}

function editarRegistro(id) {
    const registro = registros.find(registro => registro.id === id);
    if (!registro) return;
    document.getElementById("nombre").value = registro.nombre;
    document.getElementById("duracion").value = registro.duracion;
    document.getElementById("fecha_inicio").value = registro.fecha_inicio;
    document.getElementById("fecha_final").value = registro.fecha_final;
    document.getElementById("descripcion").value = registro.descripcion;
    editId = id;
}

function borrarRegistro(id) {
    registros = registros.filter(registro => registro.id !== id);
    localStorage.setItem("registros", JSON.stringify(registros));
    actualizarTabla();
}
