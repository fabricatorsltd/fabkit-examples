<script>
import * as Icons from 'fabkit';
import { Clamp, Grid, Card, VBox, HBox, Text, SearchField, NumberField, Button } from 'fabkit';
import { PhCopy } from 'fabkit';

const allIcons = Object.entries(Icons)
.filter(([name]) => name.startsWith('Ph'))
.map(([name, component]) => ({
name,
label: name.slice(2).replace(/([A-Z])/g, ' $1').trim(),
component
}))
.sort((a, b) => a.name.localeCompare(b.name));

let query = $state('');
let copiedName = $state('');
let iconSize = $state(24);

const filtered = $derived.by(() => {
const q = query.trim().toLowerCase();
if (!q) return allIcons;
return allIcons.filter(
(icon) =>
icon.label.toLowerCase().includes(q) || icon.name.toLowerCase().includes(q)
);
});

function copyToClipboard(name) {
navigator.clipboard?.writeText(`<${name} />`).then(() => {
copiedName = name;
setTimeout(() => {
copiedName = '';
}, 1200);
});
}
</script>

<Clamp max={1200} margin={[0, 16, 40, 16]}>
<VBox spacing={18} align="fill" padding={[28, 0, 0, 0]}>
<HBox align="center" justify="space-between" spacing={12} style="flex-wrap: wrap;">
<VBox spacing={6}>
<Text style="font-weight: 700;">Icons</Text>
<Text style="color: var(--text-secondary);">{filtered.length} / {allIcons.length}</Text>
</VBox>

<HBox align="center" spacing={12} style="flex-wrap: wrap;">
<SearchField bind:value={query} placeholder="Search icons…" />
<NumberField label="Size" bind:value={iconSize} min={16} max={64} flat />
</HBox>
</HBox>

<Grid gap={10} style="grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));">
{#each filtered as icon (icon.name)}
{@const IconComp = icon.component}
<Card
padding={[12, 12, 12, 12]}
style={copiedName === icon.name ? 'outline: 2px solid var(--action-suggested);' : ''}
>
<VBox spacing={10} align="fill">
<HBox align="center" justify="space-between">
<IconComp size={iconSize} />
<Button
variant="flat"
square
icon={PhCopy}
onClick={() => copyToClipboard(icon.name)}
/>
</HBox>
<Text style="font-size: 13px; color: var(--text-secondary);">{icon.label}</Text>
<Text style="font-size: 12px; opacity: 0.65;">{icon.name}</Text>
</VBox>
</Card>
{/each}
</Grid>
</VBox>
</Clamp>
