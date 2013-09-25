var wd = require('wd'),
    fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    async = require('async'),
    browserify = require('browserify'),
    runner = require('wd-tap-runner'),
    createMonitor = require('watch').createMonitor,
    _ = require('lodash');

function source(config) {
    var file = config.source;
    if (config.browserify) {
        return function(callback) {
            callback(null, browserify([config.source]).bundle());
        };
    } else {
        return function(callback) {
            callback(null, fs.createReadStream(config.source));
        };
    }
}

function run(config) {
    var events = new EventEmitter();

    process.nextTick(function() {
        async.eachSeries(config.browsers, runBrowser, done);
    });

    return events;

    function runBrowser(capabilities, callback) {
        events.emit('begin', capabilities);

        var browser = wd.remote(config.server);
        browser.init(capabilities, init);

        function init(err) {
            if (err) {
                return callback(err);
            }

            runner(source(config), browser, ran);
        }

        function ran(err, results) {
            browser.quit(function() {
                if (err) {
                    return callback(err);
                }

                events.emit('results', results);
                callback();
            });
        }
    }

    function done(err) {
        if (err) {
            events.emit('error', err);
        }

        events.emit('end');
    }
}

function watch(config) {
    var events = new EventEmitter();

    var running = false,
        shouldRun = false;

    createMonitor(process.cwd(), function(monitor) {
        var throttled = _.debounce(runTests, 500);
        monitor.on('changed', throttled);
        monitor.on('created', throttled);
        monitor.on('deleted', throttled);
    });

    process.nextTick(function() {
        runTests();
    });

    return events;

    function runTests() {
        if (running) {
            shouldRun = true;
            return;
        }

        running = true;
        var runner = run(config);
        events.emit('run', runner);
    }

    function done(err) {
        if (err) {
            events.emit('error', err);
        }

        running = false;

        if (shouldRun) {
            shouldRun = false;
            runTests();
        }
    }
}

module.exports = {
    run: run,
    watch: watch
};
