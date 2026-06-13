import { useState, useEffect } from "react";

export default function DevModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // show only once per session
    const alreadySeen = sessionStorage.getItem("devModalSeen");

    if (!alreadySeen) {
      sessionStorage.setItem("devModalSeen", "true");
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative text-center">
        
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-green-900 mb-3">
          Website Under Development 
        </h2>

        <span>
            <i class="fa-solid fa-screwdriver-wrench text-orange-300 text-4xl"></i>
        </span>
        <p className="text-gray-600">
          This site is currently being built. Some features may not be fully available yet.
        </p>

        <button
          onClick={() => setOpen(false)}
          className="mt-5 bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800"
        >
          Got it
        </button>
      </div>
    </div>
  );
}