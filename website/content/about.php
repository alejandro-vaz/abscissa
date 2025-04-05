<!DOCTYPE html>
<html lang="en">
<head>
    <?php require_once "../modules/handler.php" ?>
    <?php add("analytics") ?>
    <?php add("settings") ?>
    <title>About</title>
    <meta name="description" content="Abscissa about page.">
    <meta name="keywords" content="abscissa about">
    <!-- STYLE -->
    <link rel="stylesheet" href="../style/general.css">
    <link rel="stylesheet" href="../style/about.css">
    <!-- WORKING MODULES -->
    <?php add("katex") ?>
</head>
<body>
    <?php add("navbar") ?>
    <!-- MAIN -->
    <div id="main"></div>
    <?php add("version") ?>
    <!-- SCRIPTS -->
    <script src="../script/about.js"></script>
    <script src="../script/general.js"></script>
</body>
</html>