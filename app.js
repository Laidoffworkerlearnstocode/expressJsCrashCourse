// const http = require('http');
// const fsPromises = require('fs/promises');

// // get the home page resources
// async function getHomePage() {
//     const homePage = await fsPromises.readFile('./navbar-app/index.html', 'utf-8');
//     return homePage; 
// }
// async function getHomeCss() {
//     const homeCss = await fsPromises.readFile('./navbar-app/styles.css', 'utf-8');
//     return homeCss;
// }
// async function getHomeImage() {
//     const homeImage = await fsPromises.readFile('./navbar-app/logo.svg');
//     return homeImage;
// }
// async function getHomeLogic() {
//     const homeLogic = await fsPromises.readFile('./navbar-app/browser-app.js', 'utf-8');
//     return homeLogic;
// }

// const server = http.createServer(async (req, res) => {
//     const url = req.url;
//     if (url === '/') {
//         const homePage = await getHomePage();
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(homePage);
//         res.end();
//     }
//     else if (url === '/about') {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write('<h1>About Us</h1>');
//         res.end();
//     }
//     else if (url === '/styles.css') {
//         const homeCss = await getHomeCss();
//         res.writeHead(200, {'Content-Type': 'text/css'});
//         res.write(homeCss);
//         res.end();
//     }
//     else if (url === '/logo.svg') {
//         const homeImage = await getHomeImage();
//         res.writeHead(200, {'Content-Type': 'image/svg+xml'});
//         res.write(homeImage);
//         res.end();
//     }
//     else if (url === '/browser-app.js') {
//         const homeLogic = await getHomeLogic();
//         res.writeHead(200, {'Content-Type': 'text/javascript'});
//         res.write(homeLogic);
//         res.end();
//     }
//     else {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         res.write('<h1>404 Not Found</h1>');
//         res.end();
//     }
// });

// server.listen(8080);

// const express = require('express');

// const app = express();

// app.listen(8080, () => {
//     console.log('Server is listening on port 8080');
// });

// app.get('/', (req, res) => {
//     res.status(200).send('Home Page');
// });

// app.get('/about', (req, res) => {
//     res.status(200).send('About Us');
// });

// app.all('*', (req, res) => {
//     res.status(404).send('<h1>404 Not Found</h1>');
// });

// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static('./public'));
 
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './public/index.html'));
// });

// app.get('/about', (req, res) => {

// });

// app.all('*', (req, res) => {
//     res.status(404).send('<h1>404 Not Found</h1>');
// });

// app.listen(5000, () => {
//     console.log('Server is listening on port 5000');
// });

const express = require('express');
const path = require('path');
const app = express();
const {products} = require('./data');

app.get('/', (req, res) => {
    res.send('<h1> Home page </h1><a href="/api/products">Products</a>');
});

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image};
    });
    res.json(newProducts);
});

app.get('/api/products/:productID', (req, res) => {
    const singleProduct = products.find((product) => product.id === Number(req.params.productID));
    if (!singleProduct) {
        return res.status(404).send('Product does not exist');
    }
    res.json(singleProduct);
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
});