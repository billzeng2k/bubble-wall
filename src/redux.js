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
export const bubbleManager = (state={}, action) => {
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

export const pressKey = keyCode => ({
    type: 'PRESS_KEY',
    keyCode
})

export const releaseKey = keyCode => ({
    type: 'RELEASE_KEY',
    keyCode
})

export const keyManager = (state={}, action) => {
    switch (action.type) {
        case 'PRESS_KEY':
            return { pressedKey: action.keyCode }
        case 'RELEASE_KEY':
            if(state.pressedKey == action.keyCode)
                return { pressedKey: null }
        default:
            return state;
    }
};

export const reducers = combineReducers({
    bubbleManager, keyManager
});

// store.js
export function configureStore(initialState) {
    const store = createStore(reducers, initialState);
    return store;
}

export const store = configureStore({
    bubbleManager: {
        bubbleCount: 10
    },
    keyManager: {
        keyCode: null
    }
});
