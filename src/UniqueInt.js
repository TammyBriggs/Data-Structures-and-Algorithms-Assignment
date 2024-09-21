class UniqueInt {
    static processFile(inputFilePath, outputFilePath) {
        const fs = require('fs');
        const inputStream = fs.createReadStream(inputFilePath);
        const outputStream = fs.createWriteStream(outputFilePath);
        const uniqueIntegers = new Set();
        
        inputStream.on('data', (chunk) => {
            const lines = chunk.toString().split('\n');
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (this.isValidInteger(trimmedLine)) {
                    uniqueIntegers.add(parseInt(trimmedLine));
                }
            });
        });

        inputStream.on('end', () => {
            const sortedUniqueIntegers = Array.from(uniqueIntegers).sort((a, b) => a - b);
            sortedUniqueIntegers.forEach(num => outputStream.write(num + '\n'));
            outputStream.end();
        });
    }

    static isValidInteger(line) {
        // Check if line is a valid integer
        return /^-?\d+$/.test(line);
    }
}

// Example usage
const inputFilePath = '/dsa/hw01/sample_inputs/sample_input_02.txt';
const outputFilePath = '/dsa/hw01/sample_results/sample_input_02.txt_results.txt';
UniqueInt.processFile(inputFilePath, outputFilePath);
