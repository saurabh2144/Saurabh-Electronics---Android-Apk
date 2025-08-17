import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { compare, hash } from 'bcrypt';
import router from './routes/cart.route.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myudb')
  .then(() => console.log("MongoDB connected successfully"))
  .catch(e => console.error("MongoDB connection error:", e));

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true }
});
const User = mongoose.model('User', UserSchema);

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true }
}, { _id: false });

const suggestedProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
}, { _id: false });

const discountSchema = new mongoose.Schema({
  percentage: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true }
}, { _id: false });

const itemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: [reviewSchema],
  discount: discountSchema,
  suggestedProducts: [suggestedProductSchema],
  images: { type: [String], required: true }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

const cartSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  itemId: { type: String, required: true }
});
export const CartItem = mongoose.model('CartItem', cartSchema);

app.use(router);

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.get('/items/search', async (req, res) => {
  const name = req.query.name;
  try {
    const items = await Item.find({
      title: { $regex: name, $options: "i" }
    });
    if (!items || items.length === 0) return res.status(404).json({ error: "No data found" });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/add-dummy-items', async (req, res) => {
  try {
    const itemsData = req.body;
    if (!Array.isArray(itemsData) || itemsData.length === 0)
      return res.status(400).json({ error: "Send an array of items" });

    const insertedItems = await Item.insertMany(itemsData);
    res.status(200).json({ message: "Items added successfully", data: insertedItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to insert items" });
  }
});

app.post("/addToCart", async (req, res) => {
  const { userId, id } = req.body;
  if (!id || !userId) return res.status(400).json({ error: "Item ID and User ID required" });

  try {
    const exists = await CartItem.findOne({ userId, itemId: id });
    if (exists) return res.status(400).json({ error: "Item already in cart" });

    const newCartItem = await CartItem.create({ userId, itemId: id });
    res.status(200).json({ message: "Item added to cart", cartItem: newCartItem });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.get("/getCart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const allCart = await CartItem.find({ userId });

    const cartItems = await Promise.all(
      allCart.map(async (cart) => {
        const item = await Item.findOne({ id: cart.itemId });
        if (!item) return null;
        return {
          ...item.toObject(),
          cartId: cart._id
        };
      })
    );

    const filteredCartItems = cartItems.filter(item => item !== null);
    res.status(200).json(filteredCartItems);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Enter email and password" });

    const userByDb = await User.findOne({ email });
    if (!userByDb) return res.status(400).json({ error: "Email not found" });

    const isPasswordMatch = await compare(password, userByDb.password);
    if (!isPasswordMatch) return res.status(400).json({ error: "Invalid email or password" });

    res.status(200).json({ message: "Logged in successfully", user: { userId: userByDb._id, email: userByDb.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, password, age, email } = req.body;
    if (!name || !password || !age || !email) return res.status(400).json({ error: "Fill all fields" });

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await hash(password, 10);
    await User.create({ name, password: hashedPassword, age, email });

    res.status(200).json({ message: "User registered successfully", redirect: "LoginScreen" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3002, () => console.log("Server running on port 3002"));
