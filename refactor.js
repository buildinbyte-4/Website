const fs = require('fs');
const path = require('path');

const DIRECTORIES = ['./components', './app'];

const replacements = [
  // Typography
  { regex: /font-serif/g, replace: 'font-display' },
  
  // Backgrounds
  { regex: /bg-\[#(FDFBF7|FFFDF9|F5EFEB|F4EBE1|2C151A|2C1D11|1A0E09)\](\/\d+)?/gi, replace: 'bg-bg-primary-dark' },
  { regex: /bg-\[#800020\]/gi, replace: 'bg-accent-blue' },
  
  // Texts
  { regex: /text-\[#(4A0E17|800020)\]/gi, replace: 'text-accent-blue' }, // Wait, some of this should be primary. Let's do 4A0E17 as text-text-primary and 800020 as accent-blue
  { regex: /text-\[#5C4B3E\]/gi, replace: 'text-text-secondary' },
  { regex: /text-\[#8C7B6E\]/gi, replace: 'text-text-muted' },
  { regex: /text-\[#(2C1D11|1A0E09)\]/gi, replace: 'text-text-primary' },
  
  // Borders
  { regex: /border-\[#800020\](\/\d+)?/gi, replace: 'border-accent-blue' },
  { regex: /border-\[#E2D7C7\](\/\d+)?/gi, replace: 'border-border-subtle' },
];

// Special overrides for 4A0E17 which was dark red heading text
const specialReplacements = [
  { regex: /text-\[#4A0E17\]/gi, replace: 'text-text-primary' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Apply special replacements first
  for (const { regex, replace } of specialReplacements) {
    content = content.replace(regex, replace);
  }

  // Apply general replacements
  for (const { regex, replace } of replacements) {
    content = content.replace(regex, replace);
  }

  // Some cleanup for cases like bg-bg-primary-dark/20 -> bg-bg-surface-dark
  content = content.replace(/bg-bg-primary-dark\/[0-9]+/g, 'bg-bg-surface-dark');
  content = content.replace(/border-accent-blue\/[0-9]+/g, 'border-accent-blue/30');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

DIRECTORIES.forEach(processDirectory);
console.log('Refactor complete.');
