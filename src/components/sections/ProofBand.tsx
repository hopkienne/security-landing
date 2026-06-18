import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'

const logos = [
  {
    src: '/secureops/proof-logo-idc.svg',
    alt: 'Leading security professional IDC',
    width: 106,
  },
  {
    src: '/secureops/proof-logo-2.svg',
    alt: 'Security industry recognition logo 2',
    width: 95,
  },
  {
    src: '/secureops/proof-logo-3.svg',
    alt: 'Security industry recognition logo 3',
    width: 114,
  },
  {
    src: '/secureops/proof-logo-4.svg',
    alt: 'Security industry recognition logo 4',
    width: 87,
  },
  {
    src: '/secureops/proof-logo-5.svg',
    alt: 'Security industry recognition logo 5',
    width: 210,
  },
  {
    src: '/secureops/proof-logo-6.svg',
    alt: 'Security industry recognition logo 6',
    width: 50,
  },
  {
    src: '/secureops/proof-logo-7.svg',
    alt: 'Security industry recognition logo 7',
    width: 113,
  },
  {
    src: '/secureops/proof-logo-8.svg',
    alt: 'Security industry recognition logo 8',
    width: 210,
  },
  {
    src: '/secureops/proof-logo-9.svg',
    alt: 'Security industry recognition logo 9',
    width: 210,
  },
]

export function ProofBand() {
  return (
    <section
      className="overflow-hidden bg-[#eef4fb] pb-14 pt-5 sm:pb-16 lg:pb-28 lg:pt-0"
      aria-label="Logo carousel"
    >
      <div className="mx-auto w-full">
        <Reveal>
          <div className="mx-auto mb-7 max-w-[310px] text-center lg:max-w-max">
            <p className="text-xl font-medium leading-snug tracking-normal text-ink sm:text-2xl">
              Chuyên gia an ninh hàng đầu khuyên dùng SecureOps
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="group/marquee overflow-hidden py-2">
            <div
              className="marquee-track items-center gap-20 pr-20 lg:gap-24 lg:pr-24"
              style={{ animationDuration: '140s' }}
            >
              {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.src}-${index}`}
                  className="flex shrink-0 items-center justify-center"
                  aria-hidden={index >= logos.length}
                >
                  <Image
                    src={logo.src}
                    alt={index < logos.length ? logo.alt : ''}
                    width={logo.width}
                    height={80}
                    loading="lazy"
                    draggable={false}
                    className="h-10 w-auto object-contain lg:h-20"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
