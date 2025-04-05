<!DOCTYPE html>
<html lang="en">
<head>
    <?php require_once "../modules/handler.php" ?>
    <?php add("analytics") ?>
    <?php add("settings") ?>
    <title>Main page</title>
    <meta name="description" content="Abscissa main page.">
    <meta name="keywords" content="abscissa main">
    <!-- STYLE -->
    <link rel="stylesheet" href="../style/general.css">
    <link rel="stylesheet" href="../style/main.css">
    <!-- WORKING MODULES -->
    <?php add("katex") ?>
</head>
<body>
    <?php add("navbar") ?>
    <!-- MAIN -->
    <div id="main"></div>
    <!-- SCRIPTS -->
    <script src="../script/main.js"></script>
    <script src="../script/general.js"></script>
</body>
</html>