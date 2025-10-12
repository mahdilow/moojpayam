import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader,
  Shield,
  Clock,
  RefreshCw,
  Phone,
  Send,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendContactEmail, sendOTP, verifyOTP } from "../api/emailService";
import toast from "react-hot-toast";
import SEOHead from "../components/SEOHead";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("نام الزامی است"),
  phone: Yup.string()
    .matches(
      /^(\+98|0)?9\d{9}$/,
      "شماره موبایل نامعتبر است (فرمت صحیح: 09XXXXXXXXX)"
    )
    .required("شماره موبایل الزامی است"),
  email: Yup.string().email("ایمیل نامعتبر است"),
  subject: Yup.string().required("موضوع الزامی است"),
  message: Yup.string()
    .min(10, "پیام باید حداقل 10 کاراکتر باشد")
    .required("پیام الزامی است"),
});

const OTPSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{4}$/, "کد تایید باید 4 رقم باشد")
    .required("کد تایید الزامی است"),
});

interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface OTPFormValues {
  otp: string;
}

type FormStep = "contact" | "otp" | "success";
type FormStatus = "idle" | "submitting" | "success" | "error";

const ContactUsPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [contactData, setContactData] = useState<ContactFormValues | null>(
    null
  );
  const [otpExpiresAt, setOtpExpiresAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!otpExpiresAt) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((otpExpiresAt - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        setCanResend(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [otpExpiresAt]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleContactSubmit = async (values: ContactFormValues) => {
    try {
      setFormStatus("submitting");
      setContactData(values);

      const otpResult = await sendOTP(values.phone);

      if (otpResult.success) {
        setCurrentStep("otp");
        setFormStatus("idle");
        setOtpExpiresAt(Date.now() + (otpResult.expiresIn || 300) * 1000);
        setCanResend(false);
        toast.success(otpResult.message);
      } else {
        throw new Error(otpResult.message);
      }
    } catch (error) {
      setFormStatus("error");
      const errorMsg =
        error instanceof Error ? error.message : "خطا در ارسال کد تایید";
      setStatusMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleOTPSubmit = async (values: OTPFormValues) => {
    if (!contactData) return;

    try {
      setFormStatus("submitting");

      const verifyResult = await verifyOTP(contactData.phone, values.otp);

      if (verifyResult.verified) {
        const emailResult = await sendContactEmail({
          ...contactData,
          otpVerified: true,
        });

        if (emailResult.success) {
          setCurrentStep("success");
          setFormStatus("success");
          setStatusMessage(emailResult.message);
          toast.success(emailResult.message);
        } else {
          throw new Error(emailResult.message);
        }
      } else {
        throw new Error(verifyResult.message);
      }
    } catch (error) {
      setFormStatus("error");
      const errorMsg =
        error instanceof Error ? error.message : "خطا در تایید کد";
      setStatusMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleResendOTP = async () => {
    if (!contactData || !canResend) return;

    try {
      setFormStatus("submitting");
      const otpResult = await sendOTP(contactData.phone);

      if (otpResult.success) {
        setFormStatus("idle");
        setOtpExpiresAt(Date.now() + (otpResult.expiresIn || 300) * 1000);
        setCanResend(false);
        toast.success("کد تایید مجدداً ارسال شد");
      } else {
        throw new Error(otpResult.message);
      }
    } catch (error) {
      setFormStatus("error");
      const errorMsg =
        error instanceof Error ? error.message : "خطا در ارسال مجدد کد";
      toast.error(errorMsg);
    }
  };

  const resetForm = () => {
    setCurrentStep("contact");
    setFormStatus("idle");
    setStatusMessage("");
    setContactData(null);
    setOtpExpiresAt(null);
    setTimeLeft(0);
    setCanResend(false);
  };

  return (
    <>
      <SEOHead
        title="تماس با ما | موج پیام"
        description="با تیم پشتیبانی موج پیام در ارتباط باشید. پاسخگویی ۲۴ ساعته به سوالات و مشاوره رایگان در خصوص خدمات پیامکی."
        keywords="تماس با ما, پشتیبانی موج پیام, مشاوره پیامک, ارتباط با موج پیام"
        url="https://moojpayam.ir/contact-us"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            telephone: "+98-910-071-1835",
            contactType: "customer service",
            areaServed: "IR",
            availableLanguage: ["Persian"],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 pt-28 sm:pt-32 pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              تماس <span className="text-primary-500">با ما</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              سوالی دارید؟ تیم پشتیبانی ما آماده پاسخگویی و راهنمایی شما هستند
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-primary-500" />
                <span className="text-sm sm:text-base">پاسخگویی سریع</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Shield className="w-5 h-5 text-primary-500" />
                <span className="text-sm sm:text-base">امن و محرمانه</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MessageSquare className="w-5 h-5 text-primary-500" />
                <span className="text-sm sm:text-base">پشتیبانی ۲۴/۷</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      currentStep === "contact"
                        ? "bg-primary-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    1
                  </div>
                  <div className="w-16 h-1 bg-gray-300 rounded"></div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      currentStep === "otp"
                        ? "bg-primary-500 text-white"
                        : currentStep === "success"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <div className="w-16 h-1 bg-gray-300 rounded"></div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      currentStep === "success"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {currentStep === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <div className="bg-blue-50 rounded-full p-4 inline-flex mb-4">
                        <Send className="w-8 h-8 text-primary-500" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
                        فرم تماس با ما
                      </h2>
                      <p className="text-gray-600">
                        اطلاعات خود را وارد کنید تا با شما تماس بگیریم
                      </p>
                    </div>

                    <Formik
                      initialValues={{
                        name: "",
                        phone: "",
                        email: "",
                        subject: "",
                        message: "",
                      }}
                      validationSchema={ContactFormSchema}
                      onSubmit={handleContactSubmit}
                    >
                      {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                نام و نام خانوادگی *
                              </label>
                              <Field
                                type="text"
                                id="name"
                                name="name"
                                className={`w-full border ${
                                  touched.name && errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-colors`}
                                placeholder="نام خود را وارد کنید"
                              />
                              <ErrorMessage
                                name="name"
                                component="p"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                شماره موبایل *
                              </label>
                              <Field
                                type="tel"
                                id="phone"
                                name="phone"
                                maxLength={11}
                                className={`w-full border ${
                                  touched.phone && errors.phone
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-colors`}
                                placeholder="09123456789"
                                onInput={(
                                  e: React.FormEvent<HTMLInputElement>
                                ) => {
                                  const target = e.target as HTMLInputElement;
                                  target.value = target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 11);
                                }}
                              />
                              <ErrorMessage
                                name="phone"
                                component="p"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              ایمیل (اختیاری)
                            </label>
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              className={`w-full border ${
                                touched.email && errors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-colors`}
                              placeholder="example@email.com"
                            />
                            <ErrorMessage
                              name="email"
                              component="p"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              موضوع *
                            </label>
                            <Field
                              type="text"
                              id="subject"
                              name="subject"
                              className={`w-full border ${
                                touched.subject && errors.subject
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-colors`}
                              placeholder="موضوع پیام"
                            />
                            <ErrorMessage
                              name="subject"
                              component="p"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="message"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              پیام *
                            </label>
                            <Field
                              as="textarea"
                              id="message"
                              name="message"
                              rows={5}
                              className={`w-full border ${
                                touched.message && errors.message
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-colors resize-none`}
                              placeholder="پیام خود را بنویسید..."
                            />
                            <ErrorMessage
                              name="message"
                              component="p"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting || formStatus === "submitting"}
                            className={`btn btn-primary w-full py-3.5 flex items-center justify-center text-base font-bold ${
                              isSubmitting || formStatus === "submitting"
                                ? "opacity-70 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {isSubmitting || formStatus === "submitting" ? (
                              <>
                                <Loader className="animate-spin ml-2" size={20} />
                                در حال ارسال کد تایید...
                              </>
                            ) : (
                              <>
                                <Shield className="ml-2" size={20} />
                                ارسال پیام
                              </>
                            )}
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </motion.div>
                )}

                {currentStep === "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <div className="bg-blue-50 rounded-full p-4 inline-flex mb-4">
                        <MessageSquare className="w-8 h-8 text-primary-500" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
                        کد تایید را وارد کنید
                      </h3>
                      <p className="text-gray-600">
                        کد 4 رقمی ارسال شده به شماره{" "}
                        <span className="font-bold text-primary-600">
                          {contactData?.phone}
                        </span>{" "}
                        را وارد کنید
                      </p>
                    </div>

                    <Formik
                      initialValues={{ otp: "" }}
                      validationSchema={OTPSchema}
                      onSubmit={handleOTPSubmit}
                    >
                      {({
                        isSubmitting,
                        errors,
                        touched,
                        values,
                        setFieldValue,
                      }) => (
                        <Form className="space-y-6">
                          <div>
                            <Field
                              type="text"
                              name="otp"
                              maxLength={4}
                              className={`w-full border ${
                                touched.otp && errors.otp
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg p-4 text-center text-2xl font-bold tracking-widest focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-colors`}
                              placeholder="- - - -"
                              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                const target = e.target as HTMLInputElement;
                                const value = target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 4);
                                setFieldValue("otp", value);
                              }}
                            />
                            <ErrorMessage
                              name="otp"
                              component="p"
                              className="text-red-500 text-sm mt-1 text-center"
                            />
                          </div>

                          {timeLeft > 0 && (
                            <div className="text-center">
                              <div className="flex items-center justify-center text-gray-600">
                                <Clock size={16} className="ml-2" />
                                <span>
                                  زمان باقی‌مانده: {formatTime(timeLeft)}
                                </span>
                              </div>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={
                              isSubmitting ||
                              formStatus === "submitting" ||
                              values.otp.length !== 4
                            }
                            className={`btn btn-primary w-full py-3 flex items-center justify-center ${
                              isSubmitting ||
                              formStatus === "submitting" ||
                              values.otp.length !== 4
                                ? "opacity-70 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {isSubmitting || formStatus === "submitting" ? (
                              <>
                                <Loader className="animate-spin ml-2" size={20} />
                                در حال تایید...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="ml-2" size={20} />
                                تایید و ارسال پیام
                              </>
                            )}
                          </button>

                          <div className="text-center">
                            {canResend ? (
                              <button
                                type="button"
                                onClick={handleResendOTP}
                                disabled={formStatus === "submitting"}
                                className="text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center justify-center mx-auto"
                              >
                                <RefreshCw size={16} className="ml-1" />
                                ارسال مجدد کد تایید
                              </button>
                            ) : (
                              <p className="text-gray-500 text-sm">
                                کد تایید دریافت نکردید؟ پس از اتمام زمان می‌توانید
                                مجدداً درخواست کنید
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={resetForm}
                            className="w-full text-gray-600 hover:text-gray-800 font-medium text-sm"
                          >
                            بازگشت به فرم تماس
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </motion.div>
                )}

                {currentStep === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <CheckCircle
                      className="text-green-500 mb-4 mx-auto"
                      size={60}
                    />
                    <h3 className="text-2xl font-bold text-green-600 mb-4">
                      پیام شما با موفقیت ارسال شد!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      تیم پشتیبانی ما در اسرع وقت با شما تماس خواهند گرفت.
                    </p>
                    <button onClick={resetForm} className="btn btn-primary">
                      ارسال پیام جدید
                    </button>
                  </motion.div>
                )}

                {formStatus === "error" && currentStep !== "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4"
                  >
                    <div className="flex items-center">
                      <AlertCircle className="text-red-500 ml-2" size={20} />
                      <p className="text-red-700">{statusMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Phone className="ml-2" size={24} />
                  اطلاعات تماس
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start bg-white/10 rounded-lg p-4">
                    <Mail className="ml-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold mb-1">ایمیل</h4>
                      <a
                        href="mailto:contact@moojpayam.ir"
                        className="opacity-90 hover:opacity-100 transition-opacity"
                      >
                        contact@moojpayam.ir
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start bg-white/10 rounded-lg p-4">
                    <MapPin className="ml-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold mb-1">آدرس</h4>
                      <p className="opacity-90">کرج طالقانی جنوبی</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <h4 className="font-bold mb-4 text-xl text-gray-800 flex items-center">
                  <Clock className="ml-2 text-primary-500" size={24} />
                  ساعات کاری
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">
                      شنبه تا چهارشنبه:
                    </span>
                    <span className="text-gray-900 font-bold">
                      ۸ صبح تا ۶ عصر
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">
                      پنج‌شنبه:
                    </span>
                    <span className="text-gray-900 font-bold">
                      ۸ صبح تا ۱ بعدازظهر
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">جمعه:</span>
                    <span className="text-red-600 font-bold">تعطیل</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center text-green-700">
                    <MessageSquare className="ml-2 flex-shrink-0" size={20} />
                    <p className="font-medium">
                      پشتیبانی آنلاین: ۲۴ ساعته، ۷ روز هفته
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
