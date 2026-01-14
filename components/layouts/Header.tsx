import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <div>
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-slate-900">A</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                Aegis
              </span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </nav>
    </div>
  );
}
