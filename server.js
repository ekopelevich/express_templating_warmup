const express = require('express')
const app = express()
const port = 8000

const pokemons = require('./pokemon_list')

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/pokemon', (req, res) => {
  res.render('index', {data: pokemons})
})

app.get('/pokemon/:id', (req, res) => {
  var ancestorId
  var pokemon = findById(parseInt(req.params.id))
  var ancestor = findAncestorByName(pokemon.evolves_from)
  if (pokemon.evolves_from == 'egg') ancestorId = ''
  else ancestorId = ancestor.id
  res.render('profile', {pokemon: pokemon, ancestorId: ancestorId})
})

app.listen(port, ()=> {
  console.log(`Listening on port: ${port}`)
})

function findById(id){
  return pokemons.filter(pokemon => pokemon.id == id)[0]
}

function findAncestorByName(name){
  return pokemons.filter(pokemon => pokemon.name == name)[0]
}
