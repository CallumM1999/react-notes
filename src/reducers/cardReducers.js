
const defaultState = {
    cards: []
};

const deckReducers = (state = defaultState, action) => {
    let newArr = [];
    let prev;
    switch(action.type) {
        case 'UPDATE_CARDS':

            return {
                cards: action.data
            }
        case 'ADD_CARD':
            prev = JSON.parse(JSON.stringify(state));

            newArr = [];
            for (let key in prev.cards) {
                newArr.push(prev.cards[key])
            }
            
            newArr.push(action.new)
            
            prev.cards = newArr;

            return prev;
        case 'DELETE_CARD':
            prev = JSON.parse(JSON.stringify(state));
            prev.cards = prev.cards.filter(item => {
                console.log('id', item.id, action.id)
                return action.id !== item.id
            })
            return prev;
        case 'UPDATE_CARD':
            prev = JSON.parse(JSON.stringify(state));
            prev.cards = prev.cards.map((item, index) => {

                if (item.id === action.id) {
                    return {
                        id: item.id,
                        front: action.front,
                        back: action.back
                    }
                }
                return item;
            });

            return prev;
      
        default:
            // console.log('cards default')
            return state
    }
}

export default deckReducers;