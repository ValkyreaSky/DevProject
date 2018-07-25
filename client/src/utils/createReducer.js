// This function returns normal reducer function (1) but thanks to closures it still have access
// to `initialState` and `actionHandlers` object from `createReducer` function (2).
// During dispatching action, returned reducer function will look for handler function in
// `actionHandlers` object (function with same name as dispatched action type) and execute it
// if exists or return state if not.
// Handler function is simple function which gets current state and returns new state.
export default function createReducer(initialState, actionHandlers) { // (2)
  return (state = initialState, action) => { // (1)
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
  };
}
