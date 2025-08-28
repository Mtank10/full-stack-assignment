import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { features } from './data';
function App() {
  const [active, setActive] = useState(0);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!showcaseRef.current) return;
      const rect = showcaseRef.current.getBoundingClientRect();
      if (rect.top <= 0 && Math.abs(React.top) < rect.height) {
        const progress = Math.min(features.length - 1,
          Math.floor((Math.abs(rect.top) / rect.height) * features.length)
        );
        setActive(progress)
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])
  const prev = () => setActive((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  const next = () => setActive((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  return (
    <section ref={showcaseRef} className="relative bg-white py-10 sticky top-0 sm:py-20 min-h-screen flex items-center">
      <div className="container mx-auto flex flex-col md:p-2 flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4 ">
          <h3 className="text-blue-600 font-semibold">{features[active].title}</h3>
          <h2 className="text-xl font-bold">{features[active].heading}</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {features[active].description.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pt-4">
            <button onClick={prev} className="p-2 border rounded-full hover:bg-gray-100">
              <ChevronLeft />
            </button>
            <button onClick={next} className="p-2 border rounded-full hover:bg-gray-100">
              <ChevronRight />
            </button>
          </div>
        </div>


        <div className="flex-1 flex justify-center">
          <img
            src={features[active].image}
            className="w-64 md:w-80 lg:w-96"
          />
        </div>


        <div className="flex-1 space-y-4">
          <h3 className="font-bold">Feature Showcase</h3>
          {features.map((f, idx) => (
            <div
              key={f.id}
              onClick={() => setActive(idx)}
              className={`cursor-pointer pl-2 border-l-4 transition-all duration-200 ${active === idx ? "border-blue-500 font-bold text-gray-800" : "border-transparent text-gray-500"
                }`}
            >
              {f.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default App
