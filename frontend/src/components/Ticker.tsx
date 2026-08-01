const items = [
  'PREMIUM GRADE',
  'LAB VERIFIED',
  'WARRIOR FUELED',
  'BUILT IN THE SHADOWS',
  'NO COMPROMISE',
  'FORGED FOR DOMINANCE',
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#e41e26] py-4 overflow-hidden border-y-2 border-[#b91219]">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="ghost-logo-text text-xl text-white whitespace-nowrap">
              {t}
            </span>
            <span className="text-white/60 text-xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}