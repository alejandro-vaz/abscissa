<?php
function add($module) {
    $path = __DIR__ . "/../modules/$module.php";
    include $path;
}
?>