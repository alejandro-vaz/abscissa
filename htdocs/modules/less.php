<!-- LESS -->
<?php
// MODULE STYLES
foreach (glob("../modules/less/*.less") as $file) {
    echo '<link rel="stylesheet/less" type="text/css" href="' . $file . '">' . PHP_EOL;
}
?>
<link rel="stylesheet/less" type="text/css" href="../style/general.less">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/less"></script>