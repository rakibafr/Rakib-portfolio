import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateInitials,
  filterProjects,
  isDirectVideoFile,
  getEmbedOrDirectVideoUrl,
  buildMailtoUrl,
  calculateClipPathPercent,
  ProjectItem,
} from './portfolio-logic';

test('generateInitials returns up to 3 uppercase initials', () => {
  assert.equal(generateInitials('Alex Morgan Vance'), 'AMV');
  assert.equal(generateInitials('David Fincher'), 'DF');
  assert.equal(generateInitials('Single'), 'S');
  assert.equal(generateInitials('   '), 'VFX');
});

test('filterProjects correctly filters projects by category', () => {
  const sample: ProjectItem[] = [
    {
      id: '1',
      title: 'Sci-Fi Short',
      cat: 'Direction',
      type: 'Short Film',
      desc: 'A film',
      video: '',
      thumb: '',
    },
    {
      id: '2',
      title: 'Cyberpunk Teaser',
      cat: 'VFX',
      type: 'Teaser',
      desc: 'VFX shot',
      video: '',
      thumb: '',
    },
    {
      id: '3',
      title: 'Brand Commercial',
      cat: 'Direction',
      type: 'Commercial',
      desc: 'Ad',
      video: '',
      thumb: '',
    },
  ];

  assert.equal(filterProjects(sample, 'All').length, 3);
  assert.equal(filterProjects(sample, 'Direction').length, 2);
  assert.equal(filterProjects(sample, 'VFX').length, 1);
  assert.equal(filterProjects(sample, '3D').length, 0);
});

test('isDirectVideoFile detects direct mp4, webm, and mov video extensions', () => {
  assert.equal(isDirectVideoFile('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'), true);
  assert.equal(isDirectVideoFile('videos/reel.webm?v=2'), true);
  assert.equal(isDirectVideoFile('https://vimeo.com/1234567'), false);
  assert.equal(isDirectVideoFile('https://youtube.com/watch?v=dQw4w9WgXcQ'), false);
  assert.equal(isDirectVideoFile(''), false);
});

test('getEmbedOrDirectVideoUrl handles YouTube, Vimeo, and files correctly', () => {
  const yt = getEmbedOrDirectVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(yt.type, 'iframe');
  assert.ok(yt.src.includes('youtube.com/embed/dQw4w9WgXcQ'));

  const vimeo = getEmbedOrDirectVideoUrl('https://vimeo.com/76979871');
  assert.equal(vimeo.type, 'iframe');
  assert.ok(vimeo.src.includes('player.vimeo.com/video/76979871'));

  const direct = getEmbedOrDirectVideoUrl('https://example.com/reel.mp4');
  assert.equal(direct.type, 'file');
  assert.equal(direct.src, 'https://example.com/reel.mp4');
});

test('buildMailtoUrl encodes parameters properly', () => {
  const url = buildMailtoUrl('director@vfx.studio', 'John Doe', 'Hello! Interested in collaborating.');
  assert.ok(url.startsWith('mailto:director@vfx.studio?subject=Portfolio%20inquiry%20from%20John%20Doe'));
  assert.ok(url.includes('Hello'));
});

test('calculateClipPathPercent clamps between 0 and 100', () => {
  assert.equal(calculateClipPathPercent(45), 45);
  assert.equal(calculateClipPathPercent(-10), 0);
  assert.equal(calculateClipPathPercent(120), 100);
  assert.equal(calculateClipPathPercent(NaN), 50);
});
