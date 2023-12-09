const { exec } = require("child_process");
const dotenv = require("dotenv");
dotenv.config();

const atlasConnectionString = process.env.MONGO_ATLAS_URI;
const dbName = process.env.MONGO_DB_NAME;
const dumpDir = process.env.MONGO_DUMP_DIR;

const restoreCommand = `mongorestore --uri="${atlasConnectionString}" --db=${dbName} ${dumpDir}/${dbName}`;

exec(restoreCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
