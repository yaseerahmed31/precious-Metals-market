// final-verification.cjs
const fs = require('fs');

console.log('🧪 Final Verification: Precious Metals Market Demo\n');
console.log('='.repeat(50));

const results = { passed: 0, failed: 0, tests: [] };

function test(name, condition, details = '') {
    const passed = typeof condition === 'function' ? condition() : condition;
    results.tests.push({ name, passed, details });
    if (passed) {
        results.passed++;
        console.log(`✅ ${name}`);
    } else {
        results.failed++;
        console.log(`❌ ${name}`);
        if (details) console.log(`   └─ ${details}`);
    }
}

// Check Core Files
const coreFiles = [
    'App.tsx',
    'services/priceService.ts',
    'services/productService.ts',
    'services/orderService.ts',
    'components/RoleBasedRoute.tsx',
    'components/Navbar.tsx',
    'components/Account.tsx',
    'pages/Checkout.tsx',
    'pages/MarketPage.tsx',
    'pages/ProductPage.tsx',
    'firestore.rules'
];

coreFiles.forEach(file => {
    test(`File exists: ${file}`, fs.existsSync(file));
});

// Check Critical Imports/Exports
const checks = [
    { file: 'services/priceService.ts', content: 'getSimulatedPrices' },
    { file: 'services/productService.ts', content: 'getProducts' },
    { file: 'services/orderService.ts', content: 'createOrder' },
    { file: 'App.tsx', content: 'CheckoutPage' },
    { file: 'firestore.rules', content: 'service cloud.firestore' }
];

checks.forEach(check => {
    try {
        const content = fs.readFileSync(check.file, 'utf8');
        test(`Content check: ${check.file} contains ${check.content}`, content.includes(check.content));
    } catch (e) {
        test(`Content check: ${check.file} contains ${check.content}`, false, 'File not found');
    }
});

// Report
console.log('\n' + '='.repeat(50));
console.log(`📊 Results: ${results.passed}/${results.passed + results.failed} tests passed`);

if (results.failed === 0) {
    console.log('\n🎉 Final Verification Successful! Ready for deployment/demo.');
} else {
    console.log('\n⚠️ Some verification checks failed. Please review.');
    process.exit(1);
}
