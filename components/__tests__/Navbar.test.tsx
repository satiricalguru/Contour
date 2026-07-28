import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar component', () => {
  it('renders navigation links and main navigation landmark', () => {
    render(<Navbar />);

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('Studio')).toBeInTheDocument();
    expect(screen.getByText('Information')).toBeInTheDocument();
  });

  it('toggles site theme on theme button click', () => {
    render(<Navbar />);

    const themeButton = screen.getByRole('button', { name: /toggle site theme/i });
    expect(themeButton).toBeInTheDocument();

    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains('light-theme')).toBe(true);

    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains('light-theme')).toBe(false);
  });
});
