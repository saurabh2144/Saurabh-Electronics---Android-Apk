import { CartItem } from "../server.js";

export const removeFromCart = async (req, res) => {
  try {
    const cartItemId = req.params.id; // ye _id hoga MongoDB ka

    const deletedItem = await CartItem.findByIdAndDelete(cartItemId);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart", item: deletedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
