const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

/** @param {string} dir */
function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    // safety: skip any nested node_modules if they appear inside src
    if (entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const TARGET_EXTS = new Set(['.js', '.jsx', '.html']);

const PREPS = [
  // 1-letter
  'а',
  'в',
  'и',
  'к',
  'о',
  'с',
  'у',
  // 2-3 letters
  'во',
  'на',
  'не',
  'но',
  'об',
  'от',
  'по',
  'со',
  'до',
  'из',
  'за',
  'про',
  'для',
  'при',
  'без',
  'над',
  'под',
  'через'
];

// escape for regex alternation
const PREPS_ALT = PREPS.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

// Preposition/conjunction + normal whitespace -> NBSP, only if followed by letter/number
// Keep preceding delimiter to reduce false-positives in the middle of longer words.
const NBSP_RE = new RegExp(
  `(^|[\\s"“”'‘’«»()\\[\\]{}.,:;!?—–-])(${PREPS_ALT})\\s+(?=[\\p{L}\\p{N}])`,
  'gmu'
);

function typograph(text) {
  let out = text;

  // 1) Заменяем букву е на е (включая варианты с диакритикой)
  out = out.replace(/\u0401/g, 'Е').replace(/\u0451/g, 'е');

  // 2) NBSP after short preps/conjunctions
  // Replace ONLY regular whitespace with NBSP; do not touch existing NBSP.
  out = out.replace(NBSP_RE, (m, prefix, word) => `${prefix}${word}\u00A0`);

  return out;
}

/** @param {string} file */
function processFile(file) {
  const ext = path.extname(file);
  if (!TARGET_EXTS.has(ext)) return false;

  const before = fs.readFileSync(file, 'utf8');
  const after = typograph(before);
  if (after === before) return false;

  fs.writeFileSync(file, after, 'utf8');
  return true;
}

function main() {
  const files = [...walk(SRC), path.join(ROOT, 'index.html'), path.join(ROOT, 'blog.html')].filter((f) =>
    fs.existsSync(f)
  );

  let changed = 0;
  for (const file of files) {
    if (processFile(file)) {
      changed += 1;
      console.log('updated:', path.relative(ROOT, file));
    }
  }

  console.log(`done. changed files: ${changed}`);
}

main();


