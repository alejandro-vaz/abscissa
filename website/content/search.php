<!DOCTYPE html>
<html lang="en">
<head>
    <title>Search - Abscissa</title>
    <meta name="description" content="Search the Abscissa database.">
    <meta name="keywords" content="abscissa search">
    <?php include "../modules/settings.php" ?>
    <!-- STYLE -->
    <link rel="stylesheet" href="../style/general.css">
    <link rel="stylesheet" href="../style/search.css">
    <!-- WORKING MODULES -->
    <?php include "../modules/katex.php" ?>
</head>
<body>
    <?php include "../modules/navbar.php" ?>
    <!-- MAIN -->
    <div id="main">
        <h1>Abscissa problem database</h1>
        <input type="text" id="searchInput" maxlength="6" class="input-text" autocomplete="off" placeholder="000000" pattern=".{6}">
        <button id="searchButton" class="input-button">Search</button>
        <div id="content"></div>
    </div>
    <?php include "../modules/footer.php" ?>
    <!-- SCRIPTS -->
    <script src="../script/search.js"></script>
    <script src="../script/general.js"></script>
</body>
</html>