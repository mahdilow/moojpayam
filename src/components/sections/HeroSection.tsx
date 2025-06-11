import React, { useState } from "react";
import { MessageSquare, ArrowDownCircle, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Circle,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const MapEvents = ({ onMapClick }: { onMapClick: (e: any) => void }) => {
  useMapEvents({
    click: onMapClick,
  });
  return null;
};

const MapBoundsComponent = ({
  bounds,
}: {
  bounds: [[number, number], [number, number]];
}) => {
  const map = useMap();

  React.useEffect(() => {
    // Set max bounds to restrict panning
    map.setMaxBounds(bounds);

    // Handle when user tries to drag outside bounds
    map.on("drag", () => {
      map.panInsideBounds(bounds, { animate: false });
    });

    return () => {
      map.off("drag");
    };
  }, [map, bounds]);

  return null;
};

const HeroSection: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<{
    lat: number;
    lng: number;
    radius: number;
  } | null>(null);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  // Tehran position as initial center
  const tehranPosition: [number, number] = [35.6892, 51.389];
  // Iran bounds (southwest and northeast corners)
  const iranBounds: [[number, number], [number, number]] = [
    [25.0, 44.0], // Southwest corner
    [40.0, 63.3], // Northeast corner
  ];
  const navigate = useNavigate();

  const handleMapClick = (e: any) => {
    setSelectedArea({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      radius: 1000, // 1km radius
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSubmit = () => {
    navigate("/register");
  };

  return (
    <section
      id="home"
      className="pt-24 pb-20 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                ارسال هدفمند{" "}
                <span className="text-primary-500">پیامک تبلیغاتی</span> بر اساس
                منطقه
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                با انتخاب منطقه مورد نظر روی نقشه، پیام تبلیغاتی خود را به
                مشتریان بالقوه در آن محدوده ارسال کنید. هدفمندسازی تبلیغات و
                افزایش نرخ تبدیل با موج پیام.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                <a
                  href="#pricing"
                  className="btn btn-primary text-center px-8 py-3 text-lg"
                >
                  شروع کنید
                </a>
                <a
                  href="#features"
                  className="btn btn-outline text-center px-8 py-3 text-lg"
                >
                  امکانات بیشتر
                </a>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 relative z-10">
                <div className="bg-blue-600 text-white rounded-lg p-4 mb-6 flex items-center">
                  <MapPin className="ml-3" />
                  <div>
                    <h3 className="font-bold">ارسال پیامک منطقه‌ای</h3>
                    <p className="text-sm text-blue-100">
                      منطقه مورد نظر را انتخاب کنید
                    </p>
                  </div>
                </div>

                <div className="mb-6 h-64 rounded-lg overflow-hidden border border-gray-200 relative">
                  <MapContainer
                    center={tehranPosition}
                    zoom={10}
                    maxBounds={iranBounds}
                    minZoom={5}
                    maxZoom={18}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapEvents onMapClick={handleMapClick} />
                    <MapBoundsComponent bounds={iranBounds} />
                    {selectedArea && (
                      <Circle
                        center={[selectedArea.lat, selectedArea.lng]}
                        radius={selectedArea.radius}
                        pathOptions={{ color: "blue", fillColor: "blue" }}
                      >
                        <Popup>منطقه انتخاب شده برای ارسال پیامک</Popup>
                      </Circle>
                    )}
                  </MapContainer>

                  <AnimatePresence>
                    {showNotification && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                      >
                        منطقه مورد نظر به لیست اضافه شد
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    متن پیام
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="متن پیام خود را وارد کنید..."
                  ></textarea>
                </div>

                <div className="flex justify-between mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      زمان ارسال
                    </label>
                    <select className="border border-gray-300 rounded-lg p-2">
                      <option>هم اکنون</option>
                      <option>زمانبندی</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      نوع پیام
                    </label>
                    <select className="border border-gray-300 rounded-lg p-2">
                      <option>تبلیغاتی</option>
                      <option>خدماتی</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white rounded-lg py-3 font-bold hover:bg-blue-700 transition-colors"
                  disabled={!selectedArea || !message}
                >
                  ارسال پیام به منطقه انتخاب شده
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-10 w-40 h-40 bg-secondary-400 rounded-full opacity-20 blur-3xl"></div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#features"
            className="inline-flex items-center text-primary-500 hover:text-primary-600"
          >
            <span className="ml-2">مشاهده امکانات</span>
            <ArrowDownCircle className="animate-bounce" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
