import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/music/player.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {
 compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext},
}).outputText;
const {MusicPlayer} = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));

class FakeAudio {
 src = '';
 currentTime = 0;
 duration = Number.NaN;
 preload = '';
 playing = false;
 plays = 0;
 pauses = 0;
 listeners = new Map();
 nextPlay = null;

 play() { this.plays++; this.playing = true; return this.nextPlay ?? Promise.resolve(); }
 pause() { this.playing = false; this.pauses++; this.fire('pause'); }
 load() { this.currentTime = 0; this.duration = Number.NaN; }
 removeAttribute(name) { if (name === 'src') this.src = ''; }
 addEventListener(type, listener) {
  if (!this.listeners.has(type)) this.listeners.set(type, new Set());
  this.listeners.get(type).add(listener);
 }
 removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
 fire(type) { for (const listener of this.listeners.get(type) ?? []) listener(); }
 metadata(duration, event = 'loadedmetadata') { this.duration = duration; this.fire(event); }
 tick(time) { this.currentTime = time; this.fire('timeupdate'); }
 end() {
  if (Number.isFinite(this.duration)) this.currentTime = this.duration;
  this.playing = false;
  this.fire('ended');
 }
}

const tracks = [1, 2, 3].map(n => ({
 id: `test-${n}`,
 title: `[test-${n}]`,
 artist: '[test]',
 audioSrc: `/${n}.mp3`,
 coverImage: '/covers/placeholder.svg',
}));
const flush = () => new Promise(resolve => setImmediate(resolve));

test('list selection starts, stays playing, and resumes the chosen song without toggling off', async () => {
 const audio = new FakeAudio();
 const player = new MusicPlayer(tracks, audio);
 player.play('test-1');
 await flush();
 assert.equal(audio.src, '/1.mp3');
 assert.equal(player.getSnapshot().playing, true);
 audio.metadata(180);
 audio.tick(27);
 const pauses = audio.pauses;
 player.play('test-1');
 await flush();
 assert.equal(player.getSnapshot().playing, true);
 assert.equal(audio.currentTime, 27);
 assert.equal(audio.pauses, pauses);
 player.toggle('test-1');
 assert.equal(player.getSnapshot().playing, false);
 player.play('test-1');
 await flush();
 assert.equal(player.getSnapshot().playing, true);
 assert.equal(audio.currentTime, 27);
 player.dispose();
});

test('Now Playing pauses and resumes without losing position; a different song starts at zero', async () => {
 const audio = new FakeAudio();
 const player = new MusicPlayer(tracks, audio);
 player.toggle('test-1');
 await flush();
 audio.metadata(180);
 audio.tick(27);
 player.toggle('test-1');
 assert.equal(player.getSnapshot().playing, false);
 assert.equal(audio.currentTime, 27);
 player.toggle('test-1');
 await flush();
 assert.equal(audio.currentTime, 27);
 assert.equal(player.getSnapshot().playing, true);
 player.play('test-2');
 await flush();
 assert.equal(audio.src, '/2.mp3');
 assert.equal(audio.currentTime, 0);
 assert.equal(player.getSnapshot().currentTime, 0);
 assert.equal(player.getSnapshot().duration, 0);
 assert.equal(player.getSnapshot().trackId, 'test-2');
 assert.ok(audio.pauses >= 3);
 player.dispose();
});

test('metadata and timeupdate expose a timeline, including updates while paused', async () => {
 const audio = new FakeAudio();
 const player = new MusicPlayer(tracks, audio);
 assert.equal(player.getSnapshot().currentTime, 0);
 assert.equal(player.getSnapshot().duration, 0);
 player.play('test-1');
 await flush();
 audio.metadata(180.5);
 assert.equal(player.getSnapshot().duration, 180.5);
 audio.tick(42.25);
 assert.equal(player.getSnapshot().currentTime, 42.25);
 audio.metadata(181, 'durationchange');
 assert.equal(player.getSnapshot().duration, 181);
 player.toggle('test-1');
 audio.tick(43);
 assert.equal(player.getSnapshot().currentTime, 43);
 assert.equal(player.getSnapshot().playing, false);
 player.dispose();
});

test('seeking clamps to the duration and ignores nonfinite values or unknown duration', async () => {
 const audio = new FakeAudio();
 const player = new MusicPlayer(tracks, audio);
 player.seek(50);
 assert.equal(audio.currentTime, 0);
 player.play('test-1');
 await flush();
 player.seek(50);
 assert.equal(audio.currentTime, 0);
 audio.metadata(180);
 player.seek(50.5);
 assert.equal(audio.currentTime, 50.5);
 assert.equal(player.getSnapshot().currentTime, 50.5);
 player.seek(500);
 assert.equal(audio.currentTime, 180);
 player.seek(-20);
 assert.equal(audio.currentTime, 0);
 player.seek(75);
 for (const value of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
  player.seek(value);
  assert.equal(audio.currentTime, 75);
 }
 audio.metadata(Number.POSITIVE_INFINITY, 'durationchange');
 player.seek(100);
 assert.equal(audio.currentTime, 75);
 audio.metadata(Number.NaN, 'durationchange');
 player.seek(100);
 assert.equal(audio.currentTime, 75);
 player.dispose();
});

test('previous and next follow supplied order and leave boundary songs unchanged', async () => {
 const audio = new FakeAudio();
 const player = new MusicPlayer(tracks, audio);
 player.previous();
 player.next();
 assert.equal(audio.plays, 0);
 player.play('test-1');
 await flush();
 audio.tick(12);
 let plays = audio.plays;
 player.previous();
 assert.equal(player.getSnapshot().trackId, 'test-1');
 assert.equal(audio.currentTime, 12);
 assert.equal(audio.plays, plays);
 player.next();
 await flush();
 assert.equal(player.getSnapshot().trackId, 'test-2');
 assert.equal(audio.src, '/2.mp3');
 assert.equal(audio.currentTime, 0);
 assert.equal(player.getSnapshot().playing, true);
 player.next();
 await flush();
 assert.equal(player.getSnapshot().trackId, 'test-3');
 audio.tick(9);
 plays = audio.plays;
 player.next();
 assert.equal(player.getSnapshot().trackId, 'test-3');
 assert.equal(audio.currentTime, 9);
 assert.equal(audio.plays, plays);
 player.previous();
 await flush();
 assert.equal(player.getSnapshot().trackId, 'test-2');
 assert.equal(audio.src, '/2.mp3');
 assert.equal(audio.currentTime, 0);
 player.dispose();
});

test('ended advances in supplied order, the final song stops, and replay starts at zero', async () => {
 const audio = new FakeAudio();
 const player = new MusicPlayer(tracks, audio);
 player.play('test-1');
 await flush();
 audio.metadata(180);
 audio.end();
 await flush();
 assert.equal(audio.src, '/2.mp3');
 assert.equal(player.getSnapshot().playing, true);
 assert.equal(player.getSnapshot().currentTime, 0);
 audio.metadata(210);
 audio.end();
 await flush();
 assert.equal(audio.src, '/3.mp3');
 audio.metadata(220);
 audio.end();
 await flush();
 assert.equal(player.getSnapshot().trackId, 'test-3');
 assert.equal(player.getSnapshot().playing, false);
 assert.equal(audio.plays, 3);
 player.play('test-3');
 await flush();
 assert.equal(audio.currentTime, 0);
 assert.equal(player.getSnapshot().currentTime, 0);
 assert.equal(player.getSnapshot().playing, true);
 player.dispose();
});

test('stale play rejection cannot cancel a newly selected song', async () => {
 const audio = new FakeAudio();
 let reject;
 audio.nextPlay = new Promise((_, r) => { reject = r; });
 const player = new MusicPlayer(tracks, audio);
 player.play('test-1');
 audio.nextPlay = null;
 player.play('test-2');
 await flush();
 reject(new Error('[test]'));
 await flush();
 assert.equal(player.getSnapshot().trackId, 'test-2');
 assert.equal(player.getSnapshot().playing, true);
 assert.equal(player.getSnapshot().error, null);
 player.dispose();
});

test('rapid pause cannot be undone by a pending play resolution or a late playing event', async () => {
 const audio = new FakeAudio();
 let resolve;
 audio.nextPlay = new Promise(r => { resolve = r; });
 const player = new MusicPlayer(tracks, audio);
 player.toggle('test-1');
 player.toggle('test-1');
 resolve();
 await flush();
 audio.fire('playing');
 assert.equal(player.getSnapshot().playing, false);
 player.dispose();
});

test('rejected playback is retryable and unknown IDs are ignored', async () => {
 const audio = new FakeAudio();
 audio.nextPlay = Promise.reject(new Error('[test]'));
 const player = new MusicPlayer(tracks, audio);
 player.play('test-1');
 await flush();
 assert.ok(player.getSnapshot().error);
 audio.nextPlay = null;
 player.play('test-1');
 await flush();
 assert.equal(player.getSnapshot().error, null);
 assert.equal(player.getSnapshot().playing, true);
 const plays = audio.plays;
 const snapshot = player.getSnapshot();
 player.toggle('unknown');
 player.play('unknown');
 assert.equal(audio.plays, plays);
 assert.deepEqual(player.getSnapshot(), snapshot);
 player.dispose();
});

test('an audio error stops playback and can be retried', async () => {
 const audio = new FakeAudio();
 const player = new MusicPlayer(tracks, audio);
 player.play('test-1');
 await flush();
 audio.fire('error');
 assert.equal(player.getSnapshot().playing, false);
 assert.ok(player.getSnapshot().error);
 player.play('test-1');
 await flush();
 assert.equal(player.getSnapshot().playing, true);
 assert.equal(player.getSnapshot().error, null);
 player.dispose();
});

test('unsubscribing the app preserves playback and timeline; disposing stops and removes listeners', async () => {
 const audio = new FakeAudio();
 const player = new MusicPlayer(tracks, audio);
 let notifications = 0;
 const unsubscribe = player.subscribe(() => { notifications++; });
 player.play('test-1');
 await flush();
 audio.metadata(180);
 audio.tick(30);
 unsubscribe();
 const before = notifications;
 audio.tick(31);
 assert.equal(audio.playing, true);
 assert.equal(player.getSnapshot().playing, true);
 assert.equal(player.getSnapshot().currentTime, 31);
 assert.equal(notifications, before);
 player.dispose();
 assert.equal(audio.playing, false);
 assert.equal(audio.src, '');
 assert.equal([...audio.listeners.values()].reduce((n, listeners) => n + listeners.size, 0), 0);
 const plays = audio.plays;
 player.play('test-2');
 player.toggle('test-1');
 player.previous();
 player.next();
 player.seek(20);
 assert.equal(audio.plays, plays);
 assert.equal(audio.src, '');
 assert.equal(audio.currentTime, 0);
});

test('disposing during a pending play prevents its completion from updating state', async () => {
 const audio = new FakeAudio();
 let resolve;
 audio.nextPlay = new Promise(r => { resolve = r; });
 const player = new MusicPlayer(tracks, audio);
 player.play('test-1');
 player.dispose();
 const snapshot = player.getSnapshot();
 resolve();
 await flush();
 assert.deepEqual(player.getSnapshot(), snapshot);
 assert.equal(audio.playing, false);
 assert.equal(audio.src, '');
});
