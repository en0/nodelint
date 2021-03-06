/*
 * Nodelint Textmate summary reporter
 *
 * Runs JSLint on a TextMate save through a source.js file.
 * If there is 1-2 errors it will print out the results through a tooltip.
 * If there are more than 5 errors it will only print out a summary.
 * If there are no errors, nothing will happen.
 *
 * The Command:
 * node "/path/to/nodelint/nodelint" "$TM_FILEPATH" \
 *     --config "$TM_BUNDLE_SUPPORT/bin/path/to/config.js" \
 *     --reporter "$TM_BUNDLE_SUPPORT/bin/path/to/summary_reporter.js"
 *
 * Invoked by "⌘S"
 * @author Matthew Kitt
 *
 * For setup instructions see: https://github.com/tav/nodelint/wiki/Editor-and-IDE-integration
 *
 * Released into the Public Domain by tav <tav@espians.com>
 * See the README.md for full credits of the awesome contributors!
 */

/**
 * Module dependencies
 */
var util = require('util');

/**
 * Reporter info string
 */
exports.info = "Textmate full HTML reporter";

/**
 * Report linting results to the command-line.
 *
 * @api public
 *
 * @param {Array} results
 */
exports.report = function report(results) {
  var
    len = results.length,
    output = '',
    getOutput = function () {
      var
        error_regexp = /^\s*(\S*(\s+\S+)*)\s*$/,
        i,
        len = results.length,
        output = '',
        file,
        error;

      for (i = 0; i < len; i += 1) {
        file = results[i].file;
        file = file.substring(file.lastIndexOf('/') + 1, file.length);
        error = results[i].error;

        output += file  + ': line ' + error.line +
                  ', character ' + error.character + ', ' +
                  error.reason + '\n' +
                  (error.evidence || '').replace(error_regexp, "$1") + '\n\n';
      }
      return output;
    };

  if (len > 0 && len < 2) {
    output += getOutput();
  }
  output += len + ' error' + ((len === 1) ? '' : 's');

  if (len > 0) {
    util.puts(output);
  }
};
