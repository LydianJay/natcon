import { useEffect, useRef, useState } from "react";
import './App.css'
import icon from './assets/img/icons/piep-logo.webp';
import caviteIcon from './assets/img/icons/piep_cavite.png';
import { Link } from "react-router";

function App() {
  const [moreOpen, setMoreOpen]                 = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]     = useState(false);
  const [currentSlide, setCurrentSlide]         = useState(0);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const dropdownRef                             = useRef(null);
  



  const advisories = [
    // {
    //   id: 1,
    //   month: 'Nov',
    //   day: '9',
    //   year: '2026',
    //   title: 'Test Title',
    //   description: '[Test Content] - This is a test content please disregard - Website is currently in development',
    // }, 
    // {
    //   id: 2,
    //   month: 'Nov',
    //   day: '4',
    //   year: '2026',
    //   title: 'Lorem Ipsum',
    //   description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    // },
    // {
    //   id: 3,
    //   month: 'Nov',
    //   day: '3',
    //   year: '2026',
    //   title: 'Lorem Ipsum',
    //   description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    // },
  ];

  const images = import.meta.glob('./assets/img/tagaytay/*.{jpg,jpeg,png}', {
    eager: true,
    import: 'default',
  });
  const [imageList, setImageList] = useState(Object.values(images));
  
  // const imageList = Object.values(images);


  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // November 9, 2026
    const targetDate = new Date("2026-11-09T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
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
            
            <div className="relative">
              <button
                onClick={() => setRegistrationOpen(!registrationOpen)}
                onMouseEnter={() => setRegistrationOpen(true)}
                
                className="hover:text-green-900 flex items-center gap-1"
              >
                Invitation/Registration <span>▾</span>
              </button>

              {registrationOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg text-green-900 border z-50" onMouseLeave={() => setRegistrationOpen(false)}>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfttMz8x6Rd3_IPMiDfPMzMi9Zrywplf0XviMeplDZnU8VCSQ/viewform?usp=dialog"
                    className="block px-4 py-3 hover:bg-gray-100 hover:text-green-500"
                    target="_blank"
                  >
                    <span className="mx-1">
                      <i className="fa-regular fa-envelope"></i>
                    </span>
                    Invitation
                  </a>

                  <Link
                    to="/registration"
                    className="block px-4 py-3 hover:bg-gray-100 hover:text-green-500"
                    target="_blank"
                  >
                    <span className="mx-1">
                      <i className="fa-solid fa-file-lines"></i>
                    </span>
                    Registration
                  </Link>
                </div>
              )}
            </div>

            <a href="#" className="hover:text-green-900">Program & CPD</a>
            <a href="#" className="hover:text-green-900">Speakers</a>
            <a href="#" className="hover:text-green-900">Delegates Advisory</a>
            <Link to="/exhibitors" className="hover:text-green-900" target="_blank">Sponsors/Exhibitors</Link>
          </nav>

          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="hover:text-green-900 flex items-center gap-1"
            >
              More <span>▾</span>
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg overflow-hidden text-green-900">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="mx-1">
                    <i className="fa-solid fa-bed"></i>
                  </span>
                  Accomodation
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="mx-1">
                    <i className="fa-solid fa-bus-simple"></i>
                  </span>
                  Transport & Accessability
                </a>

                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="mx-1">
                    <i className="fa-solid fa-landmark"></i>
                  </span>
                  Tours
                </a>

                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="mx-1">
                    <i className="fa-solid fa-briefcase-medical"></i>
                  </span>
                  Safety & Emergency
                </a>

                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="mx-1">
                    <i className="fa-solid fa-circle-question"></i>
                  </span>
                  FAQ
                </a>


                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="mx-1">
                    <i className="fa-solid fa-hand-holding-hand"></i>
                  </span>
                  Contact/Help Desk
                </a>

                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="mx-1">
                    <i className="fa-solid fa-download"></i>
                  </span>
                  Downloads
                </a>
                
              </div>
            )}
          </div>

          <button className="md:hidden text-2xl text-black-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>
        </div>

        <div  className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden px-4 pb-4 bg-white`}>
          <a href="#" className="block py-2">Home</a>
          <a href="#" className="block py-2">About PAGTIBAY 2026</a>
          <Link to="https://docs.google.com/forms/d/e/1FAIpQLSfttMz8x6Rd3_IPMiDfPMzMi9Zrywplf0XviMeplDZnU8VCSQ/viewform?usp=dialog" target="_blank" className="block py-2">Invitation</Link>
          <a href="#" className="block py-2">Program & CPD</a>
          <a href="#" className="block py-2">Delegates Advisory</a>
          <Link to="/exhibitors" target="_blank" className="block py-2">Sponsors/Exhibitors</Link>
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
                  <i className="fa-regular fa-calendar-days"></i>
                </span>
                November 9-13 2026
              </p>

              <p className="mt-4 text-md text-green-900">
                <span className="mx-1">
                  <i className="fa-regular fa-calendar-days"></i>
                </span>
                Convention Proper: November 10-12, 2026
              </p>

              <p className="mt-4 text-md text-green-900">
                <span className="mx-1">
                  <i className="fa-solid fa-location-pin"></i>
                </span>
                Tagaytag City Velodrome, Tagaytay City, Cavite
              </p>

              <p className="mt-4 text-md text-green-900">
                <span className="mx-1">
                  <i className="fa-solid fa-user-group"></i>
                </span>
                HOST: PIEP Cavite Chapter
              </p>

              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link to="/registration" target="_blank" className="bg-green-900 px-5 py-3 rounded-lg hover:bg-green-800">
                  Register Now
                </Link>

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
                  <div className="text-4xl font-bold text-green-900">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <p>DAYS</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-green-900">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <p>HRS</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-green-900">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <p>MINS</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-green-900">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <p>SECS</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto bg-green-900 px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
        <div className="bg-green-900 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* VIDEO */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/UEmJm1tnRKs"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          {/* TEXT */}
          <div className="text-white flex flex-col justify-between">
            <div className="space-y-4">

              <p className="text-yellow-400 font-semibold tracking-wide">
                LIVE STREAMING
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Watch PAGTIBAY 2026 live on our YouTube Channel
              </h2>

              <p className="text-base sm:text-lg text-white/90">
                Tune in to the official livestream for the latest session, announcements, and updates
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a className="bg-yellow-500 text-white text-center px-6 py-3 rounded-lg font-semibold w-full sm:w-auto">
                <i className="fa-brands fa-youtube mr-2"></i>
                Watch on YouTube
              </a>

              <button className="border border-white px-6 py-3 rounded-lg w-full sm:w-auto">
                <i className="fa-regular fa-calendar-days mr-2"></i>
                View Livestream Schedule
              </button>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
            AT A GLANCE
          </h2>

          {/* Timeline wrapper */}
          <div className="relative">

            {/* horizontal line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-gray-300 hidden md:block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

              {/* ITEM */}
              <div className="flex flex-col items-center text-center relative">

                {/* node */}
                <div className="w-16 h-16 rounded-full border-2 border-green-700 bg-white flex items-center justify-center z-10">
                  <span className="text-green-700 text-xl">
                    <i className="fa-solid fa-plane-up"></i>
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-green-900">DAY 0</h3>
                <p className="text-sm text-gray-600">Nov 9, 2026</p>
                <p className="text-sm">Arrival / Hotel Check-in</p>
              </div>

              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full border-2 border-green-700 bg-white flex items-center justify-center z-10">
                  <span className="text-green-700 text-xl">
                    <i className="fa-solid fa-id-card-clip"></i>
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-green-900">DAY 1</h3>
                <p className="text-sm text-gray-600">Nov 10, 2026</p>
                <p className="text-sm">Registration & Opening</p>
              </div>

              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full border-2 border-green-700 bg-white flex items-center justify-center z-10">
                  <span className="text-green-700 text-xl">
                    <i className="fa-solid fa-people-group"></i>
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-green-900">DAY 2</h3>
                <p className="text-sm text-gray-600">Nov 11, 2026</p>
                <p className="text-sm">Technical Sessions</p>
              </div>

              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full border-2 border-green-700 bg-white flex items-center justify-center z-10">
                  <span className="text-green-700 text-xl">
                    <i className="fa-solid fa-chalkboard"></i>
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-green-900">DAY 3</h3>
                <p className="text-sm text-gray-600">Nov 12, 2026</p>
                <p className="text-sm">Closing Ceremony</p>
              </div>

              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full border-2 border-green-700 bg-white flex items-center justify-center z-10">
                  <span className="text-green-700 text-xl">
                    <i className="fa-solid fa-suitcase-rolling"></i>
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-green-900">DAY 4</h3>
                <p className="text-sm text-gray-600">Nov 13, 2026</p>
                <p className="text-sm">Optional Tours</p>
              </div>

            </div>
          </div>
        </div>
      </section>


      <section className="py-16 shadow bg-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Heading (optional) */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Why Attend PAGTIBAY 2026?
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Item 1 */}
            <div className="text-center space-y-3">
              <div className="flex justify-center text-green-700 text-4xl">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                CPD Learning
              </h3>
              <p className="text-gray-600 text-sm">
                Earn CPD units through high-quality sessions and accredited learning activities.
              </p>
            </div>

            {/* Item 2 */}
            <div className="text-center space-y-3">
              <div className="flex justify-center text-green-700 text-4xl">
                <i className="fa-solid fa-comments"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                National Dialogue
              </h3>
              <p className="text-gray-600 text-sm">
                Engage in meaningful discussions on spatial planning for sustainable development.
              </p>
            </div>

            {/* Item 3 */}
            <div className="text-center space-y-3">
              <div className="flex justify-center text-green-700 text-4xl">
                <i className="fa-solid fa-gear"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                Technical Exchange
              </h3>
              <p className="text-gray-600 text-sm">
                Share knowledge and best practices with experts, practitioners, and fellow planners.
              </p>
            </div>

            {/* Item 4 */}
            <div className="text-center space-y-3">
              <div className="flex justify-center text-green-700 text-4xl">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                Professional Networking
              </h3>
              <p className="text-gray-600 text-sm">
                Build connections and partnerships that strengthen the planning profession.
              </p>
            </div>

          </div>
        </div>
      </section>




      <section className="mx-auto px-6 py-12 font-sans bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advisories.length > 0 ? (
            advisories.map((item) => (
              <div 
                key={item.id} 
                className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="bg-[#052d14] text-white rounded-lg px-3 py-2.5 flex flex-col items-center justify-center min-w-[64px] shadow-sm">
                  <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                    {item.month}
                  </span>
                  <span className="text-2xl font-extrabold leading-none my-1">
                    {item.day}
                  </span>
                  <span className="text-[10px] font-medium tracking-wide text-gray-300">
                    {item.year}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between h-full min-h-[90px]">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3">
                    <a 
                      href={`#advisory-${item.id}`} 
                      className="text-xs font-bold text-[#0b3d1d] hover:underline inline-flex items-center gap-1"
                    >
                      Read more <span className="text-[10px]">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-gray-200 rounded-xl bg-gray-50">
              
              {/* Icon */}
              <div className="text-5xl mb-3 opacity-70">
                <i className="fa-solid fa-bullhorn"></i>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-700">
                No Advisories Yet
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-2 max-w-md">
                There are currently no latest advisories posted. Please check back later for updates and announcements.
              </p>

              
            </div>
          )}
        </div>
      </section>



      <footer className="bg-[#0b3d1d] text-gray-200 font-sans">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-start text-sm">
          
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-center p-1">
              <img src={icon} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-semibold leading-tight text-white">
                Philippine Institute of Environmental Planners
              </h3>
              <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                Advancing sustainable and resilient communities through professional planning excellence.
              </p>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-emerald-800 pt-6 md:pt-0 md:pl-8">
            <h4 className="text-yellow-500 font-bold tracking-wider text-xs mb-3 uppercase">
              Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">✉</span>
                <a href="mailto:piepnatcon2026@piep.org" className="hover:underline">
                  piepnatcon2026@piep.org
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">🌐</span>
                <a href="https://www.piep.org" target="_blank" rel="noreferrer" className="hover:underline">
                  www.piep.org
                </a>
              </div>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-emerald-800 pt-6 md:pt-0 md:pl-8">
            <h4 className="text-yellow-500 font-bold tracking-wider text-xs mb-3 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li><a href="#home" className="hover:underline flex items-center gap-1"><span>•</span> Home</a></li>
              <li><a href="#about" className="hover:underline flex items-center gap-1"><span>•</span> About PAGTIBAY 2026</a></li>
              <li><a href="#program" className="hover:underline flex items-center gap-1"><span>•</span> Program & CPD</a></li>
              <li><Link to="/registration" target="_blank" className="hover:underline flex items-center gap-1"><span>•</span> Registration</Link></li>
              <li><Link to="/exhibitors" target="_blank" className="hover:underline flex items-center gap-1"><span>•</span> Sponsors/Exhibitors</Link></li>
            </ul>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-emerald-800 pt-6 md:pt-0 md:pl-8 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-yellow-500 font-bold tracking-wider text-xs mb-3 uppercase">
              Host
            </h4>
            <div className="flex flex-col items-center gap-2" onClick={() => window.location.href = "https://www.facebook.com/PIEPCaviteChapter/"}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xs bg-white text-black">
                <img src={caviteIcon} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs font-medium text-white tracking-wide">
                PIEP Cavite Chapter
              </p>
            </div>
          </div>

        </div>

        <div className="bg-[#05210f] py-4 border-t border-emerald-950">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-gray-400">
            <div className="flex gap-4">
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
              <span className="text-emerald-800">|</span>
              <a href="#terms" className="hover:underline">Terms of Use</a>
              <span className="text-emerald-800">|</span>
            </div>
            <p>© 2026 Philippine Institute of Environmental Planners</p>
          </div>
        </div>
      </footer>

      {/* <DevModal/> */}
    </>
  )
}

export default App