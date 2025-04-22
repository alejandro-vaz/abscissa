<?php
/*                                                                           */
/* FUNCTIONS                                                                 */
/*                                                                           */

// FUNCTIONS -> ENCRYPT
function encrypt(string $data, string $key, string $method = 'aes-256-cbc'): string {
    $vector = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method));
    $cipher = openssl_encrypt($data, $method, $key, OPENSSL_RAW_DATA, $vector);
    return base64_encode($vector . $cipher);
}

// FUNCTIONS -> DECRYPT
function decrypt(string $cipher, string $key, string $method = 'aes-256-cbc'): string {
    $raw = base64_decode($cipher);
    $vector = openssl_cipher_iv_length($method);
    $data = substr($raw, $vector);
    return openssl_decrypt($data, $method, $key, OPENSSL_RAW_DATA, substr($raw, 0, $vector));
}
?>