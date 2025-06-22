const getRequstConfig = (url, headers = {}) => {
    const config = {
        url,
        method: 'get',
        headers: {
            'Content-Type': "application/json",
            ...headers
        },
        timeout: 3000
    }

    return config;
}

export default getRequstConfig;