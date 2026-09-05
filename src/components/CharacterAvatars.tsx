import React from 'react';

interface AvatarProps {
  id: string;
  className?: string;
  isActionActive?: boolean;
}

export const DisneyCharacterAvatar: React.FC<AvatarProps> = ({ id, className = "w-24 h-24", isActionActive = false }) => {
  switch (id) {
    case 'mickey':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mickey Mouse with Sorcerer Hat */}
          {/* Left Ear */}
          <circle cx="28" cy="42" r="22" fill="#18181B" stroke="#27272A" strokeWidth="2" />
          {/* Right Ear */}
          <circle cx="92" cy="42" r="22" fill="#18181B" stroke="#27272A" strokeWidth="2" />
          {/* Head Base */}
          <circle cx="60" cy="74" r="32" fill="#18181B" />
          {/* Face peach mask */}
          <ellipse cx="60" cy="78" rx="24" ry="20" fill="#FED7AA" />
          <ellipse cx="50" cy="70" rx="9" ry="14" fill="#FED7AA" />
          <ellipse cx="70" cy="70" rx="9" ry="14" fill="#FED7AA" />
          {/* Eyes */}
          <ellipse cx="53" cy="70" rx="4" ry="7" fill="#18181B" />
          <ellipse cx="67" cy="70" rx="4" ry="7" fill="#18181B" />
          <circle cx="54" cy="68" r="1.5" fill="#FFFFFF" />
          <circle cx="68" cy="68" r="1.5" fill="#FFFFFF" />
          {/* Cute Nose */}
          <ellipse cx="60" cy="80" rx="6" ry="4" fill="#18181B" />
          {/* Smile */}
          <path d="M50 86 Q60 96 70 86" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M54 89 Q60 94 66 89" fill="#EF4444" />
          {/* Sorcerer Hat */}
          <path d="M36 48 L60 6 L84 48 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
          {/* Gold Moon and Stars on Hat */}
          <path d="M58 20 A6 6 0 0 0 66 28 A8 8 0 0 1 58 20" fill="#FBBF24" />
          <polygon points="50,34 52,38 56,38 53,41 54,45 50,42 46,45 47,41 44,38 48,38" fill="#FBBF24" />
          <polygon points="70,30 71,33 74,33 72,35 73,38 70,36 67,38 68,35 66,33 69,33" fill="#FBBF24" />
          {isActionActive && (
            <g className="animate-spin origin-center" style={{ transformOrigin: '60px 10px' }}>
              <circle cx="60" cy="10" r="14" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="60,4 62,8 66,8 63,11 64,15 60,13 56,15 57,11 54,8 58,8" fill="#FDE047" />
            </g>
          )}
        </svg>
      );

    case 'genie':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Genie Aladdin */}
          {/* Swirling smokey lamp tail */}
          <path d="M60 110 C50 100 40 85 52 75 C62 65 58 55 60 50" stroke="#06B6D4" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
          {/* Body */}
          <ellipse cx="60" cy="55" rx="26" ry="24" fill="#0EA5E9" />
          {/* Big Chin */}
          <path d="M50 56 C50 72 70 72 70 56 Z" fill="#38BDF8" />
          <circle cx="60" cy="67" r="4" fill="#0284C7" />
          {/* Beard curly tip */}
          <path d="M59 69 Q60 76 65 74 Q68 72 65 70" stroke="#0C4A6E" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Head */}
          <circle cx="60" cy="40" r="20" fill="#38BDF8" />
          {/* Eyes with big playful eyebrows */}
          <ellipse cx="53" cy="38" rx="3.5" ry="4.5" fill="#FFFFFF" />
          <circle cx="54" cy="38" r="2" fill="#0F172A" />
          <ellipse cx="67" cy="38" rx="3.5" ry="4.5" fill="#FFFFFF" />
          <circle cx="66" cy="38" r="2" fill="#0F172A" />
          <path d="M48 31 Q54 27 58 32" stroke="#0C4A6E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M62 32 Q66 27 72 31" stroke="#0C4A6E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Huge friendly grin */}
          <path d="M48 48 Q60 62 72 48 Z" fill="#FFFFFF" stroke="#0C4A6E" strokeWidth="1.5" />
          <path d="M52 50 Q60 58 68 50" stroke="#E2E8F0" strokeWidth="1" />
          {/* Gold Earring */}
          <circle cx="79" cy="44" r="5" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
          {/* Topknot pony with gold band */}
          <rect x="58" y="16" width="4" height="6" fill="#F59E0B" rx="1" />
          <path d="M60 16 Q68 8 72 12 Q70 18 62 18" fill="#0C4A6E" />
          {/* Gold wrist cuffs */}
          <rect x="34" y="60" width="8" height="6" fill="#F59E0B" rx="2" />
          <rect x="78" y="60" width="8" height="6" fill="#F59E0B" rx="2" />
          {isActionActive && (
            <g>
              <circle cx="60" cy="40" r="38" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
            </g>
          )}
        </svg>
      );

    case 'simba':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simba Lion King */}
          {/* Red/Brown Lion Mane */}
          <circle cx="60" cy="60" r="42" fill="#B45309" />
          <circle cx="40" cy="35" r="16" fill="#92400E" />
          <circle cx="80" cy="35" r="16" fill="#92400E" />
          <circle cx="30" cy="65" r="14" fill="#92400E" />
          <circle cx="90" cy="65" r="14" fill="#92400E" />
          {/* Face */}
          <ellipse cx="60" cy="64" rx="26" ry="24" fill="#FBBF24" />
          {/* Ears */}
          <circle cx="42" cy="40" r="10" fill="#F59E0B" />
          <circle cx="42" cy="40" r="6" fill="#FEF3C7" />
          <circle cx="78" cy="40" r="10" fill="#F59E0B" />
          <circle cx="78" cy="40" r="6" fill="#FEF3C7" />
          {/* Muzzle */}
          <ellipse cx="60" cy="74" rx="16" ry="12" fill="#FEF3C7" />
          {/* Nose */}
          <polygon points="55,67 65,67 60,73" fill="#B91C1C" />
          <line x1="60" y1="73" x2="60" y2="78" stroke="#78350F" strokeWidth="2" />
          {/* Mouth */}
          <path d="M52 77 Q60 82 68 77" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Royal Eyes */}
          <ellipse cx="50" cy="58" rx="4.5" ry="6" fill="#FDE047" stroke="#78350F" strokeWidth="1" />
          <circle cx="51" cy="58" r="2.5" fill="#78350F" />
          <ellipse cx="70" cy="58" rx="4.5" ry="6" fill="#FDE047" stroke="#78350F" strokeWidth="1" />
          <circle cx="69" cy="58" r="2.5" fill="#78350F" />
          {/* Rafiki Red Mark on Forehead */}
          <ellipse cx="60" cy="50" rx="3" ry="5" fill="#DC2626" opacity="0.9" />
          {isActionActive && (
            <path d="M48 84 Q60 98 72 84 Z" fill="#991B1B" />
          )}
        </svg>
      );

    case 'tinkerbell':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tinker Bell */}
          {/* Translucent Pixie Wings */}
          <ellipse cx="36" cy="42" rx="22" ry="34" fill="#E0F2FE" opacity="0.75" transform="rotate(-25 36 42)" stroke="#38BDF8" strokeWidth="1.5" />
          <ellipse cx="84" cy="42" rx="22" ry="34" fill="#E0F2FE" opacity="0.75" transform="rotate(25 84 42)" stroke="#38BDF8" strokeWidth="1.5" />
          <ellipse cx="38" cy="68" rx="14" ry="20" fill="#E0F2FE" opacity="0.6" transform="rotate(-15 38 68)" />
          <ellipse cx="82" cy="68" rx="14" ry="20" fill="#E0F2FE" opacity="0.6" transform="rotate(15 82 68)" />
          {/* Hair Bun */}
          <circle cx="60" cy="30" r="16" fill="#FACC15" />
          <ellipse cx="60" cy="24" rx="10" ry="8" fill="#EAB308" />
          {/* Face */}
          <circle cx="60" cy="52" r="18" fill="#FED7AA" />
          {/* Blonde Bangs */}
          <path d="M44 46 Q54 36 62 45 Q70 38 76 48 Q64 42 44 46 Z" fill="#FACC15" />
          {/* Fairy Eyes */}
          <ellipse cx="54" cy="52" rx="3" ry="4.5" fill="#0284C7" />
          <ellipse cx="66" cy="52" rx="3" ry="4.5" fill="#0284C7" />
          <circle cx="55" cy="51" r="1" fill="#FFFFFF" />
          <circle cx="67" cy="51" r="1" fill="#FFFFFF" />
          {/* Rosy Cheeks & Smile */}
          <circle cx="48" cy="57" r="3" fill="#F43F5E" opacity="0.4" />
          <circle cx="72" cy="57" r="3" fill="#F43F5E" opacity="0.4" />
          <path d="M56 60 Q60 64 64 60" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Green Leaf Dress */}
          <path d="M50 68 L70 68 L66 94 L54 94 Z" fill="#22C55E" />
          <polygon points="50,68 60,76 70,68 66,74 54,74" fill="#16A34A" />
          {/* Magic Wand */}
          <line x1="72" y1="70" x2="98" y2="44" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="98,40 100,43 103,43 101,45 102,48 99,46 96,48 97,45 95,43 98,43" fill="#FACC15" />
        </svg>
      );

    case 'stitch':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stitch (Experiment 626) */}
          {/* Big Alien Ears */}
          <path d="M12 40 C6 15 28 20 42 42 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <path d="M18 36 C14 20 28 24 38 40 Z" fill="#F472B6" />
          <path d="M108 40 C114 15 92 20 78 42 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <path d="M102 36 C106 20 92 24 82 40 Z" fill="#F472B6" />
          {/* Head */}
          <ellipse cx="60" cy="62" rx="30" ry="26" fill="#2563EB" />
          {/* Lighter Eye Patch area */}
          <ellipse cx="46" cy="58" rx="12" ry="14" fill="#60A5FA" transform="rotate(-10 46 58)" />
          <ellipse cx="74" cy="58" rx="12" ry="14" fill="#60A5FA" transform="rotate(10 74 58)" />
          {/* Big Black Eyes */}
          <ellipse cx="46" cy="58" rx="7" ry="10" fill="#0F172A" />
          <circle cx="48" cy="54" r="2.5" fill="#FFFFFF" />
          <ellipse cx="74" cy="58" rx="7" ry="10" fill="#0F172A" />
          <circle cx="72" cy="54" r="2.5" fill="#FFFFFF" />
          {/* Wide Blue/Purple Alien Nose */}
          <ellipse cx="60" cy="68" rx="9" ry="6" fill="#1E1B4B" />
          {/* Huge Wide Grin */}
          <path d="M38 74 Q60 94 82 74" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Sharp Little Teeth */}
          <polygon points="48,76 52,76 50,81" fill="#FFFFFF" />
          <polygon points="68,76 72,76 70,81" fill="#FFFFFF" />
          {/* Chin tuft */}
          <path d="M58 88 Q60 92 62 88" stroke="#1D4ED8" strokeWidth="2" />
        </svg>
      );

    case 'ariel':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ariel Little Mermaid */}
          {/* Voluminous Red Hair */}
          <path d="M28 50 C20 20 50 14 62 18 C78 14 102 24 96 56 C92 78 80 84 88 100 C74 94 72 82 76 72 Z" fill="#DC2626" />
          {/* Big 90s Hair Swoop Bang */}
          <path d="M42 36 C34 22 58 16 68 28 C74 34 82 36 78 44 C66 40 50 48 42 36 Z" fill="#EF4444" />
          {/* Face */}
          <ellipse cx="58" cy="56" rx="16" ry="16" fill="#FED7AA" />
          {/* Beautiful Aqua Green Eyes */}
          <ellipse cx="52" cy="54" rx="3.5" ry="5" fill="#0D9488" />
          <circle cx="53" cy="52" r="1.5" fill="#FFFFFF" />
          <ellipse cx="66" cy="54" rx="3.5" ry="5" fill="#0D9488" />
          <circle cx="65" cy="52" r="1.5" fill="#FFFFFF" />
          {/* Smile */}
          <path d="M54 64 Q59 68 64 64" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Purple Seashell Bra Top */}
          <ellipse cx="50" cy="80" rx="9" ry="7" fill="#9333EA" stroke="#7E22CE" strokeWidth="1" />
          <ellipse cx="68" cy="80" rx="9" ry="7" fill="#9333EA" stroke="#7E22CE" strokeWidth="1" />
          {/* Mermaid Emerald Tail base */}
          <path d="M46 90 Q59 96 72 90 L68 112 Q59 108 50 112 Z" fill="#059669" />
          {/* Purple Starfish Hair Clip */}
          <polygon points="38,44 40,48 45,48 41,51 43,55 38,53 34,55 36,51 32,48 37,48" fill="#EC4899" />
        </svg>
      );

    default:
      return null;
  }
};
