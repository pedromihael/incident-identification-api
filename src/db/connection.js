const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./kickoff.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
  if (err) {
    return console.error('Cant connect to db', err.message);
  }
  console.log('Connected to the kickoff SQlite database.');
});

db.close((err) => {
  if (err) {
    return console.error('Cant close db connection', err.message);
  }
  console.log('Close the database connection.');
});
