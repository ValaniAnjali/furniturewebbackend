// controller/cartController.js

const Cart = require('../model/Cart'); // Assuming you have a Cart model defined

// Function to add item to cart
exports.addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body; // Assuming you have userId and productId in the request body

        // Create a new cart item
        const cartItem = new Cart({
            user: userId,
            product: productId,
            quantity: quantity || 1, // Default quantity to 1 if not provided
        });

        // Save the cart item to the database
        await cartItem.save();

        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
};
