import apiClient from './client';

export const billingApi = {
    async getPlans() {
        return apiClient.get('/api/billing/plans');
    },

    async createOrder(planId, couponCode = '') {
        return apiClient.post('/api/billing/create-order', { planId, couponCode });
    },

    async verifyPayment(paymentDetails) {
        return apiClient.post('/api/billing/verify', paymentDetails);
    },

    async verifyCashfreeOrder(orderId) {
        return apiClient.post('/api/billing/verify-cashfree-order', { orderId });
    }
};

export default billingApi;
