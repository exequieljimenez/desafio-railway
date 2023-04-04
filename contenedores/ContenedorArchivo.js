const {normalize, schema, denormalize} = require('normalizr');
const fs = require('fs')

class ContenedorArchivo {
    constructor(path) {
        this.mensajes = []
        this.path = path
    }

    agregarMensaje(objeto) {
        const read = fs.readFileSync(this.path)
        const data = JSON.parse(read)

        const autor = new schema.Entity('autores');

        const message = new schema.Entity('messages', {
            author: autor
        })

        const mensajes = new schema.Entity('mensajes', {
            mensajes: [message]
        }, { idAttribute: 'IdMensajes' })
        
        const denormalizeData = denormalize(data.result, mensajes, data.entities)

        let id = denormalizeData.mensajes.length + 1
        id = id.toString()
        const mensaje = {id: id, ...objeto}
        denormalizeData.mensajes.push(mensaje)
        
        const normalizeData = normalize(denormalizeData, mensajes);
        fs.writeFileSync(this.path, JSON.stringify(normalizeData))
    }

    listarAll() {
        const read = fs.readFileSync(this.path, 'utf-8')
        const dataNormalizada = JSON.parse(read)
        const autor = new schema.Entity('autores');

        const message = new schema.Entity('messages', {
            author: autor
        })

        const mensajes = new schema.Entity('mensajes', {
            mensajes: [message]
        }, { idAttribute: 'IdMensajes' })

        const denormalizeData = denormalize(dataNormalizada.result, mensajes, dataNormalizada.entities)

        return denormalizeData.mensajes
    }

}

module.exports = ContenedorArchivo