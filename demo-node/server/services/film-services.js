let id = 1;
const films = [
    {
        id: id++,
        title: 'Film 1',
        director: 'Director 1',
        year: 2000,
        duration: 120,
        description: 'Description 1'
    },
    {
        id: id++,
        title: 'Film 2',
        director: 'Director 1',
        year: 2010,
        duration: 150,
        description: 'Description 2'
    },
    {
        id: id++,
        title: 'Film 3',
        director: 'Director 1',
        year: 2120,
        duration: 100,
        description: 'Description 3'
    },
]

function findFilms(){
    return films
}

function findFilm(id) {
    if(!Number.isInteger(id)) {
        throw new Error(`Invalid film Id ${id}`)
    }

    for (const film of films) {
        if (film.id === id) {
            return film
        }
    }
    return null
}

function createFilm(title, director, year, duration, description){
    
    const film = {
        id : id++,
        title,
        director,
        year, 
        duration, 
        description
    }
    films.push(film)
    return films
}

const service = {
    findFilm,
    findFilms,
    createFilm
}

export default service
