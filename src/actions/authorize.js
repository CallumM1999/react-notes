const authorize = ({
    token=null,
    email=null,
    id=null
} = {}) => ({
    type: 'AUTH_TRUE',
    token,
    email,
    id
});

export default authorize;