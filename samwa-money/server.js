// server.js
import express from 'express'
import { join } from 'path'

const app = express()

// dist 폴더 정적 서빙
app.use(express.static(join(__dirname, 'dist')))

// Vue 라우팅 처리 (history 모드 지원)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
