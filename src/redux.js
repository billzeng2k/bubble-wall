import { combineReducers, createStore } from 'redux';

var initialBubbleCount = 10
// actions.js
export const changeBubbleCount = bubbleCount => ({
    type: 'CHANGE_BUBBLE_COUNT',
    bubbleCount,
});

export const increaseBubbleCount = () => ({
    type: 'INCREASE_BUBBLE_COUNT'
});

export const decreaseBubbleCount = () => ({
    type: 'DECREASE_BUBBLE_COUNT'
});

// reducers.js
export const bubbleManager = (state, action) => {
    switch (action.type) {
        case 'CHANGE_BUBBLE_COUNT':
            return { bubbleCount: action.bubbleCount }
        case 'INCREASE_BUBBLE_COUNT':
            return { bubbleCount: state.bubbleCount + 1 }
        case 'DECREASE_BUBBLE_COUNT':
            return { bubbleCount: state.bubbleCount - 1 }
        default:
            return state;
    }
};

// store.js
export function configureStore(initialState = { bubbleCount: initialBubbleCount }) {
    const store = createStore(bubbleManager, initialState);
    return store;
}

export const store = configureStore();
