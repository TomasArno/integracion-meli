import app from "./app";
import { checkEnv } from "./utils/check-env";

checkEnv();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("server running on port:", PORT));
