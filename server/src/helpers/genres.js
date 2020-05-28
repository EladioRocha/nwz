const GENRES = ["Arte", "Astrología", "Autoayuda", "Autobiográfico", "Aventuras", "Biografía", "Bélico", "Ciencia", "Ciencia ficción", "Ciencias exactas", "Ciencias naturales", "Ciencias sociales", "Cine", "Clásico", "Comunicación", "Costumbrista", "Crítica", "Crítica y teoría literaria", "Crónica", "Cuentos", "Cultura", "Deportes", "Deportes y juegos", "Diccionarios y enciclopedias", "Didáctico", "Distopía", "Divulgación", "Divulgación científica", "Drama", "Economía", "Ensayo", "Erótico", "Esoterismo", "Espionaje", "Espiritualidad", "Fantasía", "Fantástico", "Ficción", "Filosofía", "Filosófico", "Física", "Guion", "Historia", "Histórico", "Hogar", "Humor", "Idiomas", "Infantil", "Infantil y juvenil", "Interactivo", "Intriga", "Juvenil", "Magia", "Manuales y cursos", "Medieval", "Memorias", "Misterio", "Mitos", "Nazis", "Negocios", "No Ficción", "Novela", "Novela Negra", "Novela del Oeste", "Otros", "Padres e hijos", "Periodismo", "Poesía", "Policíaco", "Política", "Psicología", "Psicológico", "Publicaciónes periódicas", "Realista", "Recetas de cocina", "Recopilación", "Referencia", "Relato", "Religión", "Romántico", "Salud y Bienestar", "Sexualidad", "Sociología", "Sátira", "Teatro", "Tecnología", "Terror", "Terrorismo", "Thriller", "Viajes"]
const MONGO_URI_DEV = 'mongodb://localhost:27017/nwz'

const path = require('path'),
    mongoose = require('mongoose'),
    Genre = require(path.join(__dirname, '..', 'models', 'Genres'));

mongoose.connect(MONGO_URI_DEV);

async function main() {
    for(let genre of GENRES) {
        await Genre.create({
            name: genre
        })
    }
}

main()
