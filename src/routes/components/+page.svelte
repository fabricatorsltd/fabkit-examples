<script>
import {
ActionBar,
AdaptiveTable,
Button,
Card,
Clamp,
DataTable,
Grid,
HBox,
HideBelow,
NumberField,
Optional,
SelectField,
Switcher,
Text,
TextField,
TextRich,
VBox
} from 'fabkit';
import { PhCopy, PhPlay, PhAppWindow } from 'fabkit';
import { goto } from '$app/navigation';

let flat = $state(true);
let name = $state('');
let email = $state('');
let country = $state('Italy');
let qty = $state(1);

const countries = [
{ label: 'Italy', value: 'Italy' },
{ label: 'Germany', value: 'Germany' },
{ label: 'Japan', value: 'Japan' },
{ label: 'United States', value: 'United States' }
];

const demoItems = [
{ label: 'Docs', icon: PhPlay, onClick: () => goto('/docs') },
{ label: 'Window', icon: PhAppWindow, onClick: () => goto('/window') },
{
label: 'Copy install',
icon: PhCopy,
onClick: () => navigator.clipboard?.writeText('npm i fabkit')
}
];

const tableColumns = [
{ key: 'name', label: 'Name' },
{ key: 'role', label: 'Role' },
{ key: 'status', label: 'Status' }
];

const tableRows = [
{ name: 'Ava', role: 'Designer', status: 'Active' },
{ name: 'Noah', role: 'Engineer', status: 'Active' },
{ name: 'Mia', role: 'PM', status: 'Paused' }
];
</script>

<Clamp max={1100} margin={[0, 16, 40, 16]}>
<VBox spacing={22} align="fill" padding={[28, 0, 0, 0]}>
<TextRich>
<h1>Components</h1>
<p>
A compact showcase of Fabkit building blocks.
Everything here is using Fabkit components and tokens.
</p>
</TextRich>

<Card>
<VBox spacing={12} align="fill">
<Text style="font-weight: 700;">Toolbar</Text>
<ActionBar items={demoItems} />
</VBox>
</Card>

<Card>
<VBox spacing={14} align="fill">
<HBox align="center" justify="space-between" spacing={12} style="flex-wrap: wrap;">
<Text style="font-weight: 700;">Buttons</Text>
<HBox align="center" spacing={10}>
<Text style="color: var(--text-secondary);">Flat style</Text>
<Switcher model={flat} on:change={(e) => (flat = e.detail)} />
</HBox>
</HBox>

<HBox spacing={10} align="center" style="flex-wrap: wrap;">
<Button label="Primary" variant="primary" />
<Button label="Secondary" variant="secondary" />
<Button label="Destructive" variant="destructive" />
<Button label="Flat" variant={flat ? 'flat' : 'secondary'} />
</HBox>
</VBox>
</Card>

<Grid columns={2} gap={12} style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">TextField</Text>
<TextField label="Name" bind:value={name} placeholder="Jane Doe" flat={flat} />
<TextField label="Email" bind:value={email} type="email" placeholder="jane@example.com" flat={flat} />
</VBox>
</Card>

<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">SelectField / NumberField</Text>
<SelectField label="Country" bind:value={country} options={countries} flat={flat} />
<NumberField label="Quantity" bind:value={qty} min={1} flat={flat} />
</VBox>
</Card>
</Grid>

<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">Responsive primitives</Text>

<HBox spacing={10} align="center" style="flex-wrap: wrap;">
<HideBelow below={520}>
<Text style="color: var(--text-secondary);">Visible on wide containers</Text>
</HideBelow>
<Optional below={520}>
<Text style="color: var(--text-secondary);">Visible on compact containers</Text>
</Optional>
</HBox>
</VBox>
</Card>

<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">AdaptiveTable</Text>
<Text style="color: var(--text-secondary);">
It becomes row cards when space is compact.
</Text>
<AdaptiveTable columns={tableColumns} rows={tableRows} stackAt={680} />
</VBox>
</Card>

<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">DataTable</Text>
<DataTable columns={tableColumns} rows={tableRows} />
</VBox>
</Card>
</VBox>
</Clamp>
