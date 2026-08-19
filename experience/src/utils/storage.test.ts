import { describe, expect, it } from 'vitest';

import { safeReadJson, safeRemove, safeWriteJson } from './storage';

describe('storage', () => {
  it('guarda y lee objetos JSON', () => {
    safeWriteJson('test-key', { discovered: ['rose'], completed: false });
    expect(safeReadJson<{ discovered: string[] }>('test-key')).toEqual({
      discovered: ['rose'],
      completed: false,
    });
  });

  it('devuelve null cuando la clave no existe', () => {
    expect(safeReadJson('clave-inexistente')).toBeNull();
  });

  it('devuelve null ante JSON corrupto sin romper la experiencia', () => {
    window.localStorage.setItem('test-key', '{rotos');
    expect(safeReadJson('test-key')).toBeNull();
  });

  it('elimina claves', () => {
    safeWriteJson('test-key', 1);
    safeRemove('test-key');
    expect(safeReadJson('test-key')).toBeNull();
  });
});