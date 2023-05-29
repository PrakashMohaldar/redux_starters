// Action creator
// person who is submitting the form
const newBooking = (name, amount) =>{
    return {
        type: "NEW_BOOKING",
        payload:{
            name:name,
            amount: amount,
        }
    }
}

const cancelBooking = (name, refundAmount) =>{
    return {
        type: "CANCEL_BOOKING",
        payload:{
            name:name,
            refundAmount: refundAmount,
        }
    }
}

// Reducer
const reservationList = (oldReservationList=[], action)=>{
    if(action.type === "NEW_BOOKING"){
        return [...oldReservationList, action.payload]
    }else if(action.type === "CANCEL_BOOKING"){
        return oldReservationList.filter((record)=>{
            return record !== action.payload.name
        })
    }
    return oldReservationList;
};

const cancellationHistory = (oldCancellationList = [], action)=>{
    if(action.type === "CANCEL_BOOKING"){
        return [...oldCancellationList, action.payload];
    }
    return oldCancellationList;
}

const accounting = (totalHistory = 100, action)=>{
    if(action.type === "NEW_BOOKING"){
        return totalHistory + action.payload.amount;
    }
    else if(action.type === "CANCEL_BOOKING"){
        return totalHistory - action.payload.refundAmount;
    }
    return totalHistory;

}

// Redux store
 const {createStore, combineStore} = Redux;

 const railwayCentralStore = combineReducers({
    accounting,
    reservationList,
    cancellationHistory,
 })

 const store = createStore(railwayCentralStore)


//  
