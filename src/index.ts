import express from 'express'
const app = express()
const PORT = 3000

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
    courses: [
        {id: 1, title: "front"},
        {id: 2, title: "back"},
        {id: 3, title: "design"},
        {id: 4, title: "devops"},
    ]
}

app.get('/', (req, res) => {
    res.json('ok')
})

app.get('/courses', (req, res) => {
   let foundedCourses = db.courses;

        if(req.query.title) {
            foundedCourses = foundedCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
        }

    res.json(foundedCourses)
})

app.get('/courses/:id', (req, res) => {
    const foundedCourse = db.courses.find(corses => corses.id === +req.params.id)

    if(!foundedCourse) {
        res.sendStatus(404)
        return
    }

    res.json(foundedCourse)
})

app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(corses => corses.id !== +req.params.id)

    res.sendStatus(204)
})

app.post('/courses', (req, res) => {
    if(!req.body.title) {
        res.sendStatus(401)
        return
    }


    const createCourse = {
        id: +(new Date()),
        title: req.body.title,
    }
    db.courses.push(createCourse)
    res.status(201)
    res.json(createCourse)
})

app.put('/courses/:id', (req, res) => {
    if(!req.body.title) {
        res.sendStatus(400)
        return
    }
    const foundedCourse = db.courses.find(corses => corses.id !== +req.params.id)

    if(!foundedCourse) {
        res.sendStatus(404)
        return
    }

    foundedCourse.title = req.body.title

    res.sendStatus(204)
})

app.listen(PORT, () => {
    console.log('Server has been started on PORT: ' + PORT)
})