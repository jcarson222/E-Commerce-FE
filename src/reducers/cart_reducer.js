import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  /////// ADD TO CART ////////
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    const tempItem = state.cart.find((item) => item.id === id + color);

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;

          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }

          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      // *** setting the cart product id to = id+color since we can have multiple of the same item but with different colors...
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };

      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  /////// END ADD TO CART ////////

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
