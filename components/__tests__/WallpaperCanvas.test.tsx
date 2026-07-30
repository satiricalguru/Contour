import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { WallpaperCanvas } from '../WallpaperCanvas';

describe('WallpaperCanvas component', () => {
  it('renders canvas with specified dimensions', () => {
    const { container } = render(
      <WallpaperCanvas
        patternId="flowing-hills"
        paletteId="charcoal"
        seed={42}
        inverted={false}
        width={800}
        height={600}
      />
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('style');
  });
});
