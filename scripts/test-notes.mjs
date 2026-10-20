import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createHash} from 'node:crypto';
import ts from 'typescript';

const source = JSON.parse(await readFile(new URL('../src/notes/source/character_notes_for_codex.json', import.meta.url), 'utf8'));
const owners = {'choi-doan':'A', 'lim-hyeongwoo':'B', 'yoon-yeondo':'C', 'kang-ryeoun':'D'};
const counts = {'choi-doan':16, 'lim-hyeongwoo':16, 'yoon-yeondo':16, 'kang-ryeoun':18};
const pinnedCounts = {'choi-doan':2, 'lim-hyeongwoo':3, 'yoon-yeondo':2, 'kang-ryeoun':2};
const libraries = {};
const formatSource = await readFile(new URL('../src/notes/format.ts', import.meta.url), 'utf8');
const formatOutput = ts.transpileModule(formatSource, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const {sortNotes, noteUpdatedAt} = await import('data:text/javascript;base64,' + Buffer.from(formatOutput).toString('base64'));
for (const [owner, letter] of Object.entries(owners)) {
  const input = await readFile(new URL(`../src/notes/data/${letter}.ts`, import.meta.url), 'utf8');
  const output = ts.transpileModule(input, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
  libraries[owner] = (await import('data:text/javascript;base64,' + Buffer.from(output).toString('base64'))).default;
}

test('all four independent note libraries preserve the source and total 66 notes', () => {
  assert.deepEqual(Object.keys(source.characters), Object.keys(owners));
  let total = 0;
  const ids = new Set();
  for (const owner of Object.keys(owners)) {
    const notes = libraries[owner];
    assert.equal(notes.length, counts[owner]);
    assert.deepEqual(notes, source.characters[owner].notes);
    for (const note of notes) {
      assert.equal(ids.has(note.id), false, note.id);
      ids.add(note.id);
    }
    total += notes.length;
  }
  assert.equal(total, 66);
  assert.equal(ids.size, 66);
  assert.equal(new Set(Object.values(libraries)).size, 4);
});

test('titles and all UTF-8 body bytes retain whitespace, blank lines and source order', () => {
  const digest = body => createHash('sha256').update(body, 'utf8').digest('hex');
  let withBlankLines = 0;
  for (const owner of Object.keys(owners)) {
    libraries[owner].forEach((note, index) => {
      const original = source.characters[owner].notes[index];
      assert.equal(note.title, original.title);
      assert.equal(note.body, original.body);
      assert.equal(digest(note.body), digest(original.body));
      assert.deepEqual(note.body.split('\n'), original.body.split('\n'));
      assert.deepEqual([...note.body.matchAll(/\s+/g)].map(match => match[0]), [...original.body.matchAll(/\s+/g)].map(match => match[0]));
      if (note.body.includes('\n\n')) withBlankLines++;
    });
  }
  assert.equal(withBlankLines, 60);
});

test('original creation and update timestamps retain their Asia/Seoul offsets', () => {
  assert.equal(source.displayRules.timeZone, 'Asia/Seoul');
  for (const owner of Object.keys(owners)) {
    for (const note of libraries[owner]) {
      for (const key of ['createdAt','updatedAt']) {
        assert.match(note[key], /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/);
        assert.ok(Number.isFinite(Date.parse(note[key])));
      }
      assert.ok(Date.parse(note.updatedAt) >= Date.parse(note.createdAt));
    }
  }
});

test('pinned state is an author-supplied boolean and stays unchanged for every character', () => {
  let total = 0;
  for (const owner of Object.keys(owners)) {
    const notes = libraries[owner];
    assert.equal(notes.filter(note=>note.pinned).length, pinnedCounts[owner]);
    for (const note of notes) assert.equal(typeof note.pinned, 'boolean');
    total += notes.filter(note=>note.pinned).length;
  }
  assert.equal(total, 9);
});

test('records expose only supplied note fields and do not add character names to titles', () => {
  const fields = ['body','createdAt','id','pinned','title','updatedAt'];
  for (const owner of Object.keys(owners)) {
    for (const [index,note] of libraries[owner].entries()) {
      assert.deepEqual(Object.keys(note).sort(), fields);
      assert.equal(note.title, source.characters[owner].notes[index].title);
    }
  }
  assert.equal(source.readOnly, true);
  assert.equal(source.displayRules.canCreate, false);
  assert.equal(source.displayRules.canEdit, false);
  assert.equal(source.displayRules.canDelete, false);
});

test('pinned notes precede all others and each group is newest-first without mutating data', () => {
  for(const notes of Object.values(libraries)) {
    const original = structuredClone(notes);
    const sorted = sortNotes(notes);
    assert.notEqual(sorted,notes);
    assert.deepEqual(notes,original);
    assert.equal(sorted.length,notes.length);
    let reachedUnpinned = false;
    let lastPinnedTime = Infinity, lastNormalTime = Infinity;
    for(const note of sorted) {
      const time = Date.parse(note.updatedAt);
      if(note.pinned) {
        assert.equal(reachedUnpinned,false);
        assert.ok(time<=lastPinnedTime);
        lastPinnedTime=time;
      } else {
        reachedUnpinned=true;
        assert.ok(time<=lastNormalTime);
        lastNormalTime=time;
      }
    }
    assert.deepEqual(new Set(sorted.map(note=>note.id)),new Set(notes.map(note=>note.id)));
  }
});

test('display dates use Asia/Seoul including midnight, independent of browser locale', () => {
  assert.equal(noteUpdatedAt('2026-06-22T00:21:00+09:00'),'2026.06.22 00:21');
  assert.equal(noteUpdatedAt('2026-06-21T15:21:00Z',true),'2026.06.22 00:21:00');
  assert.equal(noteUpdatedAt('2026-10-17T23:02:00+09:00',true),'2026.10.17 23:02:00');
  assert.throws(()=>noteUpdatedAt('invalid-date'));
});
