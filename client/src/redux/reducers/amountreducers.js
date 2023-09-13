const reducer =(state=0,action)=>{
    if(action.type === 'deposit'){
return state + action.payload
    }
    else if(action.type === 'withdraw'){
        return state - action.payload
    }
    else if(action.type === 'add'){
        return state + 1
            }
    else if(action.type === 'sub'){
         return state - 1
     }
    else{
        return state;
    }
}

export default reducer