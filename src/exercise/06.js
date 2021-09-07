// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import {check} from 'prettier'
import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

const STATUS = {
  idle: 'idle', //  no request made yet
  pending: 'pending', //  request started
  resolved: 'resolved', //  request successful
  rejected: 'rejected', //  request failed
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState({})
  // const [status, setStatus] = React.useState(() => STATUS.idle)

  const [state, setState] = React.useState({
    pokemon: null,
    error: {},
    status: STATUS.idle,
  })

  React.useEffect(() => {
    console.log('Current status', state.status)
  }, [state.status])
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  React.useEffect(() => {
    if (!Boolean(pokemonName)) {
      return
    }

    // setError({})
    // setPokemon(null)
    // setStatus(STATUS.pending)
    setState(prevState => ({
      ...prevState,
      error: {},
      pokemon: null,
      status: STATUS.pending,
    }))

    fetchPokemon(pokemonName)
      .then(pokemonData => {
        // setStatus(STATUS.resolved)
        // setPokemon(pokemonData)
        setState(prevState => ({
          ...prevState,
          pokemon: pokemonData,
          status: STATUS.resolved,
        }))
      })
      .catch(error => {
        // setError(error)
        // setStatus(STATUS.rejected)
        setState(prevState => ({
          ...prevState,
          status: STATUS.rejected,
          error,
        }))
      })
  }, [pokemonName])

  if (state.error.message) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  }

  if (!Boolean(pokemonName)) {
    return 'Submit a pokemon'
  }
  if (!state.pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  }

  return <PokemonDataView pokemon={state.pokemon} />
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
