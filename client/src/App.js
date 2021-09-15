import axios from 'axios'
import React from 'react'

import { useState } from 'react'
import {
  Button,
  Container,
  Input,
  Label,
  Form,
  FormGroup,
  CardGroup,
  Spinner,
} from 'reactstrap'
import WeatherCard from './Components/Card/WeatherCard'

function App() {
  const [searchInput, setSearchInput] = useState('Melbourne')
  const [city, setCity] = useState()
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState([])
  const [searchError, setSearchError] = useState(false)

  const handleSearch = (location) => {
    if (!location) {
      return
    }
    setSearchError(false)
    setLoading(true)

    const url = `/api/location/search/${location}`
    axios.get(url).then(async (res) => {
      if (res.data.length) {
        const woeid = res.data[0].woeid
        const locationRes = await axios.get(`/api/location/${woeid}`)
        const consolidatedWeather = locationRes.data.consolidated_weather
        setWeather(consolidatedWeather)
        setCity(res.data[0].title)
        setLoading(false)
      } else {
        setSearchError(true)
      }
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  return (
    <main>
      <Container>
        <Form>
          <FormGroup className="m-3">
            {city ? <h1>{city}</h1> : <h1>Search For Your City's Weather</h1>}

            <Label for="city">City</Label>
            <Input
              onChange={(e) => handleUpdate(e)}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault()
                  handleSearch(searchInput)
                }
              }}
              type="text"
              id="city"
              placeholder="Your City"
            />
          </FormGroup>
          <FormGroup className="m-3">
            <Button
              color="primary"
              onClick={() => {
                handleSearch(searchInput)
              }}
            >
              Search
            </Button>
          </FormGroup>
          <FormGroup className="m-2">
            <CardGroup>
              {!loading && !searchError ? (
                weather.map((day) => {
                  return <WeatherCard key={day.id} content={day} />
                })
              ) : searchError ? (
                <p>No Results Found</p>
              ) : loading ? (
                <Spinner color="primary" children=""></Spinner>
              ) : (
                ''
              )}
            </CardGroup>
          </FormGroup>
        </Form>
      </Container>
    </main>
  )
}

export default App
