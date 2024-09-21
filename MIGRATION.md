# Migration

Since we are running reactstrap/bootstrap 4, we are starting with a clone of that. This will allow us to switch the entire app from using `reactstrap` to using `@harvest-profit/npk` instead. Then we can start the process of customizing and improving the shared components we use all over the app.

A great example of why this is important is our `Button` use. We have like 10 different variations of the same set of buttons all that are just outside of what bootstrap determines their variants are. The intention is to migrate all of our buttons first to using css-modules + css variables to support a wider range of buttons. Additionally, we'll have documentation specifically around why and when to use certain buttons and add better support for things like loading states, counters, and icons in buttons.

Following that, we'll migrate our `Card` and `Table` components over for the same reason.

## Why CSS Modules?

CSS Modules will allow us to version and avoid collisions with the **base** styles in this repo. Also, css has come a long way since we last used modules. 

Using css rules like `:where(.Button)` allows us to style items in a low priority way, so if we need to customize it with extra styles, we don't need a bunch of `!important` styles everywhere.

CSS Variables also allow us to theme all of these components literally removing the need to even use SCSS. SCSS is basically just a massive macro system, colors are hardcoded into each style. CSS variables can change on the fly leading to much much smaller css files.