## What is it

*Abscissa* is a website in which you can **practice your math skills** and learn in an interactive way. Think of *LeetCode* but for math. We aim to provide real-world math practice that really challenges you, not some easy multiple choice questions.

And to accomplish our goal we are also developing [*Mathsys,*](https://github.com/alejandro-vaz/mathsys) which aims to be the programming language for math. It is meant to be simple yet powerful.

It is currently on the early stages, so don't get too motivated. This is an alpha and most of the features that will be available on the final product are not even close to being developed just yet.

**We ship every Sunday.**

Check it out live on [*our website.*](https://abscissa.eu)

I say *we* but I'm indeed a solo developer for now.


## Technical background

The frontend consists of a *Single-Page App*:

- One same *HTML* body for every view, not fetched every time the `href` changes.
- *Tailwind CSS* handling static styling whilst *Motion* manages animations.
- *React* for *DOM* manipulation.

And for the backend:

- *VPS* with one core and `1GB` of *RAM.*
- *MariaDB* as the database for everything.
- *Nginx* as the web server, serving static files.
- *Uvicorn* accommodating *FastAPI*
- *FastAPI* handling the API requests.