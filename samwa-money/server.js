// server.js
const express = require('express')
const path = require('path')
const jsonServer = require('json-server')

const app = express()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 3000

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'dist')))

// API 라우팅
app.use('/api', middlewares, router)

// SPA 대응 (history mode 대응)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
