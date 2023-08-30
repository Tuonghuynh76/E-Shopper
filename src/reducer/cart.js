const initialState = {
    qtyProduct: 0,
  };
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_PRODUCT": {
        localStorage.setItem("dataQty", JSON.stringify(action.payload.qtyProduct));
        return action.payload;
      }
      default:
        return state;
    }
  };
  export default cartReducer;