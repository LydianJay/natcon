// import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-700 rounded-full"></div>
            <div>
              <h1 className="font-bold text-lg">PIEP</h1>
              <p className="text-sm">PAGTIBAY 2026</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 font-medium">
            <a href="index.html" className="hover:text-green-700">Home</a>
            <a href="pages/about.html" className="hover:text-green-700">About</a>
            <a href="pages/program.html" className="hover:text-green-700">Program</a>
            <a href="pages/speakers.html" className="hover:text-green-700">Speakers</a>
            <a href="pages/contact.html" className="hover:text-green-700">Contact</a>
          </nav>

          <button className="md:hidden text-2xl" id="menuBtn">☰</button>
        </div>

        <div id="mobileMenu" className="hidden md:hidden px-4 pb-4 bg-white">
          <a href="index.html" className="block py-2">Home</a>
          <a href="pages/about.html" className="block py-2">About</a>
          <a href="pages/program.html" className="block py-2">Program</a>
          <a href="pages/speakers.html" className="block py-2">Speakers</a>
          <a href="pages/contact.html" className="block py-2">Contact</a>
        </div>
      </header>

      <section className="relative">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070" 
            className="w-full h-[700px] object-cover" />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

            <div className="text-white">
              <span className="bg-green-700 px-4 py-2 rounded-full text-sm">
                35TH PIEP NATIONAL CONVENTION
              </span>

              <h1 className="text-5xl font-bold mt-6 leading-tight">
                PAGTIBAY 2026
              </h1>

              <p className="mt-6 text-lg leading-relaxed">
                Mula Talampas Hanggang Baybayin:
                Matatag na Pagpaplanong Espasyal sa Gitna ng Mabilis na Urbanisasyon
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="bg-green-700 px-6 py-3 rounded-lg hover:bg-green-800">
                  Register Now
                </button>

                <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black">
                  View Program
                </button>
              </div>

      <div className="relative mt-10 max-w-xl">

        <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/20">
          <div id="heroCarousel"
            className="flex transition-transform duration-700 ease-in-out">

            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070"
              className="w-full flex-shrink-0 h-[320px] object-cover" />

            <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070"
              className="w-full flex-shrink-0 h-[320px] object-cover" />

            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2074"
              className="w-full flex-shrink-0 h-[320px] object-cover" />

            <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074"
              className="w-full flex-shrink-0 h-[320px] object-cover" />

            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073"
              className="w-full flex-shrink-0 h-[320px] object-cover" />

            <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070"
              className="w-full flex-shrink-0 h-[320px] object-cover" />

          </div>
        </div>

        <button id="heroPrev"
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white px-4 py-2 rounded-full shadow-lg text-black">
          ❮
        </button>

        <button id="heroNext"
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white px-4 py-2 rounded-full shadow-lg text-black">
          ❯
        </button>

        </div>
          </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg ml-auto">
              <h2 className="text-center text-xl font-bold mb-6">
                COUNTDOWN TO PAGTIBAY 2026
              </h2>

              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div id="days" className="text-4xl font-bold text-green-700">00</div>
                  <p>DAYS</p>
                </div>

                <div>
                  <div id="hours" className="text-4xl font-bold text-green-700">00</div>
                  <p>HRS</p>
                </div>

                <div>
                  <div id="minutes" className="text-4xl font-bold text-green-700">00</div>
                  <p>MINS</p>
                </div>

                <div>
                  <div id="seconds" className="text-4xl font-bold text-green-700">00</div>
                  <p>SECS</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-green-900 rounded-3xl overflow-hidden grid lg:grid-cols-2">

          <div>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070"
                className="w-full h-full object-cover" />
          </div>

          <div className="p-10 text-white flex flex-col justify-center">
            <p className="text-yellow-400 font-semibold">LIVE STREAMING</p>

            <h2 className="text-4xl font-bold mt-4">
              Watch PAGTIBAY 2026 live on YouTube
            </h2>

            <p className="mt-6 text-lg">
              Tune in for the latest sessions, announcements, and updates.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold">
                Watch on YouTube
              </button>

              <button className="border border-white px-6 py-3 rounded-lg">
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            AT A GLANCE
          </h2>

          <div className="grid md:grid-cols-5 gap-6 text-center">

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-700">DAY 0</h3>
              <p>Arrival & Hotel Check-in</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-700">DAY 1</h3>
              <p>Opening Ceremony</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-700">DAY 2</h3>
              <p>Technical Sessions</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-700">DAY 3</h3>
              <p>Closing Ceremony</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-700">DAY 4</h3>
              <p>Optional Tours</p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            WHY ATTEND PAGTIBAY 2026?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">CPD Learning</h3>
              <p>Earn CPD units through accredited learning activities.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">National Dialogue</h3>
              <p>Discuss sustainable development and planning.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">Technical Exchange</h3>
              <p>Share knowledge and best practices.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">Networking</h3>
              <p>Build connections with professionals nationwide.</p>
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-green-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-2xl font-bold">PIEP</h3>
            <p className="mt-4">
              Advancing sustainable and resilient communities through planning excellence.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">Program</a></li>
              <li><a href="#">Registration</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>piepnatcon2026@piep.org</p>
            <p>www.piep.org</p>
          </div>

        </div>
      </footer>
    </>
  )
}

export default App
