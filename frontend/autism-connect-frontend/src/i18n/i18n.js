import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav_home: "Home",
      nav_activities: "Activities",
      nav_consultants: "Consultants",
      nav_donate: "Donate",
      nav_contact: "Contact",
      nav_login: "Login",
      nav_register: "Register",
      hero_title: "Empowering Every Child on the Spectrum",
      hero_subtitle:
        "Activities, progress tracking, and expert consultants for parents of autistic children — all in one place.",
      hero_cta: "Get Started Free",
      why_choose_us: "Why Choose Us",
      testimonials: "What Parents Say",
      faq: "Frequently Asked Questions",
    },
  },
  hi: {
    translation: {
      nav_home: "होम",
      nav_activities: "गतिविधियाँ",
      nav_consultants: "परामर्शदाता",
      nav_donate: "दान करें",
      nav_contact: "संपर्क करें",
      nav_login: "लॉगिन",
      nav_register: "पंजीकरण",
      hero_title: "स्पेक्ट्रम पर हर बच्चे को सशक्त बनाना",
      hero_subtitle:
        "ऑटिज्म से जूझ रहे बच्चों के माता-पिता के लिए गतिविधियाँ, प्रगति ट्रैकिंग और विशेषज्ञ परामर्शदाता — सब एक ही जगह।",
      hero_cta: "मुफ़्त शुरू करें",
      why_choose_us: "हमें क्यों चुनें",
      testimonials: "माता-पिता क्या कहते हैं",
      faq: "अक्सर पूछे जाने वाले प्रश्न",
    },
  },
  mr: {
    translation: {
      nav_home: "मुख्यपृष्ठ",
      nav_activities: "उपक्रम",
      nav_consultants: "सल्लागार",
      nav_donate: "देणगी द्या",
      nav_contact: "संपर्क",
      nav_login: "लॉगिन",
      nav_register: "नोंदणी",
      hero_title: "स्पेक्ट्रमवरील प्रत्येक मुलाला सक्षम करणे",
      hero_subtitle:
        "ऑटिझम असलेल्या मुलांच्या पालकांसाठी उपक्रम, प्रगती ट्रॅकिंग आणि तज्ञ सल्लागार — सर्व एकाच ठिकाणी.",
      hero_cta: "मोफत सुरू करा",
      why_choose_us: "आम्हाला का निवडावे",
      testimonials: "पालक काय म्हणतात",
      faq: "वारंवार विचारले जाणारे प्रश्न",
    },
  },
  kn: {
    translation: {
      nav_home: "ಮುಖಪುಟ",
      nav_activities: "ಚಟುವಟಿಕೆಗಳು",
      nav_consultants: "ಸಲಹೆಗಾರರು",
      nav_donate: "ದೇಣಿಗೆ ನೀಡಿ",
      nav_contact: "ಸಂಪರ್ಕಿಸಿ",
      nav_login: "ಲಾಗಿನ್",
      nav_register: "ನೋಂದಣಿ",
      hero_title: "ಸ್ಪೆಕ್ಟ್ರಮ್‌ನಲ್ಲಿರುವ ಪ್ರತಿ ಮಗುವನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು",
      hero_subtitle:
        "ಆಟಿಸಂ ಇರುವ ಮಕ್ಕಳ ಪೋಷಕರಿಗಾಗಿ ಚಟುವಟಿಕೆಗಳು, ಪ್ರಗತಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ತಜ್ಞ ಸಲಹೆಗಾರರು — ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.",
      hero_cta: "ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ",
      why_choose_us: "ನಮ್ಮನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು",
      testimonials: "ಪೋಷಕರು ಏನು ಹೇಳುತ್ತಾರೆ",
      faq: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
