'use client';

import { DocsHeader } from '@/components/DocsHeader';
import { Fence } from '@/components/Fence';
import { Prose } from '@/components/Prose';
import type { RegistryItemWithDocs } from '@/lib/registry';
import { StoryPreview } from '@/components/StoryPreview';
import { TableOfContents } from '@/components/TableOfContents';
import { PrevNextLinks } from '@/components/PrevNextLinks';
import { type Section } from '@/lib/sections';

interface ComponentDocsProps {
  component: RegistryItemWithDocs;
}

export function ComponentDocs({ component }: ComponentDocsProps) {
  const {
    name,
    title,
    description,
    dependencies,
    registryDependencies,
    docs,
    files,
  } = component;

  const supportComponents = [
    'command',
    'custom-input-wrapper',
    'dialog',
    'popover',
    'key-icon',
    'alert',
  ];
  const isSupportComponent = supportComponents.includes(name);

  // Extract source code from the first file
  const sourceCode = files?.[0]?.content || '';

  // Get export info from source code
  const exports = extractExports(sourceCode);

  const phoneInput = (docs as any)?.phoneInput;
  const currencyInput = (docs as any)?.currencyInput;

  // Construct Table of Contents
  const inputChildren: import('@/lib/sections').Subsection[] = [
    { id: 'installation', title: 'Installation', level: 3 },
  ];

  if (dependencies.length > 0 || registryDependencies.length > 0) {
    inputChildren.push({ id: 'dependencies', title: 'Dependencies', level: 3 });
  }

  inputChildren.push({ id: 'usage', title: 'Usage', level: 3 });

  if (docs?.examples && docs.examples.length > 0) {
    inputChildren.push({ id: 'examples', title: 'Examples', level: 3 });
  }

  if (docs?.api && docs.api.length > 0) {
    inputChildren.push({
      id: 'api-reference',
      title: 'API Reference',
      level: 3,
    });
  }

  const tableOfContents: Section[] = [
    {
      id: 'input',
      title: 'Input',
      level: 2,
      children: inputChildren,
    },
  ];

  if (phoneInput) {
    const phoneChildren: import('@/lib/sections').Subsection[] = [];
    phoneChildren.push({
      id: 'phone-input-installation',
      title: 'Installation',
      level: 3,
    });
    if (phoneInput.dependencies && phoneInput.dependencies.length > 0) {
      phoneChildren.push({
        id: 'phone-input-dependencies',
        title: 'Dependencies',
        level: 3,
      });
    }
    phoneChildren.push({ id: 'phone-input-usage', title: 'Usage', level: 3 });
    if (phoneInput.examples && phoneInput.examples.length > 0) {
      phoneChildren.push({
        id: 'phone-input-examples',
        title: 'Examples',
        level: 3,
      });
    }
    if (phoneInput.api && phoneInput.api.length > 0) {
      phoneChildren.push({
        id: 'phone-input-api',
        title: 'API Reference',
        level: 3,
      });
    }
    tableOfContents.push({
      id: 'phone-input',
      title: 'Phone Input',
      level: 2,
      children: phoneChildren,
    });
  }

  if (currencyInput) {
    const currencyChildren: import('@/lib/sections').Subsection[] = [];
    currencyChildren.push({
      id: 'currency-input-installation',
      title: 'Installation',
      level: 3,
    });
    if (currencyInput.dependencies && currencyInput.dependencies.length > 0) {
      currencyChildren.push({
        id: 'currency-input-dependencies',
        title: 'Dependencies',
        level: 3,
      });
    }
    currencyChildren.push({
      id: 'currency-input-usage',
      title: 'Usage',
      level: 3,
    });
    if (currencyInput.examples && currencyInput.examples.length > 0) {
      currencyChildren.push({
        id: 'currency-input-examples',
        title: 'Examples',
        level: 3,
      });
    }
    if (currencyInput.api && currencyInput.api.length > 0) {
      currencyChildren.push({
        id: 'currency-input-api',
        title: 'API Reference',
        level: 3,
      });
    }
    tableOfContents.push({
      id: 'currency-input',
      title: 'Currency Input',
      level: 2,
      children: currencyChildren,
    });
  }

  return (
    <>
      <div className='max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16'>
        <article>
          <DocsHeader title={title} />
          <Prose>
            {/* Lead paragraph */}
            <p className='lead'>{docs?.lead || description}</p>

            {isSupportComponent && (
              <div className='my-4 border-l-4 border-amber-500 bg-amber-50 p-4 dark:border-amber-500/50 dark:bg-amber-900/20'>
                <div className='flex'>
                  <div className='ml-3'>
                    <p className='text-sm text-amber-700 dark:text-amber-200'>
                      This component is not a standalone one but is used to
                      support other components.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div id='input' className='scroll-mt-24' />
            <hr />

            {/* Installation */}
            <h2 id='installation'>Installation</h2>
            <Fence language='bash'>{`bunx @happlyui/cli@latest add ${name}`}</Fence>

            <hr />

            {/* Dependencies */}
            {(dependencies.length > 0 || registryDependencies.length > 0) && (
              <>
                <h2 id='dependencies'>Dependencies</h2>
                {dependencies.length > 0 && (
                  <>
                    <h3>npm packages</h3>
                    <ul>
                      {dependencies.map((dep) => (
                        <li key={dep}>
                          <code>{dep}</code>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {registryDependencies.length > 0 && (
                  <>
                    <h3>Registry dependencies</h3>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      These are automatically installed when you add this
                      component.
                    </p>
                    <ul>
                      {registryDependencies.map((dep) => (
                        <li key={dep}>
                          <code>{dep}</code>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <hr />
              </>
            )}

            {/* Usage */}
            <h2 id='usage'>Usage</h2>
            {docs?.usage ? (
              <Fence language='tsx'>{docs.usage}</Fence>
            ) : (
              <BasicUsageExample name={name} exports={exports} />
            )}

            <hr />

            {/* Examples from docs field */}
            {docs?.examples && docs.examples.length > 0 && (
              <>
                <h2 id='examples'>Examples</h2>
                {docs.examples.map((example, index) => (
                  <div key={index} className='mb-8'>
                    <h3>{example.title}</h3>
                    {example.description && <p>{example.description}</p>}
                    {example.stories?.length ? (
                      <StoryPreview componentName={name} storyNames={example.stories} />
                    ) : null}
                    {example.code && <Fence language='tsx'>{example.code}</Fence>}
                  </div>
                ))}
                <hr />
              </>
            )}

            {/* API Reference from docs field */}
            {docs?.api && docs.api.length > 0 && (
              <>
                <h2 id='api-reference'>API Reference</h2>
                {docs.api.map((apiItem, index) => (
                  <div key={index} className='mb-8'>
                    <h3>{apiItem.name}</h3>
                    {apiItem.description && <p>{apiItem.description}</p>}
                    <div className='overflow-x-auto'>
                      <table>
                        <thead>
                          <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiItem.props.map((prop, propIndex) => (
                            <tr key={propIndex}>
                              <td>
                                <code>{prop.name}</code>
                              </td>
                              <td>
                                <code className='text-xs'>{prop.type}</code>
                              </td>
                              <td>
                                {prop.default ? (
                                  <code>{prop.default}</code>
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td>{prop.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
                <hr />
              </>
            )}

            {/* Phone Input Section */}
            {phoneInput && (
              <>
                <div className='mt-16'>
                  <h2
                    id='phone-input'
                    className='text-3xl font-bold tracking-tight text-slate-900 dark:text-white'
                  >
                    {phoneInput.title || 'Phone Input'}
                  </h2>
                  {phoneInput.lead && (
                    <p className='lead mt-4'>{phoneInput.lead}</p>
                  )}

                  <hr />

                  {/* Phone Input Installation */}
                  <h3 id='phone-input-installation'>Installation</h3>
                  <Fence language='bash'>{`bunx @happlyui/cli@latest add phone-input`}</Fence>

                  <hr />

                  {/* Phone Input Dependencies */}
                  {phoneInput.dependencies &&
                    phoneInput.dependencies.length > 0 && (
                      <>
                        <h3 id='phone-input-dependencies'>Dependencies</h3>
                        <ul>
                          {phoneInput.dependencies.map((dep: string) => (
                            <li key={dep}>
                              <code>{dep}</code>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                  {/* Phone Input Usage */}
                  <h3 id='phone-input-usage'>Usage</h3>
                  <Fence language='tsx'>{phoneInput.usage}</Fence>

                  {/* Phone Input Examples */}
                  {phoneInput.examples && phoneInput.examples.length > 0 && (
                    <>
                      <h3 id='phone-input-examples'>Examples</h3>
                      {phoneInput.examples.map(
                        (example: any, index: number) => (
                          <div key={index} className='mb-8'>
                            <h4>{example.title}</h4>
                            {example.description && (
                              <p>{example.description}</p>
                            )}
                            {example.stories?.length ? (
                              <StoryPreview componentName='phone-input' storyNames={example.stories} />
                            ) : null}
                            <Fence language='tsx'>{example.code}</Fence>
                          </div>
                        )
                      )}
                    </>
                  )}

                  {/* Phone Input API */}
                  {phoneInput.api && phoneInput.api.length > 0 && (
                    <>
                      <h3 id='phone-input-api'>API Reference</h3>
                      {phoneInput.api.map((apiItem: any, index: number) => (
                        <div key={index} className='mb-8'>
                          <h4>{apiItem.name}</h4>
                          {apiItem.description && <p>{apiItem.description}</p>}
                          <div className='overflow-x-auto'>
                            <table>
                              <thead>
                                <tr>
                                  <th>Prop</th>
                                  <th>Type</th>
                                  <th>Default</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {apiItem.props.map(
                                  (prop: any, propIndex: number) => (
                                    <tr key={propIndex}>
                                      <td>
                                        <code>{prop.name}</code>
                                      </td>
                                      <td>
                                        <code className='text-xs'>
                                          {prop.type}
                                        </code>
                                      </td>
                                      <td>
                                        {prop.default ? (
                                          <code>{prop.default}</code>
                                        ) : (
                                          '-'
                                        )}
                                      </td>
                                      <td>{prop.description}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}

            {/* Currency Input Section */}
            {currencyInput && (
              <>
                <div className='mt-16'>
                  <h2
                    id='currency-input'
                    className='text-3xl font-bold tracking-tight text-slate-900 dark:text-white'
                  >
                    {currencyInput.title || 'Currency Input'}
                  </h2>
                  {currencyInput.lead && (
                    <p className='lead mt-4'>{currencyInput.lead}</p>
                  )}

                  <hr />

                  {/* Currency Input Installation */}
                  <h3 id='currency-input-installation'>Installation</h3>
                  <Fence language='bash'>{`bunx @happlyui/cli@latest add currency-input`}</Fence>

                  <hr />

                  {/* Currency Input Dependencies */}
                  {currencyInput.dependencies &&
                    currencyInput.dependencies.length > 0 && (
                      <>
                        <h3 id='currency-input-dependencies'>Dependencies</h3>
                        <ul>
                          {currencyInput.dependencies.map((dep: string) => (
                            <li key={dep}>
                              <code>{dep}</code>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                  {/* Currency Input Usage */}
                  <h3 id='currency-input-usage'>Usage</h3>
                  <Fence language='tsx'>{currencyInput.usage}</Fence>

                  {/* Currency Input Examples */}
                  {currencyInput.examples &&
                    currencyInput.examples.length > 0 && (
                      <>
                        <h3 id='currency-input-examples'>Examples</h3>
                        {currencyInput.examples.map(
                          (example: any, index: number) => (
                            <div key={index} className='mb-8'>
                              <h4>{example.title}</h4>
                              {example.description && (
                                <p>{example.description}</p>
                              )}
                              {example.stories?.length ? (
                                <StoryPreview componentName='currency-input' storyNames={example.stories} />
                              ) : null}
                              <Fence language='tsx'>{example.code}</Fence>
                            </div>
                          )
                        )}
                      </>
                    )}

                  {/* Currency Input API */}
                  {currencyInput.api && currencyInput.api.length > 0 && (
                    <>
                      <h3 id='currency-input-api'>API Reference</h3>
                      {currencyInput.api.map((apiItem: any, index: number) => (
                        <div key={index} className='mb-8'>
                          <h4>{apiItem.name}</h4>
                          {apiItem.description && <p>{apiItem.description}</p>}
                          <div className='overflow-x-auto'>
                            <table>
                              <thead>
                                <tr>
                                  <th>Prop</th>
                                  <th>Type</th>
                                  <th>Default</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {apiItem.props.map(
                                  (prop: any, propIndex: number) => (
                                    <tr key={propIndex}>
                                      <td>
                                        <code>{prop.name}</code>
                                      </td>
                                      <td>
                                        <code className='text-xs'>
                                          {prop.type}
                                        </code>
                                      </td>
                                      <td>
                                        {prop.default ? (
                                          <code>{prop.default}</code>
                                        ) : (
                                          '-'
                                        )}
                                      </td>
                                      <td>{prop.description}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </Prose>
        </article>
        <PrevNextLinks />
      </div>
      <TableOfContents tableOfContents={tableOfContents} />
    </>
  );
}

// Extract exported component names from source code
function extractExports(sourceCode: string): string[] {
  const exports: string[] = [];

  // Match named exports: export { Foo, Bar }
  const namedExportMatch = sourceCode.match(/export\s*\{([^}]+)\}/g);
  if (namedExportMatch) {
    namedExportMatch.forEach((match) => {
      const inner = match.match(/export\s*\{([^}]+)\}/);
      if (inner?.[1]) {
        inner[1].split(',').forEach((exp) => {
          const name = exp.split(' as ')[0].trim();
          if (name && !name.includes('type')) {
            exports.push(name);
          }
        });
      }
    });
  }

  // Match export const/function: export const Foo = / export function Foo
  const directExportMatch = sourceCode.match(
    /export\s+(const|function|class)\s+(\w+)/g
  );
  if (directExportMatch) {
    directExportMatch.forEach((match) => {
      const nameMatch = match.match(
        /export\s+(?:const|function|class)\s+(\w+)/
      );
      if (nameMatch?.[1]) {
        exports.push(nameMatch[1]);
      }
    });
  }

  return [...new Set(exports)];
}

// Generate a basic usage example
function BasicUsageExample({
  name,
  exports,
}: {
  name: string;
  exports: string[];
}) {
  // Check if this is a compound component (has Root export)
  const hasRoot = exports.some((e) => e === 'Root' || e.includes('Root'));
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  if (hasRoot) {
    return (
      <Fence language='tsx'>
        {`import * as ${componentName} from "@/components/ui/${name}"

<${componentName}.Root>
  {/* Content */}
</${componentName}.Root>`}
      </Fence>
    );
  }

  // Regular component
  const mainExport =
    exports.find((e) => e.toLowerCase() === name.toLowerCase()) ||
    exports.find((e) => e === componentName) ||
    exports[0] ||
    componentName;

  return (
    <Fence language='tsx'>
      {`import { ${mainExport} } from "@/components/ui/${name}"

<${mainExport}>
  {/* Content */}
</${mainExport}>`}
    </Fence>
  );
}
