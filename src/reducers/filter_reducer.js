import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        price: maxPrice,
        max_price: maxPrice,
      },
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === "price-lowest") {
      tempProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-highest") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    if (sort === "name-a") {
      tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    if (sort === "name-z") {
      tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    // Dynamic object keys ([name]) allows you to update the value of said key (name) dynamically. In this case, whatever the value of 'value' is, we want also to be the value of 'name'. In other words, the value of the 'name' key (which is = the element's name property value) is set to the value of the 'value' key (whatever is in the search bar or whatever filtering method).
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    console.log("filtering...");
    return { ...state };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
