import { describe, it, expect, beforeEach } from 'vitest';
import { useContourStore } from '../store';

describe('useContourStore state management', () => {
  beforeEach(() => {
    useContourStore.setState({
      patternId: 'flowing-hills',
      paletteId: 'nordic-frost',
      seed: 42,
      inverted: false,
      modelId: 'iphone-16-pro',
      favorites: [],
    });
  });

  it('updates pattern and palette', () => {
    const { setPattern, setPalette } = useContourStore.getState();
    setPattern('sand-dunes');
    setPalette('tokyo-neon');

    const state = useContourStore.getState();
    expect(state.patternId).toBe('sand-dunes');
    expect(state.paletteId).toBe('tokyo-neon');
  });

  it('toggles polarity', () => {
    const { togglePolarity } = useContourStore.getState();
    togglePolarity();
    expect(useContourStore.getState().inverted).toBe(true);
    togglePolarity();
    expect(useContourStore.getState().inverted).toBe(false);
  });

  it('randomizes seed on shuffle', () => {
    const initialSeed = useContourStore.getState().seed;
    useContourStore.getState().shuffle();
    const newSeed = useContourStore.getState().seed;
    expect(newSeed).not.toBe(initialSeed);
  });

  it('hydrates watch category and validates invalid models', () => {
    const { hydrateFromParams } = useContourStore.getState();
    const params = new URLSearchParams('device=watch&model=apple-watch-ultra-2');
    hydrateFromParams(params);

    const state = useContourStore.getState();
    expect(state.deviceCategory).toBe('watch');
    expect(state.modelId).toBe('apple-watch-ultra-2');

    // Invalid model should be ignored
    const invalidParams = new URLSearchParams('model=invalid-model-id');
    hydrateFromParams(invalidParams);
    expect(useContourStore.getState().modelId).toBe('apple-watch-ultra-2');
  });
});
