<!DOCTYPE html>
<html lang="en">
<head>
    <?php require_once "../modules/.php" ?>
    <title>Dashboard | Abscissa</title>
    <meta name="description" content="Abscissa dashboard page.">
    <meta name="keywords" content="abscissa dashboard">
    <!-- HEAD MODULES -->
    <?php add("h", "analytics") ?>
    <?php add("h", "settings") ?>
    <!-- STYLE -->
    <link rel="stylesheet/less" type="text/css" href="../style/dashboard.less">
</head>
<body>
    <!-- WORKING MODULES -->
    <?php add("w", "katex") ?>
    <?php add("w", "less") ?>
    <!-- UI MODULES -->
    <?php add("i", "navbar") ?>
    <?php add("i", "user") ?>
    <!-- MAIN -->
    <div id="main">
        <div id="random" class="problem">
            <div id="randomContent" class="content"></div>
            <div class="problem-options">
                <button class="input-button" id="randomTry">TRY</button>
                <button class="input-button" id="randomSkip">SKIP</button>
            </div>
        </div>
        <div id="day" class="problem">
            <div id="dayContent" class="content"></div>
            <div class="problem-options">
                <button class="input-button" id="dayTry">TRY</button>
            </div>
        </div>
        <div class="problem" id="resources">
            <div class="content">
                <div class="content-1">
                    <h2>Resources</h2>
                    <div id="resourcesLinks"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- SCRIPT -->
    <script src="../script/dashboard.js"></script>
</body>
</html>