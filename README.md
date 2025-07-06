## What is it
*Abscissa* is a website in which you can **practice your math skills** and learn in an interactive way. Think of *LeetCode* but for math. We aim to provide real-world math practice that really challenges you, not some easy multiple choice questions.

And to accomplish our goal we are also developing [*Mathsys*](https://github.com/abscissa-math/mathsys), which aims to be the programming language for math. It is meant to be simple yet powerful.

It is currently on the early stages, so don't get too motivated. This is a pre-alpha and most of the features that will be available on the final product are not even close being developed just yet.

**We ship every Sunday.**

Check it out on [*Abscissa*](https://abscissa.eu)

I say *we* but I'm indeed a solo developer for now, so if you want to get involved learn

## How to contribute
1. **Check out our wiki:** [Here](https://github.com/abscissa-math/website/wiki).
2. **Join the team:** Contact us to become a member of the organisation and get write role.
3. **Work on a branch:** Create a new branch and add your changes. The branch `main` is protected against direct commits to keep the codebase clean, every commit there is a version deployed into the website.
4. **Submit the pull request:** Create a pull request. Don't forget to update the `changelog.md` and the version numbers accordingly. We will give you feedback.

> [!NOTE]
> If there is already a branch that is developing the next version, branch out instead from that branch instead of branching out from `main`.

## Technical background

As of this version, the stack is a bit messy, not gonna lie. For the frontend we have:
   - *HTML* that is not raw, but rather it is transformed to allow for modularization by the *Python* backend.
   - *SASS* handling styling.
   - *React* in the background, without it being a proper dynamic *React* app.

And for the backend:
   - *VPS* with one core and `1GB` of *RAM.*
   - *MariaDB* as the database for everything.
   - *Django* serving the *HTML* and the *API*.
   - *Apache* with `mod_wsgi` handling static files.

## License
This project has the [*Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International*](https://creativecommons.org/licenses/by-nc-nd/4.0/) license. That means:
   - You can share the code as long as it's not for commercial use.
   - You cannot modify or create derivatives without permission.