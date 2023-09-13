const reducer =(state='',action)=>{
    if(action.type === 'filterstore'){
      return action.payload;
    }
    else{
        return state;
    }
}

export default reducer