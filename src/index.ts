import dataSource from "./db";
import app from "./app";

const morgan = require("morgan");
app.use(morgan("tiny"));

async function main() {
  try {
    await dataSource.initialize();
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (e) {
    console.log(e);
  }
}

main();
