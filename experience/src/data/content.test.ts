import { describe, expect, it } from 'vitest';

import { interactionMap } from '../features/interactions/interactionMap';
import { content } from './content';

describe('content', () => {
  it('define todas las piezas del mensaje sin cadenas vacías', () => {
    expect(content.intro.eyebrow.trim().length).toBeGreaterThan(0);
    expect(content.intro.title.trim().length).toBeGreaterThan(0);
    expect(content.message.paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const paragraph of content.message.paragraphs) {
      expect(paragraph.trim().length).toBeGreaterThan(0);
    }
    expect(content.message.signature.trim().length).toBeGreaterThan(0);
    expect(content.rose.reveal.trim().length).toBeGreaterThan(0);
    expect(content.chick.notice.trim().length).toBeGreaterThan(0);
    expect(content.chick.reveal.trim().length).toBeGreaterThan(0);
    expect(content.discoveries.petal.trim().length).toBeGreaterThan(0);
    expect(content.discoveries.star.trim().length).toBeGreaterThan(0);
    expect(content.completion.badge.trim().length).toBeGreaterThan(0);
    expect(content.completion.text.trim().length).toBeGreaterThan(0);
    expect(content.footer.text.trim().length).toBeGreaterThan(0);
  });

  it('está personalizado para Priscila', () => {
    const all = JSON.stringify(content);
    expect(all).toContain('Pri');
    expect(all).toContain('Priscila');
  });

  it('cubre todas las interacciones registradas', () => {
    const ids = interactionMap.map((item) => item.id);
    expect(ids).toContain('rose');
    expect(ids).toContain('chick');
    expect(ids).toContain('discovery-petal');
    expect(ids).toContain('discovery-star');
  });
});