export const userstore = (user) => {
    return (dispatch) =>{
        dispatch({
        type : "userstore",
        payload : user,
    })
    }
}