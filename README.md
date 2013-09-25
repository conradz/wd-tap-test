# wd-tap-test(1)

Run TAP tests in the browser from your console using WebDriver. It uses a
Selenium server to start and automate the browsers. The test file must output
TAP-compatible output in the browser with `console.log`.

Note that you *must* have a Selenium server running to be able to start and
automate the browsers.

## Install

Use NPM to install:

    npm install -g wd-tap-test

## Usage

```
Usage: wd-tap-test <command> [browsers]... [options]

command      one of: watch, run
browsers     Browsers to run the tests in

Options:
   --server           Selenium server address  [localhost]
   -s, --source       JS file that includes tests  [test.js]
   -b, --browserify   Browserify source before serving
```

## Examples

Run the `test.js` file in Chrome and Firefox:

    wd-tap-test run chrome firefox

Run the `my-tests.js` file in Chrome:

    wd-tap-test run -s my-tests.js chrome

Browserify and run the `test.js` file in Firefox:

    wd-tap-test run -b

Watch the current directory for changes and run the `test.js` file in Chrome
whenever a file changes:

    wd-tap-test watch chrome
