 // Función para obtener o inicializar el almacenamiento
 function obtenerNotas() {
    // Obtener datos de LocalStorage o inicializar array vacío
    const notasGuardadas = localStorage.getItem('notas');
    return notasGuardadas ? JSON.parse(notasGuardadas) : [];
}

// Función para guardar notas en LocalStorage
function guardarNotas(notas) {
    // Convertir a JSON y guardar
    localStorage.setItem('notas', JSON.stringify(notas));
}

// Función para mostrar notas en la tabla
function renderizarNotas() {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = ''; // Limpiar tabla
    
    const notas = obtenerNotas();
    
    // Generar filas de la tabla dinámicamente
    notas.forEach((nota, index) => {
        cuerpoTabla.innerHTML += `
            <tr>
                <td>${nota.titulo}</td>
                <td>${nota.descripcion}</td>
                <td>${nota.categoria}</td>
            </tr>
        `;
    });
}

// Función principal para agregar notas
function agregarNota() {
    // Obtener valores de los inputs
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    
    // Validar campos obligatorios
    if (!titulo || !descripcion) {
        document.getElementById('mensajeError').textContent = 'Error: Título y Descripción son obligatorios';
        return;
    }
    
    // Crear objeto nota
    const nuevaNota = {
        id: Date.now(), // ID único basado en timestamp
        titulo,
        descripcion,
        categoria,
        fecha: new Date().toLocaleString()
    };
    
    // Obtener y actualizar lista de notas
    const notas = obtenerNotas();
    notas.push(nuevaNota);
    guardarNotas(notas);
    
    // Actualizar vista y limpiar formulario
    renderizarNotas();
    document.getElementById('titulo').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('mensajeError').textContent = '';
}

// Cargar notas al iniciar la aplicación
document.addEventListener('DOMContentLoaded', renderizarNotas);