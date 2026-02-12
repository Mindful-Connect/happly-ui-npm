import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.resolve(__dirname, '../packages/registry');
const UI_PATH = path.join(REGISTRY_PATH, 'ui');
const LIB_PATH = path.join(REGISTRY_PATH, 'lib');
const UTILS_PATH = path.join(REGISTRY_PATH, 'utils');
const OUTPUT_PATH = path.join(REGISTRY_PATH, 'registry.json');

const REGISTRY_SCHEMA =
  'https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/registry.json';

function buildRegistry() {
  console.log('Building registry...');

  if (!existsSync(UI_PATH)) {
    console.error(`UI path not found: ${UI_PATH}`);
    process.exit(1);
  }

  interface RegistryItem {
    name: string;
    type: string;
    title: string;
    description: string;
    [key: string]: unknown;
  }

  const items: RegistryItem[] = [];

  const processDirectory = (dirPath: string) => {
    if (!existsSync(dirPath)) return;
    const files = readdirSync(dirPath).filter((f: string) =>
      f.endsWith('.json')
    );

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      try {
        const content = readFileSync(filePath, 'utf-8');
        const item = JSON.parse(content) as RegistryItem;

        if (!item.name || !item.type) {
          console.warn(
            `Skipping invalid item in ${file}: missing name or type`
          );
          continue;
        }

        // Cleanup: Use whitelist to ensure only allowed fields are in index
        const { name, type, title, description } = item;
        items.push({ name, type, title, description });
      } catch (e) {
        console.error(`Error processing ${file}:`, e);
      }
    }
  };

  processDirectory(UI_PATH);

  // Also check lib if it exists
  if (existsSync(LIB_PATH)) {
    processDirectory(LIB_PATH);
  }

  // Also check utils if it exists
  if (existsSync(UTILS_PATH)) {
    processDirectory(UTILS_PATH);
  }

  // Sort items alphabetically
  items.sort((a, b) => a.name.localeCompare(b.name));

  const registry = {
    $schema: REGISTRY_SCHEMA,
    name: 'happlyui',
    homepage: 'https://happly.cloud/ui',
    items: items,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2) + '\n');
  console.log(`Registry built with ${items.length} items at ${OUTPUT_PATH}`);
}

buildRegistry();
