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

        <CardText>Min Temp: {Math.round(content.min_temp)}</CardText>
        <CardText>Max Temp: {Math.round(content.max_temp)}</CardText>
      </CardBody>
    </Card>
  )
}
