import { useState } from "react";

import piepQR from "../assets/img/icons/piep_qr.png";
import { Link } from "react-router";


export default function SponsorsPage() {
  const packages = [
    {
      code: "B1",
      name: "Platinum Exhibitor-Sponsor",
      preview: ['maximum visibility', 'premium booth presence', 'full-page ad', 'product presentation'],
      rate: "₱100,000",
      space: "Two 2m × 3m booth areas",
      access: "2 Representatives",
      ad: "Regular inside full-page ad",
      recognition: "Plaque of Recognition",
      recommended:
        "Major corporate sponsors, planning and environmental firms, technology providers, national agencies, universities, and institutional partners.",
      inclusions: [
        "Two booth areas, approximately 2m x 3m, subject to final venue layout",
        "First-priority booth location in a high-traffic area",
        "Convention ID, kits, and meals for two representatives",
        "Regular inside full-page advertisement",
        "20-minute sponsored product or service presentation slot",
        "Name and logo on sponsor tarpaulin, sponsor wall, digital sponsor board, and AV sponsor loop",
        "Verbal acknowledgement during convention sessions plenary or social program segments",
        "Inclusion in approved NatCon publicity materials",
        "Plaque of Recognition",
      ],
    },
    {
      code: "B2",
      name: "Diamond Exhibitor-Sponsor",
      preview: ['major booth presence', 'full-page ad', 'high sponsor visibility'],
      rate: "₱75,000",
      space: "Two 2m × 3m booth areas",
      access: "2 Representatives",
      ad: "Regular inside full-page ad",
      recognition: "Plaque of Recognition",
      recommended:
        "Major corporate sponsors, planning and environmental firms, technology providers, national agencies, universities, and institutional partners.",
      inclusions: [
        "Two booth areas, approximately 2m x 3m, subject to final venue layout",
        "Second-priority booth after platinum sponsors",
        "Convention ID, kits, and meals for two representatives",
        "Regular inside full-page advertisement in the Souvenir Program",
        "Name and logo on sponsor tarpaulin, sponsor wall, digital sponsor board, and AV sponsor loop",
        "Verbal acknowledgement during appropriate program segments",
        "Inclusion in approved NatCon publicity materials",
        "Plaque of Recognition",
      ],
    },
    {
      code: "B3",
      name: "Gold Exhibitor-Sponsor",
      preview: ['standard booth', 'half-page ad', 'sponsor visibility'],
      rate: "₱50,000",
      space: "One 2m × 2m booth area",
      access: "2 Representatives",
      ad: "Half-page ad",
      recognition: "Certificate of Appreciation",
      recommended:
        "Major corporate sponsors, planning and environmental firms, technology providers, national agencies, universities, and institutional partners.",
      inclusions: [
        "One booth area approx. 2m x 2m, subject to final venue layout",
        "Standart booth location, after platinum and Diamond Sponsors",
        "Convention ID, kits, and meals for two representatives",
        "Half-page advertisement in the Souvenir Program",
        "Name and logo on sponsor tarpaulin, sponsor wall, or digital sponsor board",
        "Inclusion in the official list of exhibitors and sponsors",
        "Certificate of Appreciation",
      ],
    },
  ];

  const [selected, setSelected] = useState(packages[0]);

  return (
    <div className="bg-[#f2efef] min-h-screen">

      {/* PACKAGE TABS */}
      <section className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.code}
              onClick={() => setSelected(pkg)}
              className={`px-5 py-3 rounded-lg font-semibold transition ${
                selected.code === pkg.code
                  ? "bg-green-900 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {pkg.name} 
              <span className="m-1 p-2 rounded-xl bg-yellow-300 text-dark shadow">
                {pkg.code}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden bg-green-900">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20">

          <div className="flex flex-col lg:flex-row justify-between gap-10">

            <div className="max-w-3xl">
              <div className="inline-block h-2 w-24 bg-yellow-400 rounded-full mb-6"></div>

              <h1 className="text-white text-5xl md:text-6xl font-black leading-tight">
                EXHIBITORS
                <br />
                PROSPECTUS
              </h1>

              <h2 className="text-yellow-400 text-3xl md:text-4xl font-bold mt-8">
                {selected.name}
              </h2>



              <p className="text-white/90 mt-4 text-lg">
                {selected.preview.map((p) => `${p} | `)}
              </p>
            </div>

            <div className="flex justify-center items-start">
              <div className="w-72 h-72 rounded-full border-[8px] border-yellow-400 flex flex-col justify-center items-center text-center bg-green-950/40 backdrop-blur-sm">
                <p className="text-yellow-400 uppercase font-bold text-lg">
                  Package Rate
                </p>

                <h3 className="text-white text-6xl font-black mt-3">
                  {selected.rate}
                </h3>

                <p className="text-yellow-300 mt-4 font-medium">
                  {selected.space}
                </p>
              </div>
            </div>

          </div>

          {/* FEATURE STRIP */}

          <div className="grid md:grid-cols-4 mt-16 rounded-2xl overflow-hidden shadow-2xl">

            <div className="bg-green-800 text-white p-6">
              <p className="uppercase text-xs mb-2">Space</p>
              <h3 className="font-bold text-xl">
                {selected.space}
              </h3>
            </div>

            <div className="bg-yellow-400 p-6">
              <p className="uppercase text-xs mb-2">Access</p>
              <h3 className="font-bold text-xl">
                {selected.access}
              </h3>
            </div>

            <div className="bg-yellow-100 p-6">
              <p className="uppercase text-xs mb-2">Ad</p>
              <h3 className="font-bold text-xl">
                {selected.ad}
              </h3>
            </div>

            <div className="bg-green-700 text-white p-6">
              <p className="uppercase text-xs mb-2">Recognition</p>
              <h3 className="font-bold text-xl">
                {selected.recognition}
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white rounded-[2rem] shadow-xl p-8 border-l-8 border-green-700">
              <h2 className="text-5xl font-black text-green-900 mb-8">
                INCLUSIONS
              </h2>

              <ul className="space-y-4">
                {selected.inclusions.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-lg"
                  >
                    <span className="text-yellow-500 mt-1">
                      ●
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* QR SECTION */}

            <div className="bg-white rounded-[2rem] shadow-xl p-10 text-center">

              <h2 className="text-4xl font-black text-green-900">
                SCAN TO DOWNLOAD CONTRACT
              </h2>

              <div className="h-1 bg-green-600 rounded my-5"></div>

              <h3 className="text-3xl font-bold text-green-900">
                EXHIBITOR CONTRACT
              </h3>

              <div className="mt-8 flex justify-center">
                <div className="w-72 h-72 bg-gray-100 p-0 rounded-xl border flex items-center justify-center">
                  <img src={piepQR} className="object-cover" />
                </div>
              </div>

              <Link to={"/exhibitors/reservation"} target="_blank" className="mt-8 bg-green-900 text-white px-4 py-4 rounded-lg font-bold hover:bg-green-800">
                Reservation Form
              </Link>

            </div>

          </div>

          {/* SIDEBAR */}

          <div className="space-y-8">

            <div className="bg-white rounded-[2rem] shadow-xl p-8 border-l-8 border-green-700">

              <h2 className="text-3xl font-black text-green-900 mb-4">
                RECOMMENDED FOR
              </h2>

              <div className="h-1 bg-yellow-400 rounded mb-5"></div>

              <p className="text-gray-700 leading-relaxed">
                {selected.recommended}
              </p>

              <div className="mt-8">
                <h3 className="text-2xl font-black text-green-900">
                  EVENT DETAILS
                </h3>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-yellow-600 font-bold">
                      EVENT
                    </p>
                    <p>2026 PIEP National Convention</p>
                  </div>

                  <div>
                    <p className="text-yellow-600 font-bold">
                      DATE
                    </p>
                    <p>November 9 to 13, 2026</p>
                  </div>

                  <div>
                    <p className="text-yellow-600 font-bold">
                      VENUE
                    </p>
                    <p>Taal Vista Hotel, Tagaytay City</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">

                <h3 className="text-2xl font-black text-green-900 mb-4">
                  EXHIBITS FOCUS
                </h3>

                <ul className="space-y-2">
                  {[
                    "Circular Economy",
                    "Water and Wastewater",
                    "GIS and Remote Sensing",
                    "Climate Resilience",
                    "Green Infrastructure",
                    "Responsible Resource Governance",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <span className="text-yellow-500">●</span>
                      {item}
                    </li>
                  ))}
                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTACT CTA */}

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-yellow-500 rounded-3xl p-8 shadow-xl flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>
            <h2 className="text-2xl font-bold text-black">
              RESERVE THIS PACKAGES
            </h2>

            <div className="w-full h-2 bg-black rounded mb-4 mt-1"></div>
            <div className="flex justify-between font-bold text-black mb-1">
                  <p>
                    CHERRY Z. CUEVAS
                  </p>

                  <p>
                    NATIONAL TREASURER
                  </p>
            </div>
            <div className="flex justify-between font-bold text-black mb-1">
                  <p>
                    piepnatcon2026@piep.org
                  </p>

                  <p>
                    president@piep.org
                  </p>
            </div>

            <p className="font-medium px-1">
              Subject line: Exhibitor Application - 2026 PIEP Natcon - PHILIPPINE INSTITUTE OF ENVIRONMENTAL PLANNERS
            </p>

            <p className="font-medium mt-2 px-1">
              All exhibitor packages are subject to availability, final venue layout, payment confirmation, and approval
              by the Natcon Committee. Exhibitor participation shall not be construed as PIEP endorsement.
            </p>
          </div>

          <div className="bg-white/30 rounded-3xl px-12 py-10">
            <span className="text-4xl font-black text-white">
              PIEPNATCON2026
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}