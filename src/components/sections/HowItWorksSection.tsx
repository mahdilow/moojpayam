import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Send,
  BarChart as ChartBar,
  Target,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LeafletMouseEvent } from "leaflet";
import toast from "react-hot-toast";

const MapEvents = ({
  onMapClick,
}: {
  onMapClick: (e: LeafletMouseEvent) => void;
}) => {
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

const HowItWorksSection: React.FC = () => {
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

  const handleMapClick = (e: LeafletMouseEvent) => {
    setSelectedArea({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      radius: 1000, // 1km radius
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSubmit = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmitClick = () => {
    if (!selectedArea) {
      toast.error("لطفاً ابتدا یک منطقه را انتخاب کنید.");
      return;
    }
    if (!message) {
      toast.error("لطفاً پیام خود را وارد کنید.");
      return;
    }

    handleSubmit();
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-100 text-primary-500 px-4 py-2 rounded-full mb-6"
          >
            <span className="font-semibold">نحوه کارکرد</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            چگونه{" "}
            <span className="text-primary-500 relative">
              کار می‌کند؟
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            در سه قدم ساده، پیامک‌های خود را به صورت هدفمند ارسال کنید
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <Target className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">انتخاب منطقه هدف</h3>
            <p className="text-gray-600">
              منطقه مورد نظر خود را روی نقشه انتخاب کنید
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <Send className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">ارسال پیام</h3>
            <p className="text-gray-600">
              پیام خود را تنظیم کرده و به مخاطبان منطقه ارسال کنید
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <ChartBar className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">مشاهده نتایج</h3>
            <p className="text-gray-600">
              گزارش‌های دقیق از وضعیت تحویل و اثربخشی پیام‌ها را دریافت کنید
            </p>
          </motion.div>
        </div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 relative z-10">
            <div className="bg-blue-600 text-white rounded-lg p-4 mb-6 flex items-center">
              <MapPin className="ml-3" />
              <div>
                <h3 className="font-bold">دمو ارسال پیامک منطقه‌ای</h3>
                <p className="text-sm text-blue-100">
                  منطقه مورد نظر را انتخاب کنید و پیام خود را تست کنید
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
              onClick={handleSubmitClick}
              className="w-full bg-blue-600 text-white rounded-lg py-3 font-bold hover:bg-blue-700 transition-colors"
            >
              مشاهده تعرفه‌ها و شروع کار
            </button>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <div className="mt-20 relative rounded-3xl overflow-hidden">
          <img
            src="/assets/birds-carrying-letters-over-sea.png"
            alt="نقشه شهری"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 to-transparent flex items-center">
            <div className="max-w-2xl p-12">
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-6"
              >
                افزایش ۳۰۰٪ بازدید با پیامک منطقه‌ای
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/90 text-lg mb-8 leading-relaxed"
              >
                با ارسال پیامک به مشتریان در محدوده جغرافیایی کسب و کار خود،
                میزان بازدید و فروش خود را به طور چشمگیری افزایش دهید. آمارها
                نشان می‌دهد که پیامک‌های منطقه‌ای تا ۳۰۰٪ نرخ تبدیل بالاتری نسبت
                به تبلیغات معمولی دارند.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex-1">
                  <div className="text-2xl font-bold text-white mb-1">۸۵٪</div>
                  <div className="text-white/80">نرخ مشاهده پیام</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex-1">
                  <div className="text-2xl font-bold text-white mb-1">
                    ۱۲ دقیقه
                  </div>
                  <div className="text-white/80">میانگین زمان پاسخ</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex-1">
                  <div className="text-2xl font-bold text-white mb-1">۳۰۰٪</div>
                  <div className="text-white/80">افزایش نرخ تبدیل</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;