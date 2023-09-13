const reducer =(state={},action)=>{
    if(action.type === 'userstore'){
      return action.payload;
    }
    else{
        return state;
    }
}

export default reducer