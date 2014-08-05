jsbp: James' front-end boilerplate
==================================

I wanted to play with [Gulp](http://gulpjs.com/), and I also wanted to better understand how to implement a decently-organised [Angular](https://angularjs.org/) setup within a build tool. These helped a lot:

- http://travismaynard.com/writing/getting-started-with-gulp
- http://mindthecode.com/lets-build-an-angularjs-app-with-browserify-and-gulp/

I hear [Yeoman](http://yeoman.io/)'s good for this sort of thing. It's no doubt easier to setup and safer to use than what I've hacked together here, but where's the fun in that?

[SASS](http://sass-lang.com/) + [Autoprefixer](https://github.com/ai/autoprefixer) + [source maps](https://developer.chrome.com/devtools/docs/css-preprocessors) ftw.

===

### Running locally
<br>
First, install [Gulp](http://gulpjs.com/) if you don't have it already:

```
$ npm install -g gulp
```
(You might need to run `$ sudo npm install -g gulp` if that doesn't work)

Next:

```
$ npm install
$ gulp start
```

This will build your app and start watching for changes at `http://localhost:5000` (which will be launched in your default browser after running `$ gulp start`).

Any changes to HTML, SCSS & JS will cause open browser sessions to reload.

===

### Stuff that happens

####HTML

- `app/pages/index.html` is the app's index page
- Folders can be added within `app/pages/` eg `app/pages/your-section-name/index.html`

Gulp sends your HTML into `build/` eg `build/index.html` and `build/your-section-name/index.html` (which you could visit at `http://localhost:5000/` and `http://localhost:5000/your-section-name/` respectively).

_TODO: Simple templating system?_

####CSS

- `app/css/` for all your SCSS
- `app/css/components/` for individual components or modules
- `app/css/shared/` for your most general rules (eg normalize.css, basic rules for html, body, etc)
- `app/css/utils/` for utilities (à la https://github.com/suitcss/utils)
- `app/css/variables.scss` for all your SASS variables
- `app/css/mixins/` for your SASS mixins

Any new components, shared or utils files you create must be imported within `app/css/main.scss`, which is the file Gulp processes to create your final stylesheet at `build/assets/css/main.css`.

Don't forget `@import 'variables';` at the top of any new files that include variables - and `@import 'mixins/your-mixin-name';` in any new files where you've used `@include your-mixin-name`, and so on.

####JS

- `app/js/app.js` is the main JS file
- `app/js/controllers`, `app/js/directives` & `app/js/services` for your Angular... controllers, directives & services!
- Require any new modules in `app/js/app.js` as follows:

```
require('./controllers/ng-welcome-controller');
require('./directives/ng-your-directive-here-directive');
// Require any new modules here, like so ^
```

- Add any new modules as dependencies of the main module:

```
var app = angular.module('myApp', [
    'ngWelcomeCtrl',
    'ngYourDirectiveHere'
    // Continue listing modules like so ^
]);
```

- Then make sure that you've added `ng-app="myApp"` to whatever HTML element makes sense - in my example `index.html` you'll find it attached to `<html>` like so:

```
<!doctype html>
<html lang="en" ng-app="myApp">
<head>
  <title>James' Boilerplate</title>
  <link href="/assets/css/main.css" rel="stylesheet">
</head>
```

Gulp uses `app/js/app.js` as the entry point for your JS app & squashes it all into `build/assets/app.js`.

===

_Powered by: [Gulp](http://gulpjs.com/) + [SASS](http://sass-lang.com/) + [Browserify](http://browserify.org/) + [Angular](https://angularjs.org/) + [more besides](https://github.com/jamesshedden/jsbp/blob/master/package.json)_