const fs = require('fs');
const { Keypair } = require('@solana/web3.js');

// Function to generate N Solana wallets
async function generateWallets(numWallets, outputFile = 'wallets.csv') {
    try {
        const wallets = [];

        for (let i = 0; i < numWallets; i++) {
            const keypair = Keypair.generate();
            const publicKey = keypair.publicKey.toString();
            const secretKey = `[${keypair.secretKey.toString()}]`; // JSON array format

            wallets.push({ publicKey, secretKey });
        }

        // Convert wallets to CSV format
        const csvData = [
            'PublicKey,SecretKey',
            ...wallets.map(w => `${w.publicKey},"${w.secretKey}"`)
        ].join('\n');

        // Write to file
        fs.writeFileSync(outputFile, csvData);
        console.log(`Successfully generated ${numWallets} wallets and saved to ${outputFile}`);
    } catch (err) {
        console.error('Error generating wallets:', err.message);
    }
}

// Get command-line arguments
const args = process.argv.slice(2);
const numWallets = parseInt(args[0], 10);
const outputFile = args[1] || 'wallets.csv';

if (isNaN(numWallets) || numWallets <= 0) {
    console.error('Please provide a valid number of wallets to generate.');
    process.exit(1);
}

// Generate wallets
generateWallets(numWallets, outputFile);
