const reducer =(state={},action)=>{
    if(action.type === 'cartstore'){
      return action.payload;
    }
    else{
        return state;
    }
}

export default reducer