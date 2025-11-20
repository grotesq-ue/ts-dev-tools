import { defineConfig } from "bunup";
import { copy } from "bunup/plugins";

export default defineConfig({
  shims: true,
  unused: true,
  minify: true,
  plugins: [
    copy(["README.md", "LICENSE.md"]),
  ],
});
