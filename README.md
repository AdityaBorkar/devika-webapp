## Patch for `@electric-sql/pglite`
---
- Search String: `new URL\(".*?",\s*import\.meta\.url\)`
- Find in: `node_modules/@electric-sql/pglite/**.chunk.js`
- Replace `import.meta.url` with `BASE_URL`
- Replace `BASE_URL` variable with the value `self.location.origin`


## Fix for `drizzle-orm`
---
- Path: `onDelete: 'cascade'` in `auth.generated.ts`
- Replace with `onDelete: 'cascade'`
