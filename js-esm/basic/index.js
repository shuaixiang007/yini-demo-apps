/*
    This script loads and parses a config.yini
    file then prints its contents using ES Modules.
*/

import YINI from 'yini-parser';

try {
    // Parse the YINI config file.
    const config = YINI.parseFile('./config.yini');

    // If you want to parse the file in strict mode, use this line instead:
    // const config = YINI.parseFile(file, true);

    // Print some value in the config.
    console.log('Title = '+config.App.title)
    console.log('UserName = '+config.Server.Login.username)
    console.log()

    // Print the result.
    console.log('Parsed config:');
    console.log(config)

    console.log('Parsed config as JSON:');
    console.log(JSON.stringify(config, null, 2));
} catch (error) {
    console.error('Error parsing config.yini:', error.message);
}
