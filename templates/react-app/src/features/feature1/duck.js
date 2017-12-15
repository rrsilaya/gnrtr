/* Action Types */
const FIRST_ACTION = 'FEATURE1/FIRST_ACTION';

/* Action Creators */
export const firstAction = () => {
  return {
    type: FIRST_ACTION
  }
};

/* Initial State */
const initialState = {
  firstAction: true
};

/* Reducer */
const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    default:
      return state;
  }
};

export default reducer;