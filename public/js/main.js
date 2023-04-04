const socket = io.connect();

socket.on('productos', productos => {makeHtmlTable(productos)})

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({productos})
            document.getElementById('productos').innerHTML = html
        })
}

socket.on('mensajes', mensajes => {
    makeHtmlList(mensajes)
})

function makeHtmlList(mensajes) {
    const html = mensajes.map(item => {
        return (`<div> <strong>${item.author.id}</strong> <em>${item.text}</em></div>`)
    }).join(' ')

    document.getElementById('mensajes').innerHTML = html
}

const inputEmail = document.getElementById('inputEmail');
const inputNombre = document.getElementById('inputNombre');
const inputApellido = document.getElementById('inputApellido')
const inputEdad = document.getElementById('inputEdad')
const inputAlias = document.getElementById('inputAlias')
const inputAvatar = document.getElementById('inputAvatar')
const inputMensaje = document.getElementById('inputMensaje')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')

formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const message = {
        author: {id: inputEmail.value,
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        edad: inputEdad.value,
        alias: inputAlias.value,
        avatar: inputAlias.value},
        text: inputMensaje.value
    }

    socket.emit('message', message)
})