//
//  HELPERS
//

// HELPERS -> STRING TO UINT8ARRAY
function str2ab(string: string): Uint8Array {
    return new TextEncoder().encode(string);
}

// HELPERS -> UINT8ARRAY TO UTF-8 STRING
function ab2str(buffer: Uint8Array): string {
    return new TextDecoder().decode(buffer);
}

// HELPERS -> UINT8ARRAY TO BASE64 STRING
function ab2b64(buffer: Uint8Array): string {
    return btoa(
        Array.from(buffer, byte => String.fromCharCode(byte)).join('')
    );
}

// HELPERS -> BASE64 STRING TO UINT8ARRAY
function b642ab(base64: string): Uint8Array {
    return Uint8Array.from(atob(base64), char => char.charCodeAt(0));
}

// HELPERS -> HASH FUNCTION
async function deriveKey(password: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        'raw',
        await crypto.subtle.digest(
            'SHA-256',
            str2ab(password)
        ),
        { 
            name: 
            'AES-CBC' 
        },
        false,
        [
            'encrypt', 
            'decrypt'
        ]
    );
}


//
// CODIFICATION
//

// ENCRYPT
export async function encrypt(data: string, password: string): Promise<string> {
    const vector = crypto.getRandomValues(new Uint8Array(16));
    const cipherBytes = new Uint8Array(await crypto.subtle.encrypt(
        { 
            name: 'AES-CBC', 
            iv: vector 
        },
        await deriveKey(password),
        str2ab(data)
    ));
    const encrypted = new Uint8Array(vector.length + cipherBytes.length);
    encrypted.set(vector, 0);
    encrypted.set(cipherBytes, vector.length);
    return ab2b64(encrypted);
}

// DECRYPT
export async function decrypt(encryptedB64: string, password: string): Promise<string> {
    const combined = b642ab(encryptedB64);
    return ab2str(new Uint8Array(await crypto.subtle.decrypt(
        { 
            name: 'AES-CBC', 
            iv: combined.slice(0, 16) 
        },
        await deriveKey(password),
        combined.slice(16)
    )));
}