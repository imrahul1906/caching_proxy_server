const getRequstConfig = (url, body = null, headers = {}) => {
    const config = {
        url,
        method: 'get',
        headers: {
            'Content-Type': "application/json",
            ...headers
        },
        timeout: 3000
    }

    if (body) {
        config.data = body;
    }

    return config;
}

export default getRequstConfig;