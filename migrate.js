const umzug = require('./umzug');

async function runMigrations(action) {
  try {
    if (action === 'up') {
      await umzug.up();
    } else if (action === 'down') {
      await umzug.down();
    } else if (action === 'redo'){
        await umzug.down({to: 0});
        await umzug.up();
    } else if (action === 'create'){
        console.log("Create migration feature is not implemented in this example.");
    } else {
      console.error('Invalid action. Use "up" or "down".');
    }
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

const action = process.argv[2];
runMigrations(action);