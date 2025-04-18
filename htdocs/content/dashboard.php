<!DOCTYPE html>
<html lang="en">
<head>
    <!-- HANDLER -->
    <?php require_once "../modules/.php" ?>
    <!-- MODULES -->
    <?php module("head", "analytics") ?>
    <?php module("head", "settings") ?>
    <?php module("working", "katex") ?>
    <?php module("interface", "navbar") ?>
    <?php module("interface", "user") ?>
    <!-- SETTINGS -->
    <title>Dashboard | Abscissa</title>
    <meta name="description" content="Abscissa dashboard page.">
    <meta name="keywords" content="abscissa dashboard">
    <!-- HEAD MODULES -->
    <?php signal("head") ?>
    <!-- STYLE -->
    <link rel="stylesheet" type="text/css" href="../style/dashboard.css">
</head>
<body>
    <!-- WORKING MODULES -->
    <?php signal("working") ?>
    <!-- UI MODULES -->
    <?php signal("interface") ?>
    <!-- MAIN -->
    <div id="main">
        <div id="random" class="section">
            <div id="randomContent" class="content"></div>
            <div class="problemOptions">
                <button class="inputButton" id="random-try">TRY</button>
                <button class="inputButton" id="random-skip">SKIP</button>
            </div>
        </div>
        <div id="day" class="section">
            <div id="dayContent" class="content"></div>
            <div class="problemOptions">
                <button class="inputButton" id="day-try">TRY</button>
            </div>
        </div>
        <div class="section" id="resources">
            <div class="content">
                <div class="content1">
                    <h2>Resources</h2>
                    <div id="resources-links"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- SCRIPT -->
    <script src="../script/dashboard.js"></script>
</body>
</html>