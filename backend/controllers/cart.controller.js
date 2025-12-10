import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;
    const { quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (!product.isAvailable)
      return res.status(400).json({ error: "Product is not available" });

    if (product.owner.toString() === userId.toString()) {
      return res.status(400).json({ error: "You can't add cart this item" });
    }

    // Find existing cart item
    let cart = await Cart.findOne({ owner: userId, product: productId });

    if (cart) {
      cart.quantity = cart.quantity + quantity;
      cart.totalPrice = product.price * quantity;
    } else {
      cart = new Cart({
        owner: userId,
        product: productId,
        quantity,
        totalPrice: product.price * quantity,
        storeOwner: product.owner,
      });
    }

    await cart.save();
    await cart.populate("product"); // Populate for response

    res.status(200).json(cart);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Item already in cart" });
    }
    console.error("Add Cart Error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateQuantityCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const userId = req.userId;
    const { cartQuantity } = req.body;

    if (cartQuantity < 1) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const cart = await Cart.findOne({
      _id: cartId,
      owner: userId,
    }).populate("product");

    if (!cart) return res.status(404).json({ error: "Cart item not found" });

    cart.quantity = cartQuantity;
    cart.totalPrice = cart.product.price * cartQuantity;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Update Cart Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const userId = req.userId;

    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    if (cart.owner.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not your cart item" });
    }

    await Cart.findByIdAndDelete(cartId);

    res.status(200).json({ message: "Remove successfully" });
  } catch (error) {
    console.error("Remove Cart Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const carts = await Cart.find({ owner: user._id })
      .populate("product")
      .sort({ createdAt: -1 });
    res.status(200).json(carts);
  } catch (error) {
    console.error("Get All Cart Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const getCartTotal = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const carts = await Cart.find({ owner: user._id })
      .populate("product")
      .sort({ createdAt: -1 });

    const subtotal = carts.reduce((sum, item) => sum + item.totalPrice, 0);
    const shippingFee = 5;
    const total = subtotal + shippingFee;
    const cartQuantity = carts.reduce((sum, item) => sum + item.quantity, 0);

    res.status(200).json({ subtotal, shippingFee, total, cartQuantity });
  } catch (error) {
    console.error("Get Cart Totals Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};
