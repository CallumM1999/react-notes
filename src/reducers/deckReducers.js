
const defaultState = {
    decks: []
};

const deckReducers = (state = defaultState, action) => {
    let prev;
    let newArr;
    switch(action.type) {
        case 'DELETE_ITEM': 
            prev = JSON.parse(JSON.stringify(state));
            prev.decks = prev.decks.filter(item => {

                return action.id !== item.id
            })
            return prev;
        case 'RENAME_ITEM':
            prev = JSON.parse(JSON.stringify(state));
            prev.decks = prev.decks.map((item, index) => {
                if (action.id === item.id) {
                    const selected = item;
                    selected.name = action.name;
                    return selected;
                }
                
                return item;
            });
            return prev;

        case 'ADD_ITEM':
            prev = JSON.parse(JSON.stringify(state))
            
            newArr = [];
            for (let key in prev.decks) {
                newArr.push(prev.decks[key])
            }
            for (let key in action.new) {
                newArr.push(action.new[key])
            }
            prev.decks = newArr;
            return prev;
        case 'RESET_ITEM':
            // console.log('decks', state.decks)
            // console.log('new', action.new)

            // state.decks = action.new;
            return {
                ...state,
                decks: action.new
            };

        default:
            return state
    }
}

export default deckReducers;