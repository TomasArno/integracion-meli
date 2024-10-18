import "./utils/check-env";
import syncDb from "./database/sync";
import app from "./app";

(() => {
  syncDb();

  const PORT = process.env.PORT;

  app.listen(PORT, () => console.log("server running on port:", PORT));
})();
