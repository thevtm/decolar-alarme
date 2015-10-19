var fs = require('fs');
var resolve = require('path').resolve;
var join = require('path').join;
var cp = require('child_process');

// GIT Submodules
cp.spawnSync('git', ['submodule', 'init'], { env: process.env, cwd: __dirname, stdio: 'inherit' });
cp.spawnSync('git', ['submodule', 'update'], { env: process.env, cwd: __dirname, stdio: 'inherit' });

// get library path
var lib = resolve(__dirname, '../lib/');

fs.readdirSync(lib).forEach(function (mod) {
  var modPath = join(lib, mod);

  // ensure path has package.json
  if (!fs.existsSync(join(modPath, 'package.json'))) {
   return;
  }

  // install folder
  cp.spawn('npm', ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
});
