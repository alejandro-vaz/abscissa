<div id="footer">
    <div id="footerFade"></div>
    <p>Abscissa 
        <?php 
        // IMPORTS
        include "environment.php";

        // CONFIGURE VARIABLES
        $envVariables = loadEnvVariables(["SELF_VERSION"]);
        $version = $envVariables["SELF_VERSION"];
        echo $version;
        ?>
    </p>
</div>