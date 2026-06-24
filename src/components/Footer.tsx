import Image from "next/image";

type Props = {
  address: string;
  phone: string;
  instagram: string;
};

export default function Footer({ address, phone, instagram }: Props) {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="
        mt-24
        border-t-4
        border-dotted
        border-[#B45309]
        bg-[#FFFDF8]
      "
    >
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 id="footer-heading" className="sr-only">
          Restaurant Information
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Information */}
          <section aria-labelledby="contact-heading">
            <h3
              id="contact-heading"
              className="
                mb-4
                flex
                items-center
                gap-2
                text-2xl
                font-bold
                text-[#B45309]
              "
            >
              <Image
                src="/logo1.png"
                alt="Cardamom House logo"
                width={60}
                height={60}
              />

              <span>Cardamom House</span>
            </h3>

            <p className="mb-4 text-slate-600">
              Slow brunch. Strong coffee. Lisbon, since 2021.
            </p>

            <address className="not-italic space-y-3">
              <p className="text-slate-700">
                <span aria-hidden="true" className="mr-2">
                  📍
                </span>
                {address}
              </p>

              <a
                href={`tel:${phone}`}
                aria-label={`Call us at ${phone}`}
                className="
                  block
                  text-slate-700
                  transition
                  hover:text-[#B45309]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#B45309]
                "
              >
                <span aria-hidden="true" className="mr-2">
                  📞
                </span>
                {phone}
              </a>

              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                className="
                  block
                  text-slate-700
                  transition
                  hover:text-[#B45309]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#B45309]
                "
              >
                <span aria-hidden="true" className="mr-2">
                  📷
                </span>
                {instagram}
              </a>
            </address>
          </section>

          {/* Map */}
          <section aria-labelledby="location-heading">
            <h3 id="location-heading" className="sr-only">
              Restaurant Location
            </h3>

            <div className="overflow-hidden rounded-3xl border border-amber-100 shadow-sm">
              <iframe
                title="Map showing Cardamom House location"
                src="https://maps.google.com/maps?q=Rua%20da%20Boavista%2084%20Lisboa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-10 border-t border-amber-100 pt-6">
          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-3
              text-sm
              text-slate-500
              md:flex-row
            "
          >
            <p>
              © {new Date().getFullYear()} Cardamom House. All rights reserved.
            </p>

            <nav aria-label="Footer navigation">
              <ul className="flex gap-6">
                <li>
                  <a
                    href="#menu"
                    className="
                      transition
                      hover:text-[#B45309]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#B45309]
                    "
                  >
                    Menu
                  </a>
                </li>

                <li>
                  <a
                    href="#hours"
                    className="
                      transition
                      hover:text-[#B45309]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#B45309]
                    "
                  >
                    Hours
                  </a>
                </li>

                <li>
                  <a
                    href="/privacy"
                    className="
                      transition
                      hover:text-[#B45309]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#B45309]
                    "
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
