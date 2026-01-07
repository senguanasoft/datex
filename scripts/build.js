#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building DateX...\n');

// Clean dist directory
console.log('🧹 Cleaning dist directory...');
if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
}

// Run TypeScript compilation
console.log('📝 Compiling TypeScript...');
try {
    execSync('tsc --emitDeclarationOnly', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ TypeScript compilation failed');
    process.exit(1);
}

// Run Rollup build
console.log('📦 Building with Rollup...');
try {
    execSync('rollup -c', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Rollup build failed');
    process.exit(1);
}

// Copy additional files
console.log('📋 Copying additional files...');
const filesToCopy = ['README.md', 'LICENSE', 'package.json'];

filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join('dist', file));
        console.log(`   ✓ Copied ${file}`);
    }
});

// Validate build
console.log('\n🔍 Validating build...');
const requiredFiles = [
    'dist/index.js',
    'dist/index.esm.js',
    'dist/index.d.ts',
    'dist/index.css'
];

let buildValid = true;
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        console.log(`   ✓ ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
    } else {
        console.log(`   ❌ Missing: ${file}`);
        buildValid = false;
    }
});

if (buildValid) {
    console.log('\n✅ Build completed successfully!');

    // Show bundle sizes
    const jsSize = fs.statSync('dist/index.js').size;
    const esmSize = fs.statSync('dist/index.esm.js').size;
    const cssSize = fs.statSync('dist/index.css').size;

    console.log('\n📊 Bundle sizes:');
    console.log(`   CJS: ${(jsSize / 1024).toFixed(1)}KB`);
    console.log(`   ESM: ${(esmSize / 1024).toFixed(1)}KB`);
    console.log(`   CSS: ${(cssSize / 1024).toFixed(1)}KB`);
    console.log(`   Total: ${((jsSize + cssSize) / 1024).toFixed(1)}KB`);
} else {
    console.log('\n❌ Build validation failed!');
    process.exit(1);
}