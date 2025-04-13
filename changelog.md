# *Abscissa* changelog

## *Abscissa* 0.0.1

---

- [X] (Major) Initial release.

### *Abscissa* 0.1.9

- [X] (Patch) Changed problems *JSON* structure.

- [X] (Minor) Improved *content* element *ID* inside elements structure.

- [X] (Patch) Changed codes for classification to *base-*$36$.

- [X] (Patch) Remade query handling and requisites.

- [X] (Patch) Remade website titles.

- [X] (Patch) Improved *LaTeX* math parsing via `website/render.js`.

- [X] (Patch) Added comments to all code.

- [X] (Minor) Remade `website/style.less`.

### *Abscissa* 0.2.0

- [X] (Patch) Increase `.main` `#content` size to `1000px`.

- [X] (Patch) Remove `#content` border if empty.

- [X] (Patch) Remade margin handling.

- [X] (Patch) Completely removed scrollbar.

- [X] (Patch) Added navbar with button and `general.js`.

- [X] (Patch) Improved filetree structure.

- [X] (Patch) Enter now leads to field execution.

- [X] (Patch) Switched main theme to black.

#### *Abscissa* 0.2.7

- [X] (Patch) Unified style.

- [X] (Patch) Simplified problem structure.

- [X] (Patch) Added input checking in search.

- [X] (Minor) Added a `Show solution` button.

- [X] (Patch) Added $2$ problems.

- [X] (Patch) Added numerical approximations for problem answers.

#### *Abscissa* 0.2.12

- [X] (Patch) Remade `problems` table and included `content` as a row.

- [X] (Patch) Added multilanguage support on `problems` table.

- [X] (Patch) Made minor style adjustments.

- [X] (Patch) Added interactive `python` solver.

- [X] (Patch) Migrated full database to cloud.

#### *Abscissa* 0.2.23

- [X] (Patch) Added margin to `#contentSolution` `<div>`.

- [X] (Patch) Increased *LaTeX* block margin between each line.

- [X] (Patch) Added multilanguage support to all `./website/database/*.php` files.

- [X] (Minor) Created a *PHP* script to search problems by its content.

- [X] (Patch) Added logo.

- [X] (Patch) Remade navbar margins and structure.

- [X] (Minor) Cleaned internal functions and processes to improve ease of maintenance.

- [X] (Minor) Converted *HTML* files to *PHP* ones and modularized common resources.

- [X] (Patch) Hidden database credentials.

- [X] (Patch) Simplified problem template.

### *Abscissa* 0.3.1

- [X] (Patch) Improved `#main` size to take all screen.

- [X] (Patch) Added a footer.

- [X] (Patch) Converted all remaining *HTML* files to *PHP.*

- [X] (Patch) Added version display in the footer.

- [X] (Patch) Added `environment.php` module for handling data.

### *Abscissa* 0.4.24

- [X] (Patch) Changed logos to `.svg` format and added navbar logo transition.

- [X] (Minor) Added *About* page.

- [X] (Patch) Refactored `general.js`.

- [X] (Minor) Remade module logic and hierarchy.

- [X] (Patch) Separated site files from module files.

- [X] (Patch) Added module abbreviations for `solver.py`.

- [X] (Patch) Increased precission in `solver.py`.

#### *Abscissa* 0.4.36

- [X] (Patch) Integrated *Google Analytics.*

- [X] (Patch) Added comments to *PHP* modules.

- [X] (Patch) Transcribed database *PHP* files.

- [X] (Minor) Installed error system.

- [X] (Patch) Added `documents/ai_evaluation.cssc`.

- [X] (Patch) Added `documents/ai_message.md`.

- [X] (Patch) Added custom exceptions.

- [X] (Patch) Changed `include` *PHP* statements for `require_once`.

- [X] (Patch) Moved `redirect()` function from `general.js` to navbar module *JavaScript.*

- [X] (Patch) Made the environment handling more robust.

## *Abscissa* 1.0.83

- [X] (Patch) Added *PHP* universal error handler.

- [X] (Patch) Changed leaked database credentials.

- [X] (Minor) Added all database tables and fields.

- [X] (Patch) Experimented with *Perlin* noise.

- [X] (Minor) Added error page.

- [X] (Minor) Remade navbar.

- [X] (Patch) Added all logos as *SVG* files.

- [X] (Minor) Deleted all old pages.

- [X] (Major) Made new dashboard with problem of the day and random scroll.

- [X] (Major) Switched from *CSS* to *LESS.*

#### *Abscissa* 1.0.91

- [X] (Patch) Added `documents/abscissa.cssc` for team coordination.

- [X] (Patch) Applied error pages.

- [X] (Minor) Added video resources to dashboard.

- [X] (Patch) Added preferences logo to user module.

- [X] (Patch) Changed `script/general.js` *API* function names.

- [X] (Patch) Refactored and improved `user.php` module.

- [X] (Patch) Changed logo.

- [X] (Patch) Unified `random()` and `day()` functions in `dashboard.js`.

#### *Abscissa* 1.0.105

- [X] (Patch) Added *PHP* database module.

- [X] (Patch) Added *PHP* test module.

- [X] (Minor) Improved database interaction scripts.

- [X] (Patch) Included exceptions in `handler.php` entry module.

- [X] (Patch) Created *JS* `dashboard.js` function to load videos to resources.

- [X] (Patch) Removed cross-origin headers in content *PHP* files.

- [X] (Patch) Created resource-gathering database *PHP* scripts.

- [X] (Patch) Completed [#8.](https://github.com/alejandro-vaz/Abscissa/issues/8)

#### *Abscissa* 1.0.115

- [X] (Patch) Completed [#14.](https://github.com/alejandro-vaz/Abscissa/issues/14)

- [X] (Minor) Added dynamic resource loading in dashboard.

- [X] (Minor) Completed [#15.](https://github.com/alejandro-vaz/Abscissa/issues/15)

- [X] (Minor) Added automatic arguments and environment modules.

- [X] (Patch) Remade database request function.

- [X] (Patch) Renamed `problems-content.php` to `problems-node.php`.

- [X] (Patch) Improved *PHP* exceptions.

- [X] (Patch) Remade `fetchAPI()` *JS* frontend function to allow for *non-JSON* responses.

#### *Abscissa* 1.0.129

- [X] (Minor) Completed [#24.](https://github.com/alejandro-vaz/Abscissa/issues/24)

- [X] (Minor) Completed [#17.](https://github.com/alejandro-vaz/Abscissa/issues/17)

- [X] (Patch) Completed [#11.](https://github.com/alejandro-vaz/Abscissa/issues/11)

- [X] (Minor) Unified database access to table lookup files.

- [X] (Patch) Remade fetch data handling in `dashboard.js`.

### *Abscissa* 1.1.2

- [X] (Major) Completed [#16.](https://github.com/alejandro-vaz/Abscissa/issues/16)

- [X] (Patch) Moved `redirect()` *JS* function to `general.js`.

- [X] (Patch) Modified problem template.

- [X] (Patch) Try buttons on dashboard now work.

- [X] (Patch) Removed explicit async behaviour from `dashboard.js`.

- [X] (Patch) Added *LESS* `.input-textarea` class.

#### *Abscissa* 1.1.23

- [X] (Patch) Renamed `handler.php` to `.php` in order to signal entry point.

- [X] (Patch) Renamed modules to specify their scope and reach by a letter.

- [X] (Patch) `add()` module from `.php` now takes two arguments in order to differentiate between `w`, `i`, `f` and `h` modules.

- [X] (Minor) Added *CodeMirror* module, dynamic textarea and autocompletion.

- [X] (Patch) Differentiated between *PHP* critical `PHPException` and non-critical `PHPAlert` with variable `$terminate`.

- [X] (Patch) Cleaned `gtag()` function.

- [X] (Patch) Refactored `w-katex.js` and renamed `render()` to `renderLaTeX()`.

- [X] (Patch) Changed id show next to the problem name to node (followed by an @).

- [X] (Patch) Changed content cards course and reward for id.

- [X] (Patch) Added infinite scroll for resources in dashboard.

- [X] (Patch) Deleted the whole `error.js` file.

- [X] (Patch) Input validation is now based on trimming and cleaning user input and comparing it to the correct one given by the *API.*

- [X] (Patch) Changed font style to *Comic Sans.*

- [X] (Patch) Especified header size on `general.less`.