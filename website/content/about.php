<!DOCTYPE html>
<html lang="en">
<head>
    <?php require "../modules/handler.php" ?>
    <title>Main page - Abscissa</title>
    <meta name="description" content="Abscissa main page.">
    <meta name="keywords" content="abscissa main">
    <?php add("settings") ?>
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