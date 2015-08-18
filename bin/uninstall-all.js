var fs = require('fs');
var path = require('path');
var resolve = path.resolve;
var join = require('path').join;
var cp = require('child_process');

/*---- Functions ----*/

/**
 * Checks whether a path starts with or contains a hidden file or a folder.
 * @param {string} source - The path of the file that needs to be validated.
 * returns {boolean} - `true` if the source is blacklisted and otherwise `false`.
 */
var isUnixHiddenPath = function (path) {
    return (/(^|\/)\.[^\/\.]/g).test(path);
};

/**
  * Get only the directories froma path.
  * @param {String} srcpath Path for the directorie to be analised.
  * @return {Array}
  */
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  }).filter(function (path) {
    return !isUnixHiddenPath(path);
  });
}

/**
  * Uninstall all npm packages found in a directorie.
  * @param {String} modulePath Path to the module to be uninstalled.
  */
function uninstallPackages(modulePath) {
  var modNodePath = join(modulePath, 'node_modules');

  // ensure path has node_modules
  if (!fs.existsSync(modNodePath)) {
   return;
 }

  // Uninstall each package
  getDirectories(modNodePath).forEach(function (pkg) {
    cp.spawn('npm', ['uninstall', pkg],
     { env: process.env, cwd: modulePath, stdio: 'inherit' });
  });
}


/*---- Program ----*/

// Uninstall lib Packages
var lib = resolve(__dirname, '../lib/');

fs.readdirSync(lib).forEach(function (mod) {
  var modPath = join(lib, mod);
  uninstallPackages(modPath);
});

// Uninstall main Packages
uninstallPackages('./');
