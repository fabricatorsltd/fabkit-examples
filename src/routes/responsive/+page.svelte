<script>
import {
AdaptiveFormLayout,
AdaptiveFormRow,
AdaptiveMedia,
AdaptiveTable,
Card,
Clamp,
HBox,
HideBelow,
Optional,
Text,
TextField,
TextRich,
VBox
} from 'fabkit';

let name = $state('');
let company = $state('');

const columns = [
{ key: 'id', label: 'ID' },
{ key: 'title', label: 'Title' },
{ key: 'state', label: 'State' }
];

const rows = [
{ id: 'FAB-1', title: 'Flat fields', state: 'Done' },
{ id: 'FAB-2', title: 'Adaptive layout', state: 'Done' },
{ id: 'FAB-3', title: 'Docs route', state: 'In progress' }
];
</script>

<Clamp max={1100} margin={[0, 16, 40, 16]}>
<VBox spacing={22} align="fill" padding={[28, 0, 0, 0]}>
<TextRich>
<h1>Responsive</h1>
<p>
This page demonstrates Fabkit responsiveness using container-driven primitives.
Resize the window and watch components adapt.
</p>
</TextRich>

<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">HideBelow / Optional</Text>
<HBox spacing={10} align="center" style="flex-wrap: wrap;">
<HideBelow below={520}>
<Text style="color: var(--text-secondary);">Wide container content</Text>
</HideBelow>
<Optional below={520}>
<Text style="color: var(--text-secondary);">Compact container content</Text>
</Optional>
</HBox>
</VBox>
</Card>

<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">AdaptiveFormLayout</Text>
<AdaptiveFormLayout stackAt={720} labelWidth={240}>
<AdaptiveFormRow label="Name">
<TextField bind:value={name} placeholder="Jane" flat />
</AdaptiveFormRow>
<AdaptiveFormRow label="Company" help="Label becomes stacked on compact.">
<TextField bind:value={company} placeholder="Fabricators" flat />
</AdaptiveFormRow>
</AdaptiveFormLayout>
</VBox>
</Card>

<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">AdaptiveTable</Text>
<AdaptiveTable columns={columns} rows={rows} stackAt={760} />
</VBox>
</Card>

<Card>
<VBox spacing={14} align="fill">
<Text style="font-weight: 700;">AdaptiveMedia</Text>
<AdaptiveMedia
stackAt={720}
src="https://images.unsplash.com/photo-1520975958221-46f0323a573c?auto=format&fit=crop&w=1200&q=80"
alt="Responsive media demo"
wide={{ ratio: 21 / 9, crop: 'cover', borderRadius: 16 }}
compact={{ ratio: 4 / 3, crop: 'cover', borderRadius: 16 }}
/>
</VBox>
</Card>
</VBox>
</Clamp>
