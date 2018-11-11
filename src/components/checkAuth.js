import jwt from 'jsonwebtoken';

const checkAuth = (auth) => {
    if (auth.auth || !!auth.token) {

        const { exp } = jwt.decode(auth.token);
        const now = Date.now() / 1000;

        if (exp - now > 0) {
            return true;
        } else {
            localStorage.removeItem('token');
            console.log('token expired');

            return false
        }
    }
    return false;
}

export default checkAuth;