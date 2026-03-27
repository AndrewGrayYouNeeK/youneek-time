const sections = [
  {
    title: 'How to Read YouNeek Time',
    body: 'The day is split into 100 equal units from midnight to midnight, replacing the traditional 24-hour clock.',
    points: [
      '00 = midnight',
      '25 = 6:00 AM',
      '50 = noon',
      '75 = 6:00 PM'
    ]
  },
  {
    title: 'The Digital Display',
    body: 'The four-digit display shows where you are inside the 100-unit day. The first two digits are the YouNeek hour and the last two are the YouNeek minute.'
  },
  {
    title: 'The Analog Face',
    body: 'The outer ring maps the 24-hour day while the inner ring divides each YouNeek hour into 100 smaller minutes. The hands move continuously so the dial feels fluid and precise.'
  }
];

export default function AboutSection() {
  return (
    <section className="w-full rounded-[1.9rem] border border-white/10 bg-[#0d0d0d] px-5 py-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_0_28px_rgba(0,0,0,0.35)] sm:px-6">
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={section.title} className={index === 0 ? '' : 'border-t border-white/8 pt-6'}>
            <h2 className="font-mono text-sm uppercase tracking-[0.35em] text-emerald-300 sm:text-[15px]">
              {section.title}
            </h2>

            <p className="mt-4 max-w-[32rem] font-mono text-[13px] leading-8 tracking-[0.08em] text-white/45 sm:text-[14px]">
              {section.body}
            </p>

            {section.points && (
              <ul className="mt-4 space-y-3 font-mono text-[13px] tracking-[0.08em] text-white/70 sm:text-[14px]">
                {section.points.map((point) => {
                  const [value, label] = point.split(' = ');
                  return (
                    <li key={point} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,255,178,0.8)]" />
                      <span className="min-w-[2.4rem] font-semibold text-emerald-300">{value}</span>
                      <span className="text-white/42">= {label}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}