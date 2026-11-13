const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(path) {
  const source = fs.readFileSync(path, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const context = { exports: {} };
  vm.runInNewContext(code, context);
  return context.exports;
}
const { shuffleChoices } = load('lib/shuffle.ts');
const { events } = load('lib/game.ts');

test('shuffle keeps original indices and can put the best option in every position', () => {
  for (const event of events) {
    const original = event.choices.map((_, i) => i);
    const best = event.choices.findIndex(choice => choice.score === 10);
    const positions = new Set();
    // Constant random values exercise different Fisher–Yates swaps deterministically.
    for (let n = 0; n < 100; n++) {
      const order = shuffleChoices(original, () => n / 100);
      assert.deepEqual(Array.from(order).sort((a, b) => a - b), Array.from(original));
      positions.add(order.indexOf(best));
      for (const index of order) assert.equal(event.choices[index], event.choices[original[index]]);
    }
    assert.equal(positions.size, original.length);
    assert.deepEqual(Array.from(original), Array.from(event.choices.map((_, i) => i)));
  }
});

test('situations have different choice counts and complete feedback for all four indicators', () => {
  assert.ok(new Set(events.map(event => event.choices.length)).size > 1);
  for (const event of events) {
    for (const choice of event.choices) {
      assert.equal(choice.impact.length, 4);
      assert.equal(choice.effects.length, 4);
      assert.ok(choice.effects.every(Boolean));
    }
  }
});
