<script>
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { HBox, Button } from 'fabkit';

let items = $derived.by(() => {
const pathname = $page.url.pathname;
const parts = pathname.split('/').filter(Boolean);
const out = [{ label: 'Home', href: '/' }];
let acc = '';
for (const p of parts) {
acc += `/${p}`;
out.push({ label: p, href: acc });
}
return out;
});
</script>

<HBox class="Breadcrumbs" align="center" spacing={6}>
{#each items as it, i (it.href)}
<Button
variant="flat"
label={it.label}
padding={[4, 8, 4, 8]}
onClick={() => goto(it.href)}
style={i === items.length - 1 ? 'pointer-events:none; opacity: 0.7;' : ''}
/>
{/each}
</HBox>

<style>
	:global(.Breadcrumbs) {
		flex-wrap: wrap;
	}
</style>
