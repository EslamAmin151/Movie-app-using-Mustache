const express = require('express')
const mustacheExpress = require('mustache-express')
const  bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

let movies = [{title: "Deadpool 2", description: "Good", genre: "Comedy",postURL: "http://oyster.ignimgs.com/wordpress/stg.ign.com/2018/03/Deadpool-2-International-Poster.jpg"}]

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')




app.get('/',function(req,res){
  res.render('index', {movies : movies})
})

app.post('/add-movies', (req, res)=> {
  let title = req.body.title
  let descripton = req.body.descripton
  let genre = req.body.genre
  let postURL = req.body.postURL

  let newMovie = {title: title, descripton:descripton, genre:genre, postURL:postURL}
  movies.push(newMovie)
  res.render('index', {movies:movies})
})


app.get('/movies/:title/:description/:genre/:postURL',function(req,res){
  res.send("Movie name is " + req.params.title + " and descripton is " + req.params.description + "genre is" + req.params.genre + "and Website is" + req.params.postURL)
})


app.post('/delete-trip',function(req,res){

    let title = req.body.title
    console.log(title)

    movies = movies.filter(function(movie){
      return movie.title != title
    })

    res.redirect('/')
  })

app.listen(port,function(){
console.log("server is running")
})
