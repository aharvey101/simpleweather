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
  const [location, setLocation] = useState('Melbourne')
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState([])
  const [searchError, setSearchError] = useState(false)

  const handleSearch = async (location) => {
    if (!location) {
      return
    }

    setLoading(true)
    const local = 'http://localhost:8000'
    const url =
      process.env.NODE_ENV !== 'production'
        ? `${local}/api/location/search/${location}`
        : `/api/location/search/${location}`
    await axios.get(url).then(async (res) => {
      setLocation(res.data.title)
      if (res.data.length) {
        const woeid = res.data[0].woeid
        const locationRes = await axios.get(`${local}/api/location/${woeid}`)
        const consolidatedWeather = locationRes.data.consolidated_weather
        setWeather(consolidatedWeather)
        setLoading(false)
        console.log('done')
      } else {
        setSearchError(true)
      }
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setLocation(e.target.value)
  }

  console.log(location)

  return (
    <main>
      <Container>
        <Form>
          <FormGroup className="m-3">
            <h1>Find Weather For Your City</h1>
            <Label for="city">City</Label>
            <Input
              onChange={(e) => handleUpdate(e)}
              // onKeyDown={(e) => handleSearch(location, e)}
              type="text"
              id="city"
              placeholder="Your City"
            />
          </FormGroup>
          <FormGroup className="m-3">
            <Button
              color="primary"
              onClick={() => {
                handleSearch(location)
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
