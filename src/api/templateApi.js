import apiClient from './client';

export const templateApi = {
    async getTemplates(platform = 'all') {
        const query = platform && platform !== 'all' ? `?platform=${platform}` : '';
        return apiClient.get(`/api/templates${query}`);
    },

    async getExtensionTemplates() {
        return apiClient.get('/api/templates/active/for-extension');
    },

    async createTemplate(templateData) {
        return apiClient.post('/api/templates', templateData);
    },

    async updateTemplate(id, templateData) {
        return apiClient.put(`/api/templates/${id}`, templateData);
    },

    async deleteTemplate(id) {
        return apiClient.delete(`/api/templates/${id}`);
    },

    async importTemplates(templates) {
        return apiClient.post('/api/templates/import', { templates });
    }
};

export default templateApi;
