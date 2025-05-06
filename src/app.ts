import "reflect-metadata";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { PostgresDatabase } from "./data";

async function main() {
  const postgres = new PostgresDatabase({
    host: "ep-still-union-a47lgesa-pooler.us-east-1.aws.neon.tech",
    port: 5432,
    username: "vetcaregen42_owner",
    password: "npg_SgoRqJOBI5u1",
    database: "vetcaregen42",
  });

  await postgres.connect();

  const server = new Server({
    port: 3000,
    routes: AppRoutes.routes,
  });

  await server.start();
}

main();
