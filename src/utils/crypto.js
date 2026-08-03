import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'vendorsdesk-secure-payload-key-2026';

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export async function secureFetch(url, options = {}) {
    if (!options.headers) options.headers = {};
    if (!options.headers['Content-Type'] && options.body) {
        options.headers['Content-Type'] = 'application/json';
    }

    if (options.body && typeof options.body === 'object') {
        const plaintext = JSON.stringify(options.body);
        const encrypted = CryptoJS.AES.encrypt(plaintext, ENCRYPTION_KEY).toString();
        options.body = JSON.stringify({ payload: encrypted, ...options.body });
    }

    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        const rawJson = await response.json();
        let result = rawJson;

        if (rawJson && rawJson.payload) {
            try {
                const bytes = CryptoJS.AES.decrypt(rawJson.payload, ENCRYPTION_KEY);
                const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
                if (decryptedStr && decryptedStr.startsWith('{')) {
                    result = JSON.parse(decryptedStr);
                }
            } catch (err) {
                // Ignore decryption error and use rawJson
            }
        }

        if (result && typeof result === 'object') {
            result.httpStatus = response.status;
            if (result.status === undefined) {
                result.status = response.status;
            }
        }

        if (response.status === 401) {
            console.warn('[API Auth] 401 Unauthorized detected.');
            return { success: false, error: result.error || 'Session expired. Please sign in again.', httpStatus: 401 };
        }

        return result;
    }

    return { status: response.status, success: false, error: 'Server communication error. Please try again.' };
}
