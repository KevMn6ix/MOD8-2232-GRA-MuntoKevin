import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import helmet from 'helmet'
import { randomUUID } from 'crypto'
import filmService from './services/film-services.js'
const app = express()

app.use((req, res, next) =>{
    req.id = randomUUID()
    next()
})

app.use((req, res, next) => {
    const id = req.id
    console.log(`Request: ${id}`);
    next()
})

// Express JSON-parsing middleware
app.use(logger('dev'))
app.use(helmet())
app.use(express.json())

const clientBuildPath = join(dirname(fileURLToPath(import.meta.url)), '../client/dist')
app.use(express.static(clientBuildPath));



app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: "Healthy" })
})

app.get('/api/v1/films', (req, res) => {
    const films = filmService.findFilms()
    res.status(200).json({ films })
})

app.get('/api/v1/films/:id', (req, res, next) => {
    throw new Error('INTERNAL SERVER ERROR')

    const id = Number.parseInt(req.params.id)

    if(!Number.isInteger(id)) {
        const err = new Error(`Invalid film id '${req.params.id}'.`)
        err.status = 400
        return next(err)
        
    }

    const film = filmService.findFilm(id)

    if(film){
        res.status(200).json({ film })
    } else {
        res.sendStatus(404)
    }

    
})

app.post('/api/v1/films', (req, res, next) => {
    const title =  req.body.title
    const director = req.body.director
    const year = req.body.year
    const duration = req.body.duration
    const description = req.body.description

    const film = filmService.createFilm(title, director, year, duration, description);
    res.status(201).json({ film })
})

app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status ?? 500
    const message = status >= 500 ? 'Something went wrong ...' : err.message
    res.status(status).json({ id : req.id ,  error : { message }})
})


// Start listening
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})