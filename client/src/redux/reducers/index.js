import { combineReducers } from "redux";
import amountreducers from "./amountreducers";
import addressreducers from "./addressreducer";
import discountreducer from "./discountreducer";
import userreducer from "./userreducer";
import cartreducer from "./cartreducer";
import filterreducer from "./filterreducer";

const reducers = combineReducers({
    amount:amountreducers,
    address:addressreducers,
    discount:discountreducer,
    user:userreducer,
    cart:cartreducer,
    filter:filterreducer,
})

export default reducers;