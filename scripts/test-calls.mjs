import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import ts from 'typescript';

const source = JSON.parse(await readFile(new URL('../src/calls/source/all_character_call_logs.json', import.meta.url), 'utf8'));
const owners = {'choi-doan':'A', 'lim-hyeongwoo':'B', 'yoon-yeondo':'C', 'kang-ryeoun':'D'};
const counts = {'choi-doan':29, 'lim-hyeongwoo':26, 'yoon-yeondo':24, 'kang-ryeoun':29};
const libraries = {};
const formatSource = await readFile(new URL('../src/calls/format.ts', import.meta.url), 'utf8');
const formatOutput = ts.transpileModule(formatSource, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const {callDate, callTime, callTimezone, callDuration, callSummary, sortCalls} = await import('data:text/javascript;base64,' + Buffer.from(formatOutput).toString('base64'));
for (const [owner, letter] of Object.entries(owners)) {
  const input = await readFile(new URL(`../src/calls/data/${letter}.ts`, import.meta.url), 'utf8');
  const output = ts.transpileModule(input, {compilerOptions:{target:ts.ScriptTarget.ES2022, module:ts.ModuleKind.ESNext}}).outputText;
  libraries[owner] = (await import('data:text/javascript;base64,' + Buffer.from(output).toString('base64'))).default;
}

test('all four independent libraries preserve every source field and total 108 calls', () => {
  assert.deepEqual(Object.keys(source.characters), Object.keys(owners));
  let total = 0;
  for (const owner of Object.keys(owners)) {
    assert.equal(libraries[owner].length, counts[owner]);
    assert.deepEqual(libraries[owner], source.characters[owner].calls);
    assert.equal(new Set(libraries[owner].map(call=>call.id)).size, counts[owner]);
    total += libraries[owner].length;
  }
  assert.equal(total, 108);
});

test('timestamps retain their supplied offset and data is already newest-first', () => {
  for (const calls of Object.values(libraries)) {
    let previous = Number.POSITIVE_INFINITY;
    for (const call of calls) {
      assert.match(call.timestamp, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/);
      const timestamp = Date.parse(call.timestamp);
      assert.ok(Number.isFinite(timestamp));
      assert.ok(timestamp <= previous);
      previous = timestamp;
    }
  }
});

test('directions distinguish incoming, outgoing, missed, and unanswered outgoing calls', () => {
  const statuses = new Set();
  for (const calls of Object.values(libraries)) {
    for (const call of calls) {
      assert.ok(['incoming','outgoing','missed'].includes(call.direction));
      assert.ok(['completed','missed','unanswered'].includes(call.status));
      assert.ok(Number.isInteger(call.durationSeconds) && call.durationSeconds >= 0);
      statuses.add(call.status);
      if (call.status === 'completed') {
        assert.ok(['incoming','outgoing'].includes(call.direction));
        assert.ok(call.durationSeconds > 0);
      } else if (call.status === 'missed') {
        assert.equal(call.direction, 'missed');
        assert.equal(call.durationSeconds, 0);
      } else {
        assert.equal(call.direction, 'outgoing');
        assert.equal(call.durationSeconds, 0);
      }
    }
  }
  assert.deepEqual([...statuses].sort(), ['completed','missed','unanswered']);
});

test('all 17 shared calls have reciprocal contacts and identical dates and durations', () => {
  const shared = new Map();
  for (const [owner, calls] of Object.entries(libraries)) {
    for (const call of calls) {
      if (!call.sharedCallId) continue;
      if (!shared.has(call.sharedCallId)) shared.set(call.sharedCallId, []);
      shared.get(call.sharedCallId).push({owner, call});
    }
  }
  assert.equal(shared.size, 17);
  for (const [id, pair] of shared) {
    assert.equal(pair.length, 2, id);
    const [a,b] = pair;
    assert.notEqual(a.owner, b.owner, id);
    assert.equal(a.call.contactId, b.owner, id);
    assert.equal(b.call.contactId, a.owner, id);
    assert.equal(a.call.contactName, source.characters[b.owner].displayName, id);
    assert.equal(b.call.contactName, source.characters[a.owner].displayName, id);
    assert.equal(a.call.timestamp, b.call.timestamp, id);
    assert.equal(a.call.durationSeconds, b.call.durationSeconds, id);
    if (a.call.status === 'completed' || b.call.status === 'completed') {
      assert.equal(a.call.status, 'completed', id);
      assert.equal(b.call.status, 'completed', id);
      assert.deepEqual([a.call.direction,b.call.direction].sort(), ['incoming','outgoing'], id);
    } else {
      assert.deepEqual([a.call.status,b.call.status].sort(), ['missed','unanswered'], id);
      assert.deepEqual([a.call.direction,b.call.direction].sort(), ['missed','outgoing'], id);
    }
  }
});

test('records contain supplied contact names and no invented phone-number fields', () => {
  const allowed = new Set(['id','contactId','contactName','timestamp','direction','status','durationSeconds','sharedCallId']);
  for (const calls of Object.values(libraries)) {
    for (const call of calls) {
      assert.equal(typeof call.contactName, 'string');
      assert.ok(call.contactName.length > 0);
      assert.ok(call.contactId === null || Object.hasOwn(owners, call.contactId));
      for (const key of Object.keys(call)) assert.ok(allowed.has(key), key);
    }
  }
});

test('display preserves source wall-clock time regardless of visitor timezone', () => {
  const timestamp = '2026-10-17T09:41:00+09:00';
  assert.equal(callDate(timestamp),'2026.10.17');
  assert.equal(callDate(timestamp,true),'2026년 10월 17일 토요일');
  assert.equal(callTime(timestamp),'09:41');
  assert.equal(callTime(timestamp,true),'09:41:00');
  assert.equal(callTimezone(timestamp),'UTC+09:00');
  assert.equal(callTime('2026-10-17T00:41:00Z',true),'00:41:00');
  assert.equal(callTimezone('2026-10-17T00:41:00Z'),'UTC');
  assert.throws(()=>callDate('not-a-date'));
});

test('duration and unanswered labels preserve the meaning of supplied values', () => {
  for(const [seconds,label] of [[0,'0초'],[58,'58초'],[60,'1분'],[80,'1분 20초'],[399,'6분 39초'],[3600,'1시간'],[3661,'1시간 1분 1초']]) {
    assert.equal(callDuration(seconds),label);
  }
  assert.throws(()=>callDuration(-1));
  assert.throws(()=>callDuration(1.5));
  for(const calls of Object.values(libraries))for(const call of calls) {
    if(call.status==='unanswered')assert.equal(callSummary(call),'발신 · 응답 없음');
    if(call.direction==='missed')assert.equal(callSummary(call),'부재중 전화');
  }
});

test('sorting uses instants, is newest-first, and does not modify the source array', () => {
  const calls = [...libraries['choi-doan']].reverse();
  const original = [...calls];
  const sorted = sortCalls(calls);
  assert.notEqual(sorted,calls);
  assert.deepEqual(calls,original);
  assert.deepEqual(sorted,libraries['choi-doan']);
});
