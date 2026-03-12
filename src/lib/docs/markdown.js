import { marked } from 'marked';

export function markdownToHtml(md) {
return marked.parse(String(md ?? ''));
}
