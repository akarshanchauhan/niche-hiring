import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserMenuModal } from './UserMenuModal';
import { GlobalSettingsModal } from './GlobalSettingsModal';

export const Navigation: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-[#ffffff] border-b border-[#e4e7ec] sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Brand title exactly per wireframe */}
          <Link
            to="/"
            className="text-[17px] font-semibold text-[#1c1d1f] hover:text-[#000000] transition-colors flex items-center gap-2 select-none"
          >
            HR Platform
          </Link>

          {/* Right: User avatar circle exactly per wireframe */}
          <button
            type="button"
            onClick={() => setUserMenuOpen(true)}
            aria-label="User account menu"
            className="w-9 h-9 rounded-full bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#d3d8df] flex items-center justify-center text-[#1c1d1f] text-[13px] font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#407ff2] focus-visible:outline-offset-2"
          >
            A
          </button>
        </div>
      </header>

      <UserMenuModal
        isOpen={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <GlobalSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};
