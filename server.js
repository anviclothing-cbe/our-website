// server.js - Root entry file for Node.js deployment platforms like Hostinger
import("./server/dist/index.mjs").catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
