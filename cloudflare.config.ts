import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    "name": "hawksworx-com",
    "compatibilityDate": "2026-10-01",
    "observability": {
      "enabled": true
    }
  }
});
