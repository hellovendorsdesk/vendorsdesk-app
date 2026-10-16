import { useState, useEffect, useCallback } from 'react';
import templateApi from '../api/templateApi';

export function useTemplates(currentUser) {
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [extensionInstalled, setExtensionInstalled] = useState(false);
    const [syncSuccess, setSyncSuccess] = useState(false);
    const [showInstallModal, setShowInstallModal] = useState(false);

    const syncTokenToExtension = useCallback(() => {
        const token = localStorage.getItem('vendorsdesk_token') || localStorage.getItem('token');
        if (token) {
            window.postMessage({
                type: 'VENDORSDESK_SYNC_AUTH',
                token,
                user: currentUser,
                apiBase: window.location.hostname.includes('vendorsdesk.in')
                    ? 'https://backend.vendorsdesk.in'
                    : window.location.origin
            }, '*');
        }
    }, [currentUser]);

    const checkExtension = useCallback(() => {
        if (window.__VENDORS_DESK_EXTENSION_INSTALLED__) {
            setExtensionInstalled(true);
        } else {
            window.postMessage({ type: 'VENDORSDESK_PING_EXTENSION' }, '*');
        }
    }, []);

    useEffect(() => {
        const handleExtensionMessage = (event) => {
            if (!event.data || typeof event.data !== 'object') return;
            if (
                event.data.type === 'VENDORSDESK_EXTENSION_PONG' ||
                event.data.type === 'VENDORSDESK_EXTENSION_LOADED'
            ) {
                setExtensionInstalled(true);
                syncTokenToExtension();
            }
            if (event.data.type === 'VENDORSDESK_EXTENSION_SYNC_ACK') {
                setSyncSuccess(true);
                setTimeout(() => setSyncSuccess(false), 3000);
            }
        };

        window.addEventListener('message', handleExtensionMessage);
        checkExtension();
        const timer = setTimeout(checkExtension, 1200);

        return () => {
            window.removeEventListener('message', handleExtensionMessage);
            clearTimeout(timer);
        };
    }, [checkExtension, syncTokenToExtension]);

    const fetchTemplates = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await templateApi.getTemplates(selectedPlatform);
            if (res.success && Array.isArray(res.templates)) {
                setTemplates(res.templates);
            }
        } catch (err) {
            console.error('Failed to fetch templates:', err);
        } finally {
            setIsLoading(false);
        }
    }, [selectedPlatform]);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    const saveTemplate = async (templateId, templateData) => {
        let res;
        if (templateId) {
            res = await templateApi.updateTemplate(templateId, templateData);
        } else {
            res = await templateApi.createTemplate(templateData);
        }

        if (res.success) {
            await fetchTemplates();
            syncTokenToExtension();
        }
        return res;
    };

    const deleteTemplate = async (id) => {
        const res = await templateApi.deleteTemplate(id);
        if (res.success) {
            setTemplates(prev => prev.filter(t => t._id !== id));
            syncTokenToExtension();
        }
        return res;
    };

    const filteredTemplates = templates.filter(t => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            (t.title && t.title.toLowerCase().includes(q)) ||
            (t.brand && t.brand.toLowerCase().includes(q)) ||
            (t.category && t.category.toLowerCase().includes(q)) ||
            (t.sku && t.sku.toLowerCase().includes(q))
        );
    });

    return {
        templates: filteredTemplates,
        rawTemplates: templates,
        isLoading,
        searchQuery,
        setSearchQuery,
        selectedPlatform,
        setSelectedPlatform,
        extensionInstalled,
        syncSuccess,
        showInstallModal,
        setShowInstallModal,
        syncTokenToExtension,
        fetchTemplates,
        saveTemplate,
        deleteTemplate
    };
}

export default useTemplates;
