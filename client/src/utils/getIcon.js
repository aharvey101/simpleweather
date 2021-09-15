import axios from 'axios'

async function getIcon(type) {
  const local = 'http://localhost:8000'
  const url =
    process.env.NODE_ENV !== 'production'
      ? `${local}/static/img/weather/${type}.svg`
      : `/static/img/weather/${type}.svg`
  const image = await axios.get(url)
  console.log(image)
}
