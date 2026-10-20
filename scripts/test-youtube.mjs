import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/youtube/urls.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {
  compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext},
}).outputText;
const {extractYouTubeVideoId, createYouTubeEmbedUrl} = await import(
  'data:text/javascript;base64,' + Buffer.from(js).toString('base64')
);
const id = 'AsEk3-YpOjA';

test('official watch, share, Shorts, live, and embed links preserve the exact ID', () => {
  for (const url of [
    `https://www.youtube.com/watch?v=${id}`,
    `http://youtube.com/watch?feature=share&v=${id}&t=12`,
    `https://m.youtube.com/watch?v=${id}`,
    `https://music.youtube.com/watch?v=${id}`,
    `https://youtu.be/${id}?si=user-provided-tracking`,
    `https://www.youtu.be/${id}/`,
    `https://www.youtube.com/shorts/${id}?feature=share`,
    `https://youtube.com/live/${id}`,
    `https://www.youtube.com/embed/${id}?controls=1`,
    `https://www.youtube-nocookie.com/embed/${id}?playsinline=1`,
    `  https://www.youtube.com/watch?v=${id}  `,
    `https://WWW.YOUTUBE.COM/watch?v=${id}`,
  ]) {
    assert.equal(extractYouTubeVideoId(url), id, url);
  }
});

test('IDs must contain exactly eleven permitted characters and the URL must identify one video', () => {
  for (const url of [
    '', ' ', id, 'this is not a URL',
    'https://www.youtube.com/watch',
    'https://www.youtube.com/watch?v=',
    'https://www.youtube.com/watch?v=short',
    `https://www.youtube.com/watch?v=${id}x`,
    'https://www.youtube.com/watch?v=abc!efghijk',
    `https://www.youtube.com/watch?v=${id}&v=3bLMMyLYgao`,
    `https://youtu.be/${id}/another-video`,
    `https://www.youtube.com/shorts/${id}/another-video`,
    `https://www.youtube.com/channel/${id}`,
    `https://www.youtube.com/playlist?list=${id}`,
    'https://youtu.be/%41sEk3-YpOjA',
    `https://www.youtube.com/wa\ttch?v=${id}`,
  ]) {
    assert.equal(extractYouTubeVideoId(url), null, url);
  }
});

test('untrusted hosts, credentials, ports, and non-HTTP protocols cannot become player sources', () => {
  for (const url of [
    `https://notyoutube.com/watch?v=${id}`,
    `https://youtube.com.evil.example/watch?v=${id}`,
    `https://evil.example/youtu.be/${id}`,
    `https://www.youtube.com@evil.example/watch?v=${id}`,
    `https://user:password@www.youtube.com/watch?v=${id}`,
    `https://www.youtube.com:8443/watch?v=${id}`,
    `https://www.youtube.com./watch?v=${id}`,
    `ftp://www.youtube.com/watch?v=${id}`,
    `javascript:alert('${id}')`,
    `data:text/html,https://youtu.be/${id}`,
    `//www.youtube.com/watch?v=${id}`,
  ]) {
    assert.equal(extractYouTubeVideoId(url), null, url);
  }
});

test('embed URLs stay on the official privacy-enhanced host and expose native controls', () => {
  for (const origin of ['https://different-day-phone-stories.civilscout19.chatgpt.site', 'http://localhost:5192']) {
    const url = new URL(createYouTubeEmbedUrl(id, origin));
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, 'www.youtube-nocookie.com');
    assert.equal(url.pathname, `/embed/${id}`);
    assert.equal(url.searchParams.get('playsinline'), '1');
    assert.equal(url.searchParams.get('controls'), '1');
    assert.equal(url.searchParams.get('enablejsapi'), '1');
    assert.equal(url.searchParams.get('origin'), origin);
    assert.equal(url.searchParams.get('rel'), '0');
    assert.notEqual(url.searchParams.get('autoplay'), '1');
  }
});

test('invalid IDs or player origins fail before an iframe is constructed', () => {
  for (const invalid of ['', 'too-short', `${id}/other`, `${id}?autoplay=1`, `<${id}>`]) {
    assert.throws(() => createYouTubeEmbedUrl(invalid, 'https://example.com'), TypeError);
  }
  for (const invalid of ['', 'null', 'file:///tmp/index.html', 'javascript:alert(1)', 'https://user:pass@example.com', 'https://example.com/path', 'https://example.com?x=1', 'https://example.com#fragment']) {
    assert.throws(() => createYouTubeEmbedUrl(id, invalid), TypeError);
  }
});

test('all eleven supplied records retain their owner, original order, URL, and video ID', async () => {
  const fixture = JSON.parse(await readFile(new URL('../src/youtube/source/character_youtube_history.json', import.meta.url), 'utf8'));
  const expected = {
    'choi-doan': ['AsEk3-YpOjA', '3bLMMyLYgao', 'JEIcjRj7S9g'],
    'lim-hyeongwoo': ['d0yGdNEWdn0', 'YEaSxhcns7Y', 'Oxf8ULSB8yU'],
    'yoon-yeondo': ['0JmiC5nbuCM', '97_VJve7UVc'],
    'kang-ryeoun': ['ZlnabTp05h8', '0JMdXFHo5SY', 'EI5fQm0xpVM'],
  };
  assert.deepEqual(Object.keys(fixture.characters), Object.keys(expected));
  let count = 0;
  for (const [owner, ids] of Object.entries(expected)) {
    const videos = fixture.characters[owner].videos;
    assert.deepEqual(videos.map(video => video.videoId), ids);
    assert.deepEqual(videos.map(video => video.order), ids.map((_, i) => i + 1));
    for (const video of videos) {
      assert.equal(extractYouTubeVideoId(video.originalUrl), video.videoId);
      assert.equal(extractYouTubeVideoId(video.watchUrl), video.videoId);
      assert.equal(extractYouTubeVideoId(video.embedUrl), video.videoId);
      assert.equal(video.viewedAt, null);
      assert.equal(video.durationSeconds, null);
      count++;
    }
  }
  assert.equal(count, 11);
});

test('generated character data preserves every source record without invented metadata or dates', async () => {
  const fixture = JSON.parse(await readFile(new URL('../src/youtube/source/character_youtube_history.json', import.meta.url), 'utf8'));
  const report = JSON.parse(await readFile(new URL('../src/youtube/source/metadata-verification.json', import.meta.url), 'utf8'));
  for (const [owner, letter] of Object.entries({'choi-doan':'A','lim-hyeongwoo':'B','yoon-yeondo':'C','kang-ryeoun':'D'})) {
    const source = await readFile(new URL(`../src/youtube/data/${letter}.ts`, import.meta.url), 'utf8');
    const output = ts.transpileModule(source, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
    const {default: records} = await import('data:text/javascript;base64,' + Buffer.from(output).toString('base64'));
    const expected = [...fixture.characters[owner].videos].sort((a,b)=>a.order-b.order);
    assert.equal(records.length, expected.length);
    for (let i = 0; i < records.length; i++) {
      const actual = records[i], supplied = expected[i];
      for (const key of ['id','videoId','originalUrl','order']) assert.equal(actual[key], supplied[key]);
      const evidence = report.videos.find(v=>v.videoId===supplied.videoId);
      if (evidence.metadata === 'verified') {
        assert.equal(actual.title,evidence.title);
        assert.equal(actual.channel,evidence.channel);
      } else {
        assert.equal(actual.title,supplied.title);
        assert.equal(actual.channel,null);
        assert.equal(actual.thumbnailUrl,supplied.thumbnailUrl);
      }
      assert.equal('viewedAt' in actual,false);
      assert.equal('durationSeconds' in actual,false);
    }
  }
});
