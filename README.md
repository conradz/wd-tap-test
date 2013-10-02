# wd-tap-test(1)

[![NPM](https://nodei.co/npm/wd-tap-test.png?compact=true)](https://nodei.co/npm/wd-tap-test/)

[![Build Status](https://drone.io/github.com/conradz/wd-tap-test/status.png)](https://drone.io/github.com/conradz/wd-tap-test/latest)
[![Dependency Status](https://gemnasium.com/conradz/wd-tap-test.png)](https://gemnasium.com/conradz/wd-tap-test)

Run [TAP](http://testanything.org/wiki/index.php/Main_Page) tests in the
browser from your console using WebDriver. It uses a
[Selenium Server](http://docs.seleniumhq.org/download/) to launch and automate
the browsers. The test file must output TAP-compatible output when running in
the browser with `console.log`.

Note that you *must* have a Selenium Server running.

## Install

Use NPM to install:

    npm install -g wd-tap-test

## Options

    wd-tap-test <options> [browsers...]

 * `browsers`: The names of the browsers to run the tests in (`firefox`,
   `chrome`, etc.). Each browser name will be passed to the Selenium Server in
   the `browserName` option when launching the browser.  Defaults to `firefox`.
 * `-w, --watch`: Watch the current directory for changes and run tests when
   any file changes.
 * `-b, --browserify`:
   [Browserify](https://github.com/substack/node-browserify) the source file
   before serving to the browser.
 * `-s, --source`: Specify the source file that contains the tests. Defaults to
   `test.js`.
 * `--server`: Specify the Selenium Server address to use.
 * `-?, --help`: Show the help message

## Examples

Run the `test.js` file in Firefox:

    wd-tap-test

Run the `my-tests.js` file in Firefox and Chrome:

    wd-tap-test -s my-tests.js firefox chrome

Browserify and run the `test.js` file in Firefox:

    wd-tap-test -b

Watch the current directory for changes and run the `test.js` file in Chrome
whenever a file changes:

    wd-tap-test -w chrome

