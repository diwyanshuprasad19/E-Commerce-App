export const cartstore = (cart) => {
    return (dispatch) =>{
        dispatch({
        type : "cartstore",
        payload : {
          cart:cart,
        },
    })
    }
}