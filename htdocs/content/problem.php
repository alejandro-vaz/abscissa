<!DOCTYPE html>
<html lang="en">
<head>
    <!-- MODULES -->
    <?php require_once "../modules/.php" ?>
    <?php module("head", "analytics") ?>
    <?php module("head", "settings") ?>
    <?php module("working", "katex") ?>
    <?php module("working", "less") ?>
    <?php module("interface", "codemirror") ?>
    <?php module("interface", "navbar") ?>
    <?php module("interface", "user") ?>
    <!-- SETTINGS -->
    <title>Problem | Abscissa</title>
    <meta name="description" content="Abscissa dashboard page.">
    <meta name="keywords" content="abscissa dashboard">
    <!-- HEAD MODULES -->
    <?php signal("head") ?>
    <!-- STYLE -->
    <link rel="stylesheet/less" type="text/css" href="../style/problem.css">
</head>
<body>
    <!-- WORKING MODULES -->
    <?php signal("working") ?>
    <!-- UI MODULES -->
    <?php signal("interface") ?>
    <!-- MAIN -->
    <div id="main">
        <div id="data">
            <div id="info"></div>
            <div id="instructions"></div>
        </div>
        <div id="controls">
            <textarea id="playground" class="input-textarea"></textarea>
            <p id="visor"></p>
            <div>
                <input type="text" class="input-text" id="answer" placeholder="Write down your answer here." autocomplete="off" spellcheck="false">
                <p id="result"></p>
                <button class="input-button" id="validate">VALIDATE</button>
            </div>
        </div>
    </div>
    <!-- SCRIPT -->
    <script src="../script/problem.js"></script>
</body>
</html>