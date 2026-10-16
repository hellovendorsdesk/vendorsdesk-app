import apiClient from './client';

export const optimizerApi = {
    async getCategories() {
        return apiClient.get('/api/categories');
    },

    async startLot() {
        return apiClient.post('/api/start-lot');
    },

    async saveVariation(variationData) {
        return apiClient.post('/api/save-variation', variationData);
    },

    async checkShipping(category, image) {
        return apiClient.post('/api/check-shipping', { category, image });
    },

    async optimize(category, image) {
        return apiClient.post('/api/optimize', { category, image });
    },

    async getVariations(jobId) {
        return apiClient.get(`/api/variations/${jobId}`);
    },

    async getAllVariations() {
        return apiClient.get('/api/variations');
    },

    async getHistory() {
        return apiClient.get('/api/user/history');
    }
};

export default optimizerApi;
