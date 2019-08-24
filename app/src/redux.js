import { combineReducers, createStore } from 'redux';
import _ from 'lodash'

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

export const bubblesPlaying = bubblesPlaying => ({
    type: 'BUBBLES_PLAYING',
    bubblesPlaying
})

// reducers.js
export const bubbleManager = (state={}, action) => {
    switch (action.type) {
        case 'CHANGE_BUBBLE_COUNT':
            return _.assign(state, { bubbleCount: action.bubbleCount })
        case 'INCREASE_BUBBLE_COUNT':
            return _.assign(state, { bubbleCount: state.bubbleCount + 1 })
        case 'DECREASE_BUBBLE_COUNT':
            return _.assign(state, { bubbleCount: state.bubbleCount - 1 })
        case 'BUBBLES_PLAYING':
            return _.assign(state, { bubblesPlaying: action.bubblesPlaying })
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
            if(state.pressedKey === action.keyCode)
                return { pressedKey: null }
        default:
            return state;
    }
};

export const changeRoute = route => ({
    type: 'CHANGE_ROUTE',
    route
})

export const routeManager = (state={}, action) => {
    switch (action.type) {
        case 'CHANGE_ROUTE':
            return { route: action.route }
        default:
            return state;
    }
};

export const reducers = combineReducers({
    bubbleManager, keyManager, routeManager
});

// store.js
export function configureStore(initialState) {
    const store = createStore(reducers, initialState);
    return store;
}

export const store = configureStore({
    bubbleManager: {
        bubbleCount: initialBubbleCount,
        bubblesPlaying: false
    },
    keyManager: {
        keyCode: null
    },
    routeManager: {
        route: 'Sequence'
    }
});
