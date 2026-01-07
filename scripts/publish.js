#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log('📦 DateX Publishing Script\n');

    // Check if we're in the right directory
    if (!fs.existsSync('package.json')) {
        console.error('❌ package.json not found. Run this script from the project root.');
        process.exit(1);
    }

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log(`Package: ${packageJson.name}@${packageJson.version}`);

    // Check if user is logged in to npm
    try {
        const whoami = execSync('npm whoami', { encoding: 'utf8' }).trim();
        console.log(`Logged in as: ${whoami}`);
    } catch (error) {
        console.error('❌ Not logged in to npm. Run: npm login');
        process.exit(1);
    }

    // Check git status
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        if (status.trim()) {
            console.warn('⚠️  Working directory is not clean:');
            console.log(status);
            const proceed = await question('Continue anyway? (y/N): ');
            if (proceed.toLowerCase() !== 'y') {
                console.log('Aborted.');
                process.exit(0);
            }
        }
    } catch (error) {
        console.warn('⚠️  Could not check git status');
    }

    // Run tests
    console.log('\n🧪 Running tests...');
    try {
        execSync('npm test', { stdio: 'inherit' });
        console.log('✅ Tests passed');
    } catch (error) {
        console.error('❌ Tests failed');
        const proceed = await question('Continue anyway? (y/N): ');
        if (proceed.toLowerCase() !== 'y') {
            process.exit(1);
        }
    }

    // Run linting
    console.log('\n🔍 Running linter...');
    try {
        execSync('npm run lint', { stdio: 'inherit' });
        console.log('✅ Linting passed');
    } catch (error) {
        console.error('❌ Linting failed');
        const proceed = await question('Continue anyway? (y/N): ');
        if (proceed.toLowerCase() !== 'y') {
            process.exit(1);
        }
    }

    // Build
    console.log('\n🏗️  Building...');
    try {
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Build completed');
    } catch (error) {
        console.error('❌ Build failed');
        process.exit(1);
    }

    // Confirm publication
    console.log(`\n📋 Ready to publish ${packageJson.name}@${packageJson.version}`);
    const confirm = await question('Proceed with publication? (y/N): ');

    if (confirm.toLowerCase() !== 'y') {
        console.log('Publication cancelled.');
        process.exit(0);
    }

    // Publish
    console.log('\n🚀 Publishing to npm...');
    try {
        execSync('npm publish', { stdio: 'inherit' });
        console.log('✅ Published successfully!');
    } catch (error) {
        console.error('❌ Publication failed');
        process.exit(1);
    }

    // Create git tag
    try {
        const tagName = `v${packageJson.version}`;
        execSync(`git tag ${tagName}`, { stdio: 'inherit' });
        execSync(`git push origin ${tagName}`, { stdio: 'inherit' });
        console.log(`✅ Created and pushed git tag: ${tagName}`);
    } catch (error) {
        console.warn('⚠️  Could not create git tag');
    }

    console.log('\n🎉 Publication complete!');
    console.log(`\nNext steps:`);
    console.log(`- Update CHANGELOG.md`);
    console.log(`- Create GitHub release`);
    console.log(`- Update documentation if needed`);

    rl.close();
}

main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});