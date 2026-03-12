const OWNER = 'fabricatorsltd';
const REPO = 'fabkit';
const BRANCH = 'main';

let treePromise;

export async function getDocsPaths(fetchFn) {
if (!treePromise) {
treePromise = fetchFn(
`https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`,
{ headers: { Accept: 'application/vnd.github+json' } }
)
.then((r) => {
if (!r.ok) throw new Error(`tree:${r.status}`);
return r.json();
})
.then((data) => {
const items = Array.isArray(data?.tree) ? data.tree : [];
return items
.map((it) => it?.path)
.filter((p) => typeof p === 'string')
.filter((p) => p.startsWith('docs/') && p.endsWith('.md'))
.sort((a, b) => a.localeCompare(b));
});
}

return treePromise;
}

export async function getDocMarkdown(fetchFn, docPath) {
const path = String(docPath || 'docs/README.md');
const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
const r = await fetchFn(rawUrl);
if (!r.ok) throw new Error(`raw:${r.status}`);
return await r.text();
}
