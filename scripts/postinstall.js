var exec = require('child_process').exec;

if (['production', 'staging'].indexOf(process.env.NODE_ENV) === -1) {
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
