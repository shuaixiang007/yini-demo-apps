const path = require('path');
const YINI = require('yini-parser');

// Path to your config file.
const file = path.join(__dirname, 'config.yini');

try {
    // Parse the YINI file.
    const parsed = YINI.parseFile(file);

    // If you want to parse in strict-mode, replace above with the below:
    // const parsed = YINI.parseFile(file, true);

    // Print some value in the config.
    console.log('Title = '+parsed.App.title)
    console.log('UserName = '+parsed.Server.Login.username)
    console.log()

    // Print the full result.
    console.log('Parsed config:');
    console.log(JSON.stringify(parsed, null, 2));
} catch (error) {
    console.error('Error parsing config.yini:', error.message);
}
