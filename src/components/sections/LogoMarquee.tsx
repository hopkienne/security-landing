/**
 * Continuously scrolling "trusted by" marquee. Pure CSS animation (see
 * .marquee-track in globals.css); pauses on hover. Logos are rendered as
 * styled text wordmarks so no external image assets are required.
 */
const LOGOS = [
  'NovaBank',
  'VietPharma',
  'TechHub',
  'GreenLogistics',
  'MetroRetail',
  'CloudWave',
  'FinSecure',
  'DeltaManufacturing',
]

export function LogoMarquee() {
  return (
    <section className="border-y border-border-soft bg-white py-10">
      <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate">
        Đồng hành cùng các doanh nghiệp hàng đầu
      </p>
      <div className="group/marquee marquee-mask relative overflow-hidden">
        <div className="marquee-track gap-14 pr-14">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="shrink-0 text-xl font-extrabold tracking-tight text-slate/45 transition-colors hover:text-primary"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
