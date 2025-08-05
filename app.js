
// const dotenv = require("dotenv");
// const express = require("express");
// const cors = require('cors');
// // require('dotenv').config();
// const app = express();
// app.use(cors());
// const mongoose = require("mongoose");
// dotenv.config({path:'./config.env'});
// require("./db/conn");
// const User = require("./model/userschema");
// app.use(express.json());
// app.use(require('./router/auth'));
// const PORT = process.env.PORT;
// const productController= require('./controller/productController')
// const multer = require('multer')
// const upload = multer({ dest:'uploads/' })

// const middleware = (req,res,next)=>{
//     console.log(`hello i am middleware`);
//     next();
// }
// //middleware();
// // app.get("/",(req,res)=>{
// //     res.send("Hello world app.js");
// // })

// app.get("/about",middleware,(req,res)=>{
//     res.send("Hello about world");
   
// })

// app.post('/api/shopping', upload.single('image'),productController.addProduct)
// app.get('/api/shopping',productController.getProduct)


// app.listen(PORT,()=>{
//     console.log(`I am connected on server ${PORT}`)
// })

const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require("mongoose");
dotenv.config({ path: './config.env' });
require("./db/conn");
const User = require("./model/userschema");
const Contact = require("./model/contactSchema")
const Product = require("./model/productModel");
const Admin = require("./model/adminSchema");
app.use(express.json());
app.use(require('./router/auth'));
const PORT = process.env.PORT;
const productController = require('./controller/productController');
const contactController= require('./controller/contactController')
const adminController = require("./controller/adminController");
const multer = require('multer');

// Define multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original filename
  }
});

const upload = multer({ storage: storage });

const middleware = (req, res, next) => {
  console.log(`hello i am middleware`);
  next();
}

app.get("/about", middleware, (req, res) => {
  res.send("Hello about world");
});

app.get("/about", middleware, (req, res) => {
  res.send("Hello about world");
});

// Serve images from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.post('/api/shopping', upload.single('image'), productController.addProduct);
app.get('/api/shopping', productController.getProduct);
app.get('/api/shopping/:id', (req, res, next) => {
  console.log("GET /api/shopping/:id triggered with ID:", req.params.id);
  next();
}, productController.getProductById);

app.post('/api/contact', contactController.addContact);

app.put('/api/shopping/:id', upload.single('image'), productController.updateProduct);
app.delete('/api/shopping/:id', productController.deleteProduct);

// Route to get contact messages
app.get('/api/contact', contactController.getContact);

app.post("/api/admins", adminController.addAdmin);

app.post('/api/admins/login', async (req, res) => {
  const { email, password } = req.body;

  // Find admin by email
  const admin = await Admin.findOne({ email });

  // If admin not found or password doesn't match, return error
  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // If email and password match, return success
  return res.status(200).json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`I am connected on server ${PORT}`);
});
