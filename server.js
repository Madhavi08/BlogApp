const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const dburl='mongodb+srv://Madhavi:Madhavi@cluster0.5srzw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dburl, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
.then(()=>{ console.log("connected successfully")})
.catch(()=>{ console.log(" No connection")})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000,()=>{
  console.log("Server started")
})