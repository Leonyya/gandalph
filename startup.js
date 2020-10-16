const {series} = require('async');
const {exec} = require('child_process');

series([
 () => exec('yarn watch'),
 () => exec('yarn run:dev')
]); 
