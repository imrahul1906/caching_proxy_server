const getRequstConfig = (url, method = 'get', body = null, headers = {}) => {
    const config = {
        url,
        method,
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