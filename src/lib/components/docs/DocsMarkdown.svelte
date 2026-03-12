<script>
import { Card, TextRich, VBox, Text } from 'fabkit';
import { markdownToHtml } from '$lib/docs/markdown.js';

let { markdown = '', title = '' } = $props();

const html = $derived(markdownToHtml(markdown));
</script>

<VBox spacing={12} align="fill" padding={[18, 18, 18, 18]}>
{#if title}
<Text style="font-weight: 700;">{title}</Text>
{/if}

<Card padding={[18, 18, 18, 18]}>
<TextRich>
{@html html}
</TextRich>
</Card>
</VBox>
