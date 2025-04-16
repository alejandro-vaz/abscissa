<!-- LESS -->
<?php
// MODULE STYLES
global $MOD;
foreach ($MOD as $module) {
    // APPEND MAIN STYLE
    $file = "../modules/less/$module.less";
    if (file_exists($file)) {
        echo '<link rel="stylesheet/less" type="text/css" href="' . $file . '">' . PHP_EOL;
    }

    // APPEND OTHER STYLES
    if ($module == "codemirror") {
        echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.css">' . PHP_EOL;
        echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/theme/monokai.min.css">' . PHP_EOL;
    } elseif ($module == "katex") {
        echo '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib" crossorigin="anonymous">' . PHP_EOL;
    }
}
?>
<script src="https://cdn.jsdelivr.net/npm/less"></script>