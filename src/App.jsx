import { useEffect, useRef, useState } from "react";
import './App.css'
import icon from './assets/img/icons/piep_logo.png';
import DevModal from "./misc/DevModal";


function App() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const dropdownRef = useRef(null);


  const images = import.meta.glob('./assets/img/tagaytay/*.{jpg,jpeg,png}', {
    eager: true,
    import: 'default',
  });
  const [imageList, setImageList] = useState(Object.values(images));
  
  // const imageList = Object.values(images);


  useEffect(() => {
    console.log(imageList);  
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="mx-4 md:mx-10 px-0 py-4 flex justify-between items-center">

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-700 rounded-full overflow-hidden">
              <img src={icon} className="w-full h-full object-cover" />
            </div>

            <div className="max-w-[180px] md:max-w-none">
              <h1 className="font-bold text-sm md:text-xl text-green-900 leading-tight">
                Philippine Institute of Environmental Planners
              </h1>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 font-medium">
            <a href="#" className="hover:text-green-900">Home</a>
            <a href="#" className="hover:text-green-900">About PAGTIBAY 2026 <span>▾</span></a>
            <a href="#" className="hover:text-green-900">Invitation/Registration <span>▾</span></a>
            <a href="#" className="hover:text-green-900">Program & CPD</a>
            <a href="#" className="hover:text-green-900">Speakers</a>
            <a href="#" className="hover:text-green-900">Delegates Advisory</a>
            <a href="#" className="hover:text-green-900">Sponsors/Exhibitors</a>
          </nav>

          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="hover:text-green-900 flex items-center gap-1"
            >
              More <span>▾</span>
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg overflow-hidden">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Sponsors / Exhibitors
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  FAQs
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Contact Us
                </a>
              </div>
            )}
          </div>

          <button className="md:hidden text-2xl text-black-600" id="menuBtn">
            ☰
          </button>
        </div>

        <div id="mobileMenu" className="hidden md:hidden px-4 pb-4 bg-white">
          <a href="#" className="block py-2">Home</a>
          <a href="#" className="block py-2">About PAGTIBAY 2026</a>
          <a href="#" className="block py-2">Invitation/Registration</a>
          <a href="#" className="block py-2">Program & CPD</a>
          <a href="#" className="block py-2">Delegates Advisory</a>
          <a href="#" className="block py-2">Sponsors/Exhibitors</a>
        </div>

        

      </header>

      

      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070"
          className="w-full h-[700px] object-cover"
        />

        <div className="absolute inset-0">
          {imageList.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`absolute inset-0 w-full h-[700px] object-cover transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* white fade */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        </div>

        {/* content layer */}
        <div className="absolute inset-0 flex items-center">
          
          <div className="w-full mx-4 md:mx-10 px-4 md:px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">

            {/* LEFT TEXT */}
            <div className="text-white max-w-2xl">
              <span className="bg-green-900 px-3 text py-1 md:px-4 md:py-2 rounded-full text-xs md:text-lg">
                35TH PIEP NATIONAL CONVENTION
              </span>

              <h1 className="text-3xl md:text-5xl font-bold mt-4 md:mt-6 leading-tight text-green-900">
                PAGTIBAY 2026
              </h1>

              <p className="mt-4 md:mt-6 text-sm md:text-lg lg:text-3xl leading-relaxed font-medium text-black italic">
                Mula Kabundukan Hanggang Bahura:
                Matatag na Pagpaplanong Espasyal sa Gitna ng Mabilis na Urbanisasyon
              </p>

              <p className="mt-4 text-md text-green-900">
                <span className="mx-1">
                  <i class="fa-regular fa-calendar-days"></i>
                </span>
                November 9-13 2026
              </p>

              <p className="mt-4 text-md text-green-900">
                <span className="mx-1">
                  <i class="fa-regular fa-calendar-days"></i>
                </span>
                Convention Proper: November 10-12, 2026
              </p>

              <p className="mt-4 text-md text-green-900">
                <span className="mx-1">
                  <i class="fa-solid fa-location-pin"></i>
                </span>
                Taal Vista Hotel, Tagaytay City, Cavite
              </p>

              <p className="mt-4 text-md text-green-900">
                <span className="mx-1">
                  <i class="fa-solid fa-user-group"></i>
                </span>
                HOST: PIEP Cavite Chapter
              </p>

              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
                <button className="bg-green-900 px-5 py-3 rounded-lg hover:bg-green-800">
                  Register Now
                </button>

                <button className="border border-green-900 text-green-900 px-5 py-3 rounded-lg hover:bg-white hover:text-black">
                  View Program
                </button>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-sm lg:max-w-md mx-auto lg:mx-0">
              <h2 className="text-center text-lg md:text-xl font-bold mb-6">
                COUNTDOWN TO PAGTIBAY 2026
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-4xl font-bold text-green-900">00</div>
                  <p>DAYS</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-green-900">00</div>
                  <p>HRS</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-green-900">00</div>
                  <p>MINS</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-green-900">00</div>
                  <p>SECS</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto bg-green-900 p-12">
        <div className="bg-green-900 overflow-hidden grid lg:grid-cols-2 h-3/4">
          

          <div className="">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070"
              className="w-full h-full object-fill rounded-3xl"
            />
          </div>
          

          <div className="p-10 text-white flex flex-col justify-start">
            <p className="text-yellow-400 font-semibold">LIVE STREAMING</p>

            <h2 className="text-4xl font-bold mt-4">
              Watch PAGTIBAY 2026 live on our YouTube Channel
            </h2>

            <p className="mt-6 text-lg">
              Tune in to the official livestream for the latest session, announcements, and updates
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold">
                Watch on YouTube
              </button>

              <button className="border border-white px-6 py-3 rounded-lg">
                View Livestream Schedule
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
              <h3 className="font-bold text-green-900">DAY 0</h3>
              <p>Arrival & Hotel Check-in</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-900">DAY 1</h3>
              <p>Opening Ceremony</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-900">DAY 2</h3>
              <p>Technical Sessions</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-900">DAY 3</h3>
              <p>Closing Ceremony</p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-bold text-green-900">DAY 4</h3>
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

      <DevModal/>
    </>
  )
}

export default App