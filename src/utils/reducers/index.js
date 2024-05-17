const initialState = {
  gridData: {}
}

export function changeDataGridReducer(state = initialState, action) {
  const { gridData, type } = action;
  if (type === 'changeDataFrid') {
    return {
      ...state,
      gridData
    }
  }
  
  return state
}
