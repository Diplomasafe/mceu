import { randomBytes } from 'crypto';

export const generateSecurePassword = (length: number = 12): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    const pass = [];
    const alphaLength = alphabet.length;

    const randomValues = randomBytes(length);

    for (let i = 0; i < length; i++) {
        const num = randomValues[i] % alphaLength;
        pass.push(alphabet[num]);
    }

    return pass.join('');
};
