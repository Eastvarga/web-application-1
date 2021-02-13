const express = require('express');
//Loads the handlebars module
const exhbs = require('express-handlebars');

const products = require('./products.json');

const PORT = process.env.PORT || 4444;

const app = express();

app.use(express.static('public'));
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations
app.engine(
  'hbs',
  exhbs({
    extname: 'hbs',
    // layoutsDir: __dirname + '/views/layouts',
  }),
);

// http://localhost:4444/
app.get('/', (req, res) => {
  //   console.log(' this is callback for app.get(" / ")');
  //   console.log(req.url);
  //   res.send({ name: 'Alexander' });
  res.render('home', { pageTitle: 'Application server Main page' });
});

// http://localhost:4444/about
app.get('/about', (req, res) => {
  //   console.log('this is callback for app.get("/about")');
  //   console.log(req.url);
  res.render('about', {
    cssFileName: 'about',
    pageTitle: 'Application server About page',
  });
});

// http://localhost:4444/products
app.get('/products', (req, res) => {
  res.render('products', {
    products,
    cssFileName: 'products',
    pageTitle: 'Application server Products page',
  });
});

// product/0
app.get('/product/:productId', (req, res) => {
  // app.render()
  console.log(req.params);
  const product = products.find(param => param.id === req.params.product);

  res.render('product', { product });
});

// console.log('app');
app.listen(PORT, () => {
  //   console.log(`Application server is running on port ${PORT}`);
});
