
const test = ({ data }) => {
    const { name, age } = data;

    console.log('name', name);
    console.log('age', age);

    console.log('data', data)
}


test({ data: {
    name: 'callum', age: 19
} })



    // .then(response => {
    //         const { token, id, email } = response.data;
    //         localStorage.setItem('token', token);
    //         this.props.dispatch(authorize({ token, id, email }));
    //         this.props.redirect();
    //     })