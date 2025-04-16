<!DOCTYPE html>
<html lang="en">
<head>
    <!-- MODULES -->
    <?php require_once "../modules/.php" ?>
    <?php module("head", "analytics") ?>
    <?php module("head", "settings") ?>
    <?php module("working", "less") ?>
    <?php module("interface", "navbar") ?>
    <?php module("interface", "user") ?>
    <!-- SETTINGS -->
    <title>Error | Abscissa</title>
    <meta name="description" content="Abscissa error page.">
    <meta name="keywords" content="abscissa error">
    <!-- HEAD MODULES -->
    <?php signal("head") ?>
    <!-- STYLE -->
    <link rel="stylesheet/less" type="text/css" href="../style/error.css">
</head>
<body>
    <!-- WORKING MODULES -->
    <?php signal("working") ?>
    <!-- UI MODULES -->
    <?php signal("interface") ?>
    <!-- MAIN -->
    <div id="main">
        <h2>Error.</h2>
        <p>This doesn't look right at all.</p>
        <p>Try going back.</p>
    </div>
    <!-- SCRIPT -->
    <script src="../script/error.js"></script>
</body>
</html>