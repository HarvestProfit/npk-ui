# NPK UI

Design system built for Harvest Profit.

Seeing as we are currently running reactstrap (bootstrap4), it's easier to migrate the design system slowly from a custom version of reactstrap until ultimately every component is rebuilt in the new design system.

![NPM Version](https://img.shields.io/npm/v/%40harvest-profit%2Fnpk)


## Getting Started

Use `npm install` and follow that up with `npm start` to start the storyboard server. It'll open automatically for you.

## Linking to Harvest Profit

To try out your changes in Harvest Profit, run the following:

```
npm run build
cd ../marketingplan
yarn add link:./../npk-ui
```

This will create a symlink to the node_modules in marketingplan and will then use your version in development. Run `npm run build` inside this repo whenever you make changes you want to test out.
