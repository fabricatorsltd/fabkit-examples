<script>
import { Clamp, VBox, Card, Text, TextRich, Window, TitleBar, TextField } from 'fabkit';

let query = $state('');
</script>

<Clamp max={1100} margin={[0, 16, 40, 16]}>
<VBox spacing={22} align="fill" padding={[28, 0, 0, 0]}>
<TextRich>
<h1>Window</h1>
<p>
A dedicated page for the Window component.
</p>
</TextRich>

<Card>
<Window>
<TitleBar title="Fabkit Window" subtitle="Example" />
<VBox spacing={14} align="fill" padding={[16, 16, 16, 16]}>
<Text style="color: var(--text-secondary);">Try a flat field inside a window:</Text>
<TextField label="Search" bind:value={query} placeholder="Type…" flat />
<Text>Value: {query}</Text>
</VBox>
</Window>
</Card>
</VBox>
</Clamp>
