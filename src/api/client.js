import { secureFetch } from '../utils/crypto';

function getAuthHeaders(extraHeaders = {}) {
    const headers = { ...extraHeaders };
    const token = localStorage.getItem('token') || localStorage.getItem('vendorsdesk_token');
    if (token && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

export const apiClient = {
    async get(endpoint, options = {}) {
        const headers = getAuthHeaders(options.headers);
        return secureFetch(endpoint, {
            method: 'GET',
            ...options,
            headers
        });
    },

    async post(endpoint, body = {}, options = {}) {
        const headers = getAuthHeaders(options.headers);
        return secureFetch(endpoint, {
            method: 'POST',
            body,
            ...options,
            headers
        });
    },

    async put(endpoint, body = {}, options = {}) {
        const headers = getAuthHeaders(options.headers);
        return secureFetch(endpoint, {
            method: 'PUT',
            body,
            ...options,
            headers
        });
    },

    async delete(endpoint, options = {}) {
        const headers = getAuthHeaders(options.headers);
        return secureFetch(endpoint, {
            method: 'DELETE',
            ...options,
            headers
        });
    }
};

export default apiClient;
