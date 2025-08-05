## What is it
*Abscissa* is a website in which you can **practice your math skills** and learn in an interactive way. Think of *LeetCode* but for math. We aim to provide real-world math practice that really challenges you, not some easy multiple choice questions.

And to accomplish our goal we are also developing [*Mathsys*](https://github.com/abscissa-math/mathsys), which aims to be the programming language for math. It is meant to be simple yet powerful.

It is currently on the early stages, so don't get too motivated. This is a pre-alpha and most of the features that will be available on the final product are not even close being developed just yet.

**We ship every Sunday.**

Check it out live on [*our website.*](https://abscissa.eu)

I say *we* but I'm indeed a solo developer for now, so if you want to get involved learn

## How to contribute
1. **Check out our wiki:** [here](https://github.com/abscissa-math/website/wiki).
2. **Join the team:** Contact us to become a member of the organisation and get write role.
3. **Work on a branch:** Create a new branch and add your changes. The branch `main` is protected against direct commits to keep the codebase clean, every commit there is a version deployed into the website.
4. **Submit the pull request:** Create a pull request. Don't forget to update the `changelog.md` and the version numbers accordingly. We will give you feedback.

> [!NOTE]
> If there is already a branch that is developing the next version, branch out instead from that branch instead of branching out from `main`.

## Technical background
The frontend consists of a *Single-Page App*:
   - One same *HTML* body for every view, not fetched every time the `href` changes.
   - *SASS* handling styling.
   - *React* in the background, without it being a proper dynamic *React* app.

And for the backend:
   - *VPS* with one core and `1GB` of *RAM.*
   - *MariaDB* as the database for everything.
   - *Nginx* as the web server, serving static files.
   - *Uvicorn* accommodating *FastAPI*
   - *FastAPI* handling the API requests.

## License
All rights reserved. See the `LICENSE.md` file for more information.