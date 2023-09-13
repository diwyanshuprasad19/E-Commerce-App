export const depositmoney = (amount) => {
    return (dispatch) =>{
        dispatch({
        type : "deposit",
        payload : amount
    })
    }
}

export const withdrawmoney = (amount) => {
    return (dispatch) =>{
        dispatch({
            type : "withdraw",
        payload : amount
    })
    }
}

export const addone = () => {
    return (dispatch) =>{
        dispatch({
        type : "add",
        
    })
    }
}

export const subone = (amount) => {
    return (dispatch) =>{
        dispatch({
            type : "sub",

    })
    }
}

