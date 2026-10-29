const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'global badariya.html');
const logoPath = path.join(root, 'GlobalLogoB.png');
const outputPath = path.join(root, 'src', 'webview', 'originalHtml.js');

let html = fs.readFileSync(htmlPath, 'utf8');
const logoData = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;
html = html.replaceAll('GlobalLogoB.png', logoData);

const pageSwitch = "$('#top').style.display=i==0?'flex':'none';if(i==3";
const pageSwitchWithStatus = "$('#top').style.display=i==0?'flex':'none';if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(i===0?'home':i===3?'profile':'page');if(i==3";
if (!html.includes(pageSwitch)) throw new Error('Could not find the page switch in global badariya.html');
html = html.replace(pageSwitch, pageSwitchWithStatus);

const androidBackSupport = '<script>window.__gbHandleBack=()=>{if(ep.classList.contains("on")){closeEdit();return true}if(dr.classList.contains("on")){dr.classList.remove("on");return true}if($("#sp")){done();return true}return false};</script>';
if (!html.includes('</body>')) throw new Error('Could not find the closing body tag in global badariya.html');
html = html.replace('</body>', `${androidBackSupport}</body>`);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `export default ${JSON.stringify(html)};\n`, 'utf8');
