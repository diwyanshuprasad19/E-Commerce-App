export const filterstore = (filter) => {
    return (dispatch) =>{
        dispatch({
        type : "filterstore",
        payload : filter,
    })
    }
}