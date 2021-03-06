/*
 * Nodelint tests for both files and directories
 *
 * Released into the Public Domain by tav <tav@espians.com>
 * See the README.md for full credits of the awesome contributors!
 */

/**
 * Module dependencies
 */
var helper = require('./helper');

/**
 * Test for both files and directories
 *
 * @param test
 */
exports.DirAndFile = function (test) {
  helper.testConsoleOutput(
    './nodelint',
    [
      __dirname + '/fixtures/',
      __dirname + '/test-dir-and-file.js'
    ],
    {
      stdout: '0 errors\n',
      stderr: '',
      exitCode: 0
    },
    test
  );
};

