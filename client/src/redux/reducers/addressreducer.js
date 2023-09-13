const reducer =(state={},action)=>{
    if(action.type === 'addressstore'){
      return action.payload;
    }
    else{
        return state;
    }
}

export default reducer