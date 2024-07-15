export const InstituteReducer = (state, action) => {
    switch (action.type) {
        case 'GATE_VALUE':
            console.log(action.payload, 'payload');
            return {payload: action.payload}
        default:
            return state;
    }
}
