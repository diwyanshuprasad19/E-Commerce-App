export const discountstore = (discount) => {
    return (dispatch) =>{
        dispatch({
        type : "discountstore",
        payload : discount,
    })
    }
}