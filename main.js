const mosca = require('mosca')
const blessed = require('blessed')
const express = require('express')
const { exec } = require('child_process');

exec('npm run build', (err, stdout, stderr) => {
  if (err) {
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

/*let screen = blessed.screen({
    smartCSR: true
})
screen.title = 'mqBot deploying'

let box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: 'mqBot setting up',
    tags: true,
    border: {
        type:'line'
    },
    style: {
        fg: 'white',
        bg: 'magenta',
        border: {
            fg: '#f0f0f0'
        },
        hover: {
            bg:'green'
        }
    }
})

// Entry render settings 
screen.append(box)
box.focus()
screen.render()


// Escape rutine
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
*/
