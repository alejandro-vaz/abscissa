<!DOCTYPE html>
<html lang="en">
<head>
    <!-- HANDLER -->
    <?php require_once "../modules/.php" ?>
    <!-- MODULES -->
    <?php module("head", "analytics") ?>
    <?php module("head", "settings") ?>
    <!-- SETTINGS -->
    <title>Log in | Abscissa</title>
    <meta name="description" content="Abscissa log in and register page.">
    <meta name="keywords" content="abscissa login register">
    <!-- HEAD MODULES -->
    <?php signal("head") ?>
    <!-- STYLE -->
    <link rel="stylesheet" type="text/css" href="../style/auth.css">
</head>
<body>
    <!-- WORKING MODULES -->
    <?php signal("working") ?>
    <!-- UI MODULES -->
    <?php signal("interface") ?>
    <!-- MAIN -->
    <div id="main"></div>
    <!-- SCRIPT -->
    <script src="../script/auth.js"></script>
</body>
</html>