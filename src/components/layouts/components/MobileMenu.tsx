import { X } from "lucide-react";
// import LanguageSelector from "@/commonUI/LanguageSelector";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div className="fixed top-0 right-0 h-full w-64 bg-slate-800 z-50 md:hidden transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language Selector */}
        <div className="p-4 border-t border-slate-700">
          {/* <LanguageSelector /> */}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
