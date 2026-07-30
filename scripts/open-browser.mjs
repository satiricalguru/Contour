import { exec } from 'node:child_process';

const url = 'http://localhost:3000';
const startCommand =
  process.platform === 'darwin'
    ? `open "${url}"`
    : process.platform === 'win32'
    ? `start "${url}"`
    : `xdg-open "${url}"`;

setTimeout(() => {
  exec(startCommand, () => {});
}, 1800);
