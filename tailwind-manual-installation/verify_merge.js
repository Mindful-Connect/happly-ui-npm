const resolveConfig = require('tailwindcss/resolveConfig');

// Mock Preset
const presetKey = {
  theme: {
    extend: {
      colors: {
        'happly-primary': 'happly-blue',
        'shared-color': 'happly-shared'
      }
    }
  }
};

// Case 1: User extends same key
const userExtend = {
  presets: [presetKey],
  theme: {
    extend: {
      colors: {
        'user-color': 'user-red',
        'shared-color': 'user-shared-override'
      }
    }
  }
};

// Case 2: User overrides top-level colors
const userOverride = {
  presets: [presetKey],
  theme: {
    colors: {
      'user-base': 'user-base-white'
    }
  }
};

console.log("--- Checking Merge Behavior ---");

const resolvedExtend = resolveConfig(userExtend);
console.log("\nCase 1: User Extends");
console.log("happly-primary exists?", !!resolvedExtend.theme.colors['happly-primary'], "(Expected: true)");
console.log("user-color exists?", !!resolvedExtend.theme.colors['user-color'], "(Expected: true)");
console.log("shared-color value:", resolvedExtend.theme.colors['shared-color'], "(Expected: user-shared-override)");

const resolvedOverride = resolveConfig(userOverride);
console.log("\nCase 2: User Overrides Colors");
console.log("happly-primary exists?", !!resolvedOverride.theme.colors['happly-primary']);
console.log("user-base exists?", !!resolvedOverride.theme.colors['user-base']);
// If user overrides colors, do preset extends still apply?
// According to docs, extend applies to the *final* theme. 
// So user colors replace defaults. Preset extend adds to that. 
// Let's verify.
