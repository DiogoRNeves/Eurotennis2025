// TODO: move to node-config package
import * as fs from 'fs';
import * as path from 'path';
import { AppSettings } from './settings';

// Path to the appsettings.json file
const appSettingsPath = path.join(__dirname, '../appsettings.json');

// Load the appsettings.json file
const getFileSettings = (): AppSettings => {
  try {
    const fileContent = fs.readFileSync(appSettingsPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.warn('Could not load appsettings.json, using default settings.');
    // Return a default object if the file doesn't exist or is invalid
    return {
        databaseUrl: 'dafault_url',
        databasePort: 3306,
        databaseUser: 'default_user',
        databasePassword: 'default_password',
        databaseName: 'default_db',
        appPort: 3000
    };
  }
};

const fileSettings: AppSettings = getFileSettings();

// Export a settings object that prioritizes environment variables
export const settings: AppSettings = fileSettings;