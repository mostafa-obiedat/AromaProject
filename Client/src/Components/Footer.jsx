import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#940066] to-[#671F79] text-white py-16 rtl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-32 -top-32 w-64 h-64 rounded-full bg-white opacity-5"></div>
      <div className="absolute -left-32 -bottom-32 w-64 h-64 rounded-full bg-white opacity-5"></div>
      
      <div className="container mx-auto px-6">
        {/* Logo and mission */}
       <div className="flex flex-col items-center mb-12 text-center">
  <h2 className="text-3xl font-bold mb-4">موقع خيري لدعم الطلاب الجامعيين  🎓</h2>
  <p className="max-w-2xl text-lg opacity-90 leading-relaxed">
    نؤمن بأن التعليم هو حق لكل طالب، ونحن نسعى لدعم الطلاب الجامعيين الغير مقتدرين من خلال توفير فرص تعليمية متساوية لهم، لنساعدهم في بناء مستقبل أفضل.
  </p>
</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
          {/* روابط سريعة */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-xl mb-6 relative inline-block">
              <span className="relative z-10">روابط سريعة</span>
              <span className="absolute bottom-0 right-0 w-full h-1 bg-white opacity-30"></span>
            </h3>
            <ul className="space-y-3 text-center sm:text-right">
              <li><Link to="/" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> الرئيسية
              </Link></li>
              <li><Link to="/about" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> من نحن
              </Link></li>
              <li><Link to="/donate" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> تبرع الآن
              </Link></li>
              <li><Link to="/success-story" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> قصص النجاح
              </Link></li>
              <li><Link to="/contact" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> تواصل معنا
              </Link></li>
              <li><Link to="/faq" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> الأسئلة الشائعة
              </Link></li>
            </ul>
          </div>
          
          {/* معلومات الحساب */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-xl mb-6 relative inline-block">
              <span className="relative z-10">حسابك</span>
              <span className="absolute bottom-0 right-0 w-full h-1 bg-white opacity-30"></span>
            </h3>
            <ul className="space-y-3 text-center sm:text-right">
              <li><Link to="/signin" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> تسجيل الدخول
              </Link></li>
              <li><Link to="/signup" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> إنشاء حساب
              </Link></li>
              <li><Link to="/profile" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> الملف الشخصي
              </Link></li>
              <li><Link to="/payment" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> طرق الدفع
              </Link></li>
              <li><Link to="/history" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> سجل التبرعات
              </Link></li>
              <li><Link to="/settings" className="hover:text-pink-200 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                <span>→</span> إعدادات الحساب
              </Link></li>
            </ul>
          </div>
          
          {/* معلومات الاتصال */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-xl mb-6 relative inline-block">
              <span className="relative z-10">تواصل معنا</span>
              <span className="absolute bottom-0 right-0 w-full h-1 bg-white opacity-30"></span>
            </h3>
            <ul className="space-y-4 text-center sm:text-right">
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-pink-200" />
                <span>عمان، الأردن - شارع الجامعة، مبنى رقم 45</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-pink-200" />
                <span dir="ltr">+962 6 123 4567</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-pink-200" />
                <span>info@jordanwomenscholarship.org</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <FontAwesomeIcon icon={faClock} className="text-pink-200" />
                <span>الأحد - الخميس: 9:00 ص - 4:00 م</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <FontAwesomeIcon icon={faHandHoldingHeart} className="text-pink-200" />
                <span>رقم التسجيل: 12345/JO</span>
              </li>
            </ul>
          </div>
          
          {/* وسائل التواصل والنشرة */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-xl mb-6 relative inline-block">
              <span className="relative z-10">تابعنا</span>
              <span className="absolute bottom-0 right-0 w-full h-1 bg-white opacity-30"></span>
            </h3>
            <p className="mb-4 text-center sm:text-right">تابعونا على وسائل التواصل الاجتماعي للبقاء على اطلاع بآخر أخبارنا وفعالياتنا</p>
            
            <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-purple bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:text-pink-200">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-purple bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:text-pink-200">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-purple bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:text-pink-200">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-purple bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:text-pink-200">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-purple bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:text-pink-200">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-purple bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:text-pink-200">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* حقوق النشر والشهادات */}
      <div className="mt-12 pt-6 border-t border-white border-opacity-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-right mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} جمعية المنح الدراسية للنساء الأردنيات - جميع الحقوق محفوظة
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="bg-purple bg-opacity-10 px-3 py-1 rounded-full text-sm">مؤسسة خيرية مسجلة</span>
              <span className="bg-purple bg-opacity-10 px-3 py-1 rounded-full text-sm">متوافقة مع معايير الشفافية</span>
              <span className="bg-purple bg-opacity-10 px-3 py-1 rounded-full text-sm">دعم فني متاح 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;