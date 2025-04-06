<?php header('Access-Control-Allow-Origin: *'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php require_once "../modules/handler.php" ?>
    <title>Dashboard | Abscissa</title>
    <meta name="description" content="Abscissa dashboard page.">
    <meta name="keywords" content="abscissa dashboard">
    <!-- HEAD MODULES -->
    <?php add("analytics") ?>
    <?php add("settings") ?>
    <!-- STYLE -->
    <link rel="stylesheet/less" type="text/css" href="../style/dashboard.less">
</head>
<body>
    <!-- WORKING MODULES -->
    <?php add("katex") ?>
    <?php add("less") ?>
    <!-- UI MODULES -->
    <?php add("navbar") ?>
    <?php add("user") ?>
    <!-- MAIN -->
    <div id="main">
        <div id="random" class="problem">
            <div id="randomContent" class="content"></div>
            <div class="problem-options">
                <button class="input-button" id="randomTry">Try</button>
                <button class="input-button" id="randomSkip">Skip</button>
            </div>
        </div>
        <div id="day" class="problem">
            <div id="dayContent" class="content"></div>
            <div class="problem-options">
                <button class="input-button" id="dayTry">Try</button>
            </div>
        </div>
    </div>
    <!-- SCRIPT -->
    <script src="../script/dashboard.js"></script>
</body>
</html>