/* const http = require('http') */
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

/* const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end('Hola Mundo todo bien')
}) */
app.use((request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('--------AQUI-------------')
  next()
})

let notes = [
  {
    id: 1,
    content: 'Cssontenido nota 1',
    date: '2020-05-15T08:30:00'
  },
  {
    id: 2,
    content: 'Estoy haciendo el bootcamp de midudev',
    date: '2020-05-15T08:30:00'
  },
  {
    id: 3,
    content: 'Estoy haciendo el bootcamp de midudev ahora vamos a seguir aprendiendo',
    date: '2020-05-15T08:30:00'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hola Mundo</h1>')
})

app.get('/api/notes/', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
