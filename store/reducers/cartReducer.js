import { CART_FASTY, CART_SET, CART_RESET, CART_UPDATE, CART_ADD_ITEM, CART_DELETE_ITEM} from "../types";
import _ from 'lodash'

const initialState = {
  items: [],
  sub_total:0,
  loading: true,
  change:false,
  fasty:'fasty'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_FASTY:
      return {
        ...state,
        fasty: action.payload,
        loading: false,
      }; 

    case CART_RESET:
      //console.log("CART_SET action.payload", action.payload)
      return {
        ...initialState
      }; 
    case CART_SET:
      //console.log("CART_SET action.payload", action.payload)
      return {
        ...action.payload,
        change:true
      }; 
    
    case CART_UPDATE:
      //console.log("CART_SET action.payload", action.payload)
      return {
        ...state,
        ...action.payload
      };

    case CART_ADD_ITEM:
      let s=state
      
      var index = _.findIndex(s.items, {id: action.payload.id});

      if(index!=-1) {
        s.items[index].qty++
      }else{
        action.payload.qty=1
        s.items.push(action.payload)
      }
      console.log("index", index)      
      //state.fasty='added'
      console.log("s", s)
      console.log("state", state)
      localStorage.setItem('cart', JSON.stringify(s));  
      return {
        ...s, 
        change:true       
      };  

    case CART_DELETE_ITEM:
      
      var index = _.findIndex(state.items, {id: action.payload.id});
           
      if(index!=-1) {
        state.items.splice(index, 1)
      }
      console.log("index", index)      
      state.fasty='deleted'
      console.log("state", state)
      return {...state, change:true};     
   
    default:
      return state;
  }
};

export default reducer;
