import app from "./app";
import { getConfig } from "./common/config";
import { execSync } from "child_process";
import path from "path";

if (!getConfig("PORT")) {
  process.exit(1);
}

const PORT: number = parseInt(getConfig("PORT") as string, 10);

async function main() {
  // Build the database connection string
  console.log("Building database connection string");
  const dbHost = getConfig("DB_HOST") || "localhost";
  const dbPort = getConfig("DB_PORT") || 5432;
  const dbName = getConfig("DB_NAME") || "postgres";
  const dbUser = getConfig("DB_USER") || "postgres";
  const dbPassword = getConfig("DB_PASSWORD") || "password";
  const dbConnectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
  // Set DATABASE_URL environment variable
  process.env.DATABASE_URL = dbConnectionString;

  // Run prisma migrations
  console.log("Migrating database...");
  execSync(
    `export DATABASE_URL=${dbConnectionString} && npx prisma migrate deploy --schema ${path.join(
      __dirname,
      "../prisma/schema.prisma"
    )}`,
    { stdio: "inherit" }
  );

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 App started in ${getConfig("MODE")} mode on port ${PORT}.`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
