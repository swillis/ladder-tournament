jsbp: James' front-end boilerplate
==================================

I wanted to play with Gulp, and I also wanted to better understand how to implement a decently-organised Angular setup within a build tool. These helped a lot:

- http://travismaynard.com/writing/getting-started-with-gulp
- http://mindthecode.com/lets-build-an-angularjs-app-with-browserify-and-gulp/

_Powered by: Gulp + SASS + Browserify + Angular_

### Running locally

```
$ npm install
$ gulp start
```

This will build your app and start watching for changes at `http://localhost:5000` (which will be launched in your default browser after running `$ gulp start`.

Any changes to HTML, SCSS & JS will cause open browser sessions to reload - currently seems to be a bit slow and occasionally unresponsive for JS.

### How it works (sort of)

####HTML

- `app/pages/index.html` is the app's index page
- Folders can be added within `app/pages/` eg `app/pages/your-section-name/index.html`

Gulp sends your HTML into `build/` eg `build/index.html`, `build/your-section-name/index.html`.

####CSS

- `app/css/` for all your SCSS
- `app/css/components/` for individual components or modules
- `app/css/shared/` for your most general rules (eg html, body)
- `app/css/utils/` for utilities (à la https://github.com/suitcss/utils)
- `app/css/variables.scss` for all your SASS variables
- `app/css/mixins/` for your SASS mixins

Any new components, shared or utils files you create must be imported in `app/css/main.scss` - it's this file which Gulp processes to create `build/assets/css/main.css`

Reminder: any new SCSS files you create that use variables need to `@import 'variables';` at the top, and if they include any mixins you've added, they need to `@import 'mixins/your-mixin-name'` as well!

####JS

`app/js/` -> `build/assets/app.js`

Instructions coming soon! ie When I improve the Angular setup.