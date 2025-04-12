<!DOCTYPE html>
<html lang="en">
<head>
    <?php require_once "../modules/handler.php" ?>
    <title>Problem | Abscissa</title>
    <meta name="description" content="Abscissa dashboard page.">
    <meta name="keywords" content="abscissa dashboard">
    <!-- HEAD MODULES -->
    <?php add("analytics") ?>
    <?php add("settings") ?>
    <!-- STYLE -->
    <link rel="stylesheet/less" type="text/css" href="../style/problem.less">
</head>
<body>
    <!-- WORKING MODULES -->
    <?php add("katex") ?>
    <?php add("less") ?>
    <!-- UI MODULES -->
    <?php add("codemirror") ?>
    <?php add("navbar") ?>
    <?php add("user") ?>
    <!-- MAIN -->
    <div id="main">
        <div id="data">
            <div id="info"></div>
            <div id="instructions"></div>
        </div>
        <div id="controls">
            <textarea id="playground" class="input-textarea" placeholder="Your process might want to be here, in the playground."></textarea>
            <p id="visor">$$ $$</p>
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