# fabkit Examples

A Svelte (v5) example project demonstrating fabkit usage.

Setup
- Install: `npm install`
- Run dev: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

Using fabkit
```js
// src/routes/+page.svelte or any component
<script>
  import { initTheme, Button, Skeleton } from 'fabkit';
  initTheme({ colors: { primary: '#6366f1' }, dimensions: { borderRadius: 12, spacing: 8 } });
</script>

<Skeleton padding={[12,16,12,16]} borderWidth={[1,1,1,1]} borderColor={["#e5e7eb","#e5e7eb","#e5e7eb","#e5e7eb"]} bg="white" bgHover="#f9fafb">
  <Button>Click me</Button>
</Skeleton>
```

Notes
- Depends on `fabkit` from GitHub (main branch).
- Ensure your SSH access to GitHub is configured.
