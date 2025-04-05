<!-- VERSION -->
<link rel="stylesheet" href="../modules/css/version.css">
<div id="version">
    <div id="versionFade"></div>
    <p>Abscissa 
        <?php 
        // HANDLER
        require_once "../modules/handler.php";

        // IMPORTS
        add("environment");

        // RETURN VERSION
        echo load(["SELF_VERSION"])["SELF_VERSION"];
        ?>
    </p>
</div>