const fs = require('fs');
const path = require('path');

const cacheNodeModulesPath = path.join(__dirname, '..', 'node_modules', '.cache');

if (fs.existsSync(cacheNodeModulesPath)) {
    fs.rmSync(cacheNodeModulesPath, { recursive: true, force: true });
    console.log(`Удалена папка: ${cacheNodeModulesPath}`);
} else {
    console.log(`Папка ${cacheNodeModulesPath} не найдена.`);
}
