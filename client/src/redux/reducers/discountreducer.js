const reducer =(state=0,action)=>{
    if(action.type === 'discountstore'){
      return action.payload;
    }
    else{
        return state;
    }
}

export default reducer