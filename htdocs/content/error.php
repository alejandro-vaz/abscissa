<!DOCTYPE html>
<html lang="en">
<head>
    <?php require_once "../modules/.php" ?>
    <title>Error | Abscissa</title>
    <meta name="description" content="Abscissa error page.">
    <meta name="keywords" content="abscissa error">
    <!-- HEAD MODULES -->
    <?php add("h", "analytics") ?>
    <?php add("h", "settings") ?>
    <!-- STYLE -->
    <link rel="stylesheet/less" type="text/css" href="../style/error.less">
</head>
<body>
    <!-- WORKING MODULES -->
    <?php add("w", "less") ?>
    <!-- UI MODULES -->
    <?php add("i", "navbar") ?>
    <?php add("i", "user") ?>
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