const logout = data => {

    return {
        type: 'AUTH_TRUE',
        ...data
    }
}

export default logout;