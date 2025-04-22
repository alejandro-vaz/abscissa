<?php 
/*                                                                           */
/* HELPERS                                                                   */
/*                                                                           */

// HELPERS -> PATTERN MATCHER
function regex(string $pattern) {
    return match ($pattern) {
        "ID" => '/^[A-Z0-9]{6}$/',
        "NODE" => '/^[A-Z0-9]{4}$/',
        "CLUSTER" => '/^[A-Z0-9]{2}$/',
        "TREE" => '/^[A-Z0-9]{1}$/',
        "EMAIL" => '/^[A-Za-z0-9._%\-]+@gmail.com$/',
        "PASSWORD" => '/^[a-zA-Z0-9_!@#$%^&*()\-+=.]{8,32}$/',
        "USERNAME" => '/^[a-zA-Z0-9_-]{4,32}$/',
        "LANG" => '/^[a-z]{2}$/',
        "RESOURCE" => '/^(?:[1-9][0-9]{0,7})$/'
    };
}

// HELPERS -> ARRAY KEY EXISTS
function isx(array $array, string $name): bool {
    return array_key_exists($name, $array);
}


/*                                                                           */
/* CHECK                                                                     */
/*                                                                           */

// CHECK -> FUNCTION
function check(array $array, string $name): void {
    if (isx($array, $name)) {
        if (!preg_match(regex($name), strval($array[$name]))) {
            throw new regexError($name);
        }
    }
}
?>