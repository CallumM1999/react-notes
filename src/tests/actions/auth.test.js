import authorize from '../../actions/authorize';
import deauthorize from '../../actions/deauthorize';

test('shoud default empty options', () => {
    const action = authorize({ age: 23 });

    expect(action).toEqual({
        type: 'AUTH_TRUE',
        token: null,
        email: null,
        id: null
    });

});

test('shoud return correct options', () => {
    const action = authorize({ token: 'adasdasd', email: 'email@email.com', id:'asdasd' });

    expect(action).toEqual({
        type: 'AUTH_TRUE',
        token: 'adasdasd',
        email: 'email@email.com',
        id: 'asdasd'
    });

})