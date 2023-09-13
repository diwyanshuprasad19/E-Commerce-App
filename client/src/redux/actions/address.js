export const addressstore = (shipping,billing,detail) => {
    return (dispatch) =>{
        dispatch({
        type : "addressstore",
        payload : {
            shipping:shipping,
            billing:billing,
            detail:detail,
        }
    })
    }
}




