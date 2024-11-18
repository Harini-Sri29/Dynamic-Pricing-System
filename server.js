const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const { forecast } = require('./public/forecasting'); 
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  


mongoose.connect('mongodb://localhost:27017/DynamicPricingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection failed", error);
});


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    demand: { type: Number, required: true },
    competitorPrice: { type: Number, required: true },
    adjustedPrice: Number, 
    imageUrl:String
  });
  

const Product = mongoose.model('Product', productSchema);


const upload = multer({
    dest: 'public/images/', 
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
      if (extname && mimeType) {
        return cb(null, true);
      }
      cb(new Error('Only image files are allowed.'));
    }
  });

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role: 'user' });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return res.json({ message: 'Admin logged in', role: 'admin' });
  }

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Invalid credentials' });

  res.json({ message: 'User logged in', role: user.role });
});


app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products); 
    } catch (err) {
      res.status(500).send('Error fetching products');
    }
  });

app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, price, stock, demand, competitorPrice, originalPrice } = req.body;
    const imageUrl = `/images/${req.file.filename}`; 
  
    const newProduct = new Product({
      name,
      price,
      stock,
      demand,
      competitorPrice,
      imageUrl, 
    });
  
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).send('Error adding product');
    }
  });
  
app.get('/api/analytics', async (req, res) => {
  try {
    const products = await Product.find();
    const analytics = products.map(product => ({
      name: product.name,
      stockToDemandRatio: product.stock / (product.demand || 1), 
      avgCompetitorPrice: product.competitorPrice,
    }));
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

app.post('/api/forecast', async (req, res) => {
  const { productId, futureX } = req.body;

  if (!productId || futureX === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const historicalData = [
      { x: 1, y: product.demand - 5 },
      { x: 2, y: product.demand - 2 },
      { x: 3, y: product.demand },
    ];

    const prediction = forecast(historicalData, futureX);
    res.json({ productId, productName: product.name, prediction });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate forecast' });
  }
});



app.post('/api/update-product', async (req, res) => {
    const { productId, newStock, newDemand } = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { stock: newStock, demand: newDemand },
        { new: true }  
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  });

app.get('/api/forecast', async (req, res) => {
    try {
      const products = await Product.find(); 
      res.json(products); 
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
    }
  });


const adjustPrice = (product) => {
    let adjustedPrice = product.price;
  
    if (product.stock < 10) {
      adjustedPrice += adjustedPrice * 0.15; 
    }
  
    if (product.demand > 80) {
      adjustedPrice += adjustedPrice * 0.20; 
    }
  
    
    if (product.competitorPrice < product.price) {
      adjustedPrice -= adjustedPrice * 0.10; 
    }
  
    return adjustedPrice;
  };

app.get('/api/adjust-price/:productId', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const adjustedPrice = adjustPrice(product);
      product.adjustedPrice = adjustedPrice; 
  
      await product.save();
      res.json({ message: 'Product price adjusted successfully', adjustedPrice });
    } catch (error) {
      res.status(500).json({ error: 'Failed to adjust product price' });
    }
  });
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});