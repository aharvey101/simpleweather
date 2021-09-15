import React from 'react'
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

export default function WeatherCard({ content }) {
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const day = new Date(content.applicable_date)
  const dayOfWeek = days[day.getDay()]
  return (
    <Card className="m-2">
      <CardBody>
        <CardTitle tag="h5">{dayOfWeek}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {content.weather_state_name}
        </CardSubtitle>
        <img
          alt="weather-icon"
          src={`https://www.metaweather.com/static/img/weather/${content.weather_state_abbr}.svg`}
        ></img>
        <CardText>Max Temp: {Math.round(content.max_temp)}°</CardText>
        <CardText>Min Temp: {Math.round(content.min_temp)}°</CardText>
        <CardText>
          Wind: {content.wind_direction_compass}{' '}
          {Math.round(content.wind_speed)} mph
        </CardText>
      </CardBody>
    </Card>
  )
}
