var exec = require('child_process').exec;

if (process.env.NODE_ENV != 'production') {
  process.exit(0);
}

exec('npm run build', function(err, stdout, stderr) {
  stdout && console.log(stdout);
  stderr && console.error(stderr);

  if (err !== null) {
    console.error(error);
    process.exit(1);
  }
});
