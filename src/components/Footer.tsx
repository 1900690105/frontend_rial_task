import Image from "next/image";

type Props = {
  address: string;
  phone: string;
  instagram: string;
};

export default function Footer({ address, phone, instagram }: Props) {
  return (
    <footer className="mt-24  border-t-4 border-dotted border-[#B45309] bg-[#FFFDF8]">
      {" "}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {" "}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Info */}{" "}
          <div>
            {" "}
            <h3 className="mb-4 text-2xl font-bold text-[#B45309] flex gap-2 items-center">
              <Image src={"/logo1.png"} alt="logo" width={60} height={60} />{" "}
              Cardamom House{" "}
            </h3>
            <p className="mb-4 text-slate-600">
              Slow brunch. Strong coffee. Lisbon, since 2021.
            </p>
            <div className="space-y-3">
              <p className="text-slate-700">📍 {address}</p>

              <a
                href={`tel:${phone}`}
                className="block text-slate-700 transition hover:text-[#B45309]"
              >
                📞 {phone}
              </a>

              <a
                href="https://instagram.com/cardamomhouse"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-700 transition hover:text-[#B45309]"
              >
                📷 {instagram}
              </a>
            </div>
          </div>
          {/* Map */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-amber-100 shadow-sm">
              <iframe
                title="Cardamom House Location"
                src="https://maps.google.com/maps?q=Rua%20da%20Boavista%2084%20Lisboa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                className="border-0"
              />
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-10 border-t border-amber-100 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-500 md:flex-row">
            <p>
              © {new Date().getFullYear()} Cardamom House. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a href="#brunch" className="hover:text-[#B45309]">
                Menu
              </a>

              <a href="#hours" className="hover:text-[#B45309]">
                Hours
              </a>

              <a href="#" className="hover:text-[#B45309]">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
