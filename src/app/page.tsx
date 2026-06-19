'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  Heading,
  SimpleGrid,
  Grid,
  GridItem,
  VStack,
  HStack,
  Input,
  Icon,
  Field,
  createListCollection,
  Portal,
  Select,
  DownloadTrigger,
} from '@chakra-ui/react';
import { FiCalendar, FiMapPin, FiAward, FiSun, FiMoon, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { toaster } from "@/components/ui/toaster";

// ⚠️ ඔබ ලබාගත් Google Apps Script Web App URL එක මෙතැනට ඇතුළත් කරන්න
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzO2QOjfBfi3-HfLgCP9kPT-DDrDH-oUXnkgF64scCdJsPyyIuvze3E2exiWhnOEeHV8Q/exec";

// Multi-language translation dictionaries
const translations = {
  en: {
    navHome: "Home",
    navGuidelines: "Guidelines",
    navSchedule: "Schedule",
    navRegister: "Register",
    joinNow: "JOIN NOW",
    virtualHack: "2026 VIRTUAL HACKATHON",
    organizedBy: "ORGANIZED BY IT DEPARTMENT — ESOFT METRO COLLEGE MONARAGALA",
    heroTitle1: "Design Tomorrow:",
    heroTitle2: "Canvas of Flows",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    seconds: "SECONDS",
    regNow: "REGISTER NOW",
    viewGuide: "DOWNLOAD HANDBOOK (EN/SI/TA)",
    loading: "LOADING HANDBOOK...",
    eventOverview: "Event Overview",
    bento1Title: "Schedule & Logistics",
    bento1Desc: "Presented by ESOFT Monaragala IT Department. A 48-hour virtual breakdown of front-end UI creativity synced directly into functional state cycles.",
    bento2Title: "Campus Host",
    bento2Desc: "ESOFT Metro College Monaragala Branch — Smart Virtual Tech Suite Access.",
    bento3Label: "GRAND PRIZE",
    bento3Desc: "Distributed among Top Innovators and Category Winners.",
    bento4Num1: "500+", bento4Label1: "DESIGNERS",
    bento4Num2: "24h", bento4Label2: "MENTOR SUPPORT",
    bento4Num3: "12", bento4Label3: "INDUSTRY JUDGES",
    bento4Num4: "VIRTUAL", bento4Label4: "GLOBAL ACCESS",
    bento5Label: "// CORE TRACKS",
    bento5Title: "UI Evolution &\nSystem Flows",
    challengeLabel: "THE CHALLENGE",
    challengeTitle: "Where Aesthetics Meets Logic",
    challengeDesc: "HackFlow asks you to bridge the gap between static canvas beauty and functional flow architecture. Using Canva's library, you'll build responsive UI interfaces that execute complex data states mapped on Google Flow.",
    timeline1Date: "OCTOBER 15",
    timeline1Title: "Submission Opens",
    timeline2Date: "OCTOBER 24",
    timeline2Title: "Flow Workshop",
    formTitle: "Secure Your Spot",
    formDesc: "Registered data will route directly to ESOFT Monaragala IT Academic Desk.",
    labelName: "FULL NAME",
    labelEmail: "EMAIL ADDRESS",
    labelInstitute: "UNIVERSITY / INSTITUTE / SCHOOL",
    labelWhatsapp: "WHATSAPP NUMBER",
    labelExp: "EXPERIENCE LEVEL",
    btnSubmit: "SUBMIT REGISTRATION",
    btnSubmitting: "SUBMITTING...",
    toastTitle: "Registration Submitted!",
    toastDesc: "Thank you {name}, your spot for HackFlow 2026 has been secured successfully.",
    selectInstPlaceholder: "Select Your Institute"
  },
  si: {
    navHome: "මුල් පිටුව",
    navGuidelines: "නියමාවලිය",
    navSchedule: "කාලසටහන",
    navRegister: "ලියාපදිංචිය",
    joinNow: "දැන්ම එකතු වන්න",
    virtualHack: "2026 සබැඳි හැකතෝන්",
    organizedBy: "තොරතුරු තාක්ෂණ දෙපාර්තමේන්තුව — එසොෆ්ට් මෙට්‍රෝ කොලේජ් මොනරාගල මඟින් සංවිධානය කරයි",
    heroTitle1: "හෙට දවස සැලසුම් කරන්න:",
    heroTitle2: "කැන්වස් ඔෆ් ෆ්ලෝස්",
    days: "දින",
    hours: "පැය",
    minutes: "විනාඩි",
    seconds: "තත්පර",
    regNow: "දැන්ම ලියාපදිංචි වන්න",
    viewGuide: "විස්තර පොත බාගත කරන්න (EN/SI/TA)",
    loading: "බාගත වෙමින් පවතී...",
    eventOverview: "තරඟාවලි දළ විශ්ලේෂණය",
    bento1Title: "කාලසටහන සහ සංවිධාන කටයුතු",
    bento1Desc: "මොනරාගල ESOFT IT දෙපාර්තමේන්තුව ඉදිරිපත් කරන පැය 48ක අඛණ්ඩ UI නිර්මාණශීලී තාක්ෂණික එකතුවකි.",
    bento2Title: "කැම්පස් සත්කාරකත්වය",
    bento2Desc: "එසොෆ්ට් මෙට්‍රෝ කොලේජ් මොනරාගල ශාඛාව — ස්මාර්ට් තාක්ෂණික පද්ධති ප්‍රවේශය.",
    bento3Label: "ප්‍රධාන මුදල් ත්‍යාගය",
    bento3Desc: "විශිෂ්ඨතම නවෝත්පාදකයින් සහ කාණ්ඩ ජයග්‍රාහකයින් අතර බෙදා හැරේ.",
    bento4Num1: "500+", bento4Label1: "නිර්මාණකරුවන්",
    bento4Num2: "24h", bento4Label2: "උපදේශක සහාය",
    bento4Num3: "12", bento4Label3: "කර්මාන්ත විනිශ්චයකරුවන්",
    bento4Num4: "සබැඳි", bento4Label4: "ගෝලීය ප්‍රවේශය",
    bento5Label: "// ප්‍රධාන අංශ",
    bento5Title: "UI පරිණාමය සහ\nපද්ධති ගලායාම",
    challengeLabel: "තාක්ෂණික අභියෝගය",
    challengeTitle: "කලාව සහ තර්කනය හමුවන තැන",
    challengeDesc: "Canva මෙවලම් භාවිතයෙන් උසස් තත්වයේ දෘශ්‍ය අතුරුමුහුණත් (UI) නිර්මාණය කර, ඒවා Google Flow තාක්ෂණය හරහා සජීවී දත්ත චක්‍රයන් සමඟ සාර්ථකව සම්බන්ධ කිරීම මෙහි ප්‍රධාන අභියෝගයයි.",
    timeline1Date: "ඔක්තෝබර් 15",
    timeline1Title: "නිර්මාණ භාරදීම ඇරඹේ",
    timeline2Date: "ඔක්තෝබර් 24",
    timeline2Title: "සජීවී තාක්ෂණික වැඩමුළුව",
    formTitle: "ඔබේ ස්ථානය වෙන්කරවා ගන්න",
    formDesc: "ලියාපදිංචි වන දත්ත සෘජුවම ESOFT මොනරාගල IT අධ්‍යයන අංශය වෙත යොමු කෙරේ.",
    labelName: "සම්පූර්ණ නම",
    labelEmail: "විද්‍යුත් තැපෑල",
    labelInstitute: "විශ්වවිද්‍යාලය / ආයතනය / පාසල",
    labelWhatsapp: "වට්ස්ඇප් අංකය",
    labelExp: "පළපුරුදු මට්ටම",
    btnSubmit: "ලියාපදිංචිය තහවුරු කරන්න",
    btnSubmitting: "ලියාපදිංචි වෙමින් පවතී...",
    toastTitle: "ලියාපදිංචිය සාර්ථකයි!",
    toastDesc: "ස්තූතියි {name}, HackFlow 2026 සඳහා ඔබේ අවස්ථාව සාර්ථකව වෙන් කර ගන්නා ලදී.",
    selectInstPlaceholder: "ඔබේ ආයතනය තෝරන්න"
  },
  ta: {
    navHome: "முகப்பு",
    navGuidelines: "வழிகாட்டுதல்கள்",
    navSchedule: "அட்டவணை",
    navRegister: "பதிவு",
    joinNow: "இப்போது இணையுங்கள்",
    virtualHack: "2026 மெய்நிகர் ஹேக்கத்தான்",
    organizedBy: "தகவல் தொழில்நுட்பத் துறை — ஈசாப்ட் மெட்ரோ கல்லூரி மொனராகலை ஏற்பாடு செய்துள்ளது",
    heroTitle1: "நாளையை வடிவமையுங்கள்:",
    heroTitle2: "கேன்வாஸ் ஆஃப் ப்ளோஸ்",
    days: "நாட்கள்",
    hours: "மணிகள்",
    minutes: "நிமிடங்கள்",
    seconds: "விநாடிகள்",
    regNow: "இப்போது பதிவு செய்க",
    viewGuide: "கையேட்டைப் பதிவிறக்கவும் (EN/SI/TA)",
    loading: "அடைவு செய்யப்படுகிறது...",
    eventOverview: "நிகழ்ச்சி மேலோட்டம்",
    bento1Title: "அட்டவணை மற்றும் தளவாடங்கள்",
    bento1Desc: "மொனராகலை ஈசாப்ட் IT துறையினரின் விளக்கக்காட்சி. 48 மணிநேர UI மெய்நிகர் வடிவமைப்பு போட்டி.",
    bento2Title: "வளாக ஹோஸ்ட்",
    bento2Desc: "ஈசாப்ட்評 மெட்ரோ கல்லூரி மொனராகலை கிளை — மெய்நிகர் தொழில்நுட்ப அணுகல்.",
    bento3Label: "பெருந்தொகை பரிசு",
    bento3Desc: "சிறந்த கண்டுபிடிப்பாளர்கள் மற்றும் வெற்றியாளர்களுக்கு விநியோகிக்கப்படும்.",
    bento4Num1: "500+", bento4Label1: "வடிவமைப்பாளர்கள்",
    bento4Num2: "24h", bento4Label2: "ஆலோசகர் ஆதரவு",
    bento4Num3: "12", bento4Label3: "தொழில் துறை நடுவர்கள்",
    bento4Num4: "மெய்நிகர்", bento4Label4: "உலகளாவிய அணுகல்",
    bento5Label: "// முக்கிய தடங்கள்",
    bento5Title: "UI பரிணாமம் மற்றும்\nஅமைப்பு ஓட்டங்கள்",
    challengeLabel: "சவால்",
    challengeTitle: "அழகியல் தர்க்கத்தை சந்திக்கும் இடம்",
    challengeDesc: "Canva இன் காட்சி கூறுகளைப் பயன்படுத்தி உயர்தர இடைமுகங்களை உருவாக்கி, அவற்றை Google Flow அமைப்புகளுக்குள் தரவு சுழற்சிகளுடன் இணைப்பதே இப்போட்டியின் முக்கிய சவாலாகும்.",
    timeline1Date: "அக்டோபர் 15",
    timeline1Title: "சமர்ப்பிப்பு ஆரம்பம்",
    timeline2Date: "அக்டோபர் 24",
    timeline2Title: "தொழில்நுட்பப் பட்டறை",
    formTitle: "உங்கள் இடத்தை உறுதிப்படுத்துங்கள்",
    formDesc: "பதிவுசெய்யப்பட்ட தரவு நேரடியாக ஈசாப்ட் மொனராகலை IT கல்விப் பிரிவுக்கு அனுப்பப்படும்.",
    labelName: "முழு பெயர்",
    labelEmail: "மின்னஞ்சல் முகவரி",
    labelInstitute: "பல்கலைக்கழகம் / நிறுவனம் / பள்ளி",
    labelWhatsapp: "வாட்ஸ்அப் எண்",
    labelExp: "அனுபவ நிலை",
    btnSubmit: "பதிவைச் சமர்ப்பிக்கவும்",
    btnSubmitting: "சமர்ப்பிக்கப்படுகிறது...",
    toastTitle: "பதிவு வெற்றிகரமாக முடிந்தது!",
    toastDesc: "நன்றி {name}, ஹேக்ஃப்ளோ 2026 க்கான உங்கள் இடம் வெற்றிகரமாக உறுதி செய்யப்பட்டுள்ளது.",
    selectInstPlaceholder: "உங்கள் நிறுவனத்தைத் தேர்ந்தெடுக்கவும்"
  }
};

export default function HackathonLandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'si' | 'ta'>('en');
  
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [pdfStringUrl, setPdfStringUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Sheets Institutes State ລັອກ
  const [institutesList, setInstitutesList] = useState<string[]>([]);

  // Custom Cursor Mouse Glow Coordinates State
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const t = translations[currentLang];

  // Mouse Movement Follow Logic Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch Institutes List from Google Sheet
  useEffect(() => {
    if (GOOGLE_SCRIPT_URL !== "https://script.google.com/macros/s/AKfycbzO2QOjfBfi3-HfLgCP9kPT-DDrDH-oUXnkgF64scCdJsPyyIuvze3E2exiWhnOEeHV8Q/exec") {
      fetch(GOOGLE_SCRIPT_URL)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.institutes) {
            setInstitutesList(data.institutes);
          }
        })
        .catch((err) => console.error("Error fetching institutes from Google Sheet: ", err));
    }
  }, []);

  useEffect(() => {
    fetch('/hackflow_2026_handbook.pdf')
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPdfStringUrl(reader.result as string);
          setIsLoading(false);
        };
        reader.readAsDataURL(blob);
      })
      .catch((err) => {
        console.error("Error loading PDF: ", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date('2026-08-20T00:00:00').getTime();
    let serverTimeOffset = 0;

    async function fetchAccurateServerTime() {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Colombo');
        if (response.ok) {
          const data = await response.json();
          const actualNetworkTime = new Date(data.datetime).getTime();
          serverTimeOffset = actualNetworkTime - Date.now();
        }
      } catch (error) {
        console.log("Network time API failed, using secure monotonic layout fallback.");
      }
    }

    const updateTimer = () => {
      const currentSynchronizedTime = Date.now() + serverTimeOffset;
      const difference = targetDate - currentSynchronizedTime;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    fetchAccurateServerTime().then(() => {
      updateTimer();
    });
    
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institute: '',
    whatsapp: '',
    experience: 'Beginner',
  });

  // Handle Form Submission into Google Sheet Endpoint API
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (GOOGLE_SCRIPT_URL === "https://script.google.com/macros/s/AKfycbzO2QOjfBfi3-HfLgCP9kPT-DDrDH-oUXnkgF64scCdJsPyyIuvze3E2exiWhnOEeHV8Q/exec") {
      toaster.create({
        title: "Configuration Error",
        description: "Please set your valid Google Apps Script Web App URL.",
        type: 'error'
      });
      return;
    }

    if (!formData.institute) {
      toaster.create({
        title: currentLang === 'en' ? "Required Field" : "අනිවාර්ය ක්ෂේත්‍රයකි",
        description: t.selectInstPlaceholder,
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // CORS redirects bypass locking redirection handling
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      toaster.create({
        title: t.toastTitle,
        description: t.toastDesc.replace('{name}', formData.fullName),
        type: 'success',
        duration: 5000
      });

      // Clear Form on Success
      setFormData({
        fullName: '',
        email: '',
        institute: '',
        whatsapp: '',
        experience: 'Beginner',
      });

    } catch (error) {
      console.error("Submission failed: ", error);
      toaster.create({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentBg = isDarkMode ? "#060913" : "#f8fafc";
  const currentTextColor = isDarkMode ? "#f1f5f9" : "#0f172a";
  const glassBg = isDarkMode ? "rgba(10, 16, 32, 0.65)" : "rgba(255, 255, 255, 0.75)";
  const glassBorder = isDarkMode ? "rgba(6, 182, 212, 0.15)" : "rgba(15, 23, 42, 0.08)";

  const glassPanelStyles = {
    bg: glassBg,
    backdropFilter: 'blur(16px)',
    border: `1px solid ${glassBorder}`,
    borderRadius: '2xl',
    p: { base: '6', md: '8' },
    boxShadow: isDarkMode ? "0 4px 30px rgba(0, 0, 0, 0.4)" : "0 4px 30px rgba(0, 0, 0, 0.03)",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const experienceLevels = createListCollection({
    items: [
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Pro", value: "Pro" },
    ],
  });

  // Dynamic Institutes Mapping Collection from Google Sheet State Array
  const institutesCollection = createListCollection({
    items: institutesList.map(inst => ({ label: inst, value: inst }))
  });

  // Native Intersection Observer Animation Hook Styles
  const scrollAnimateClass = {
    animationTimeline: "view()",
    animationName: "fadeInUp",
    animationFillMode: "both",
    animationRange: "entry 10% cover 40%",
  };

  return (
    <Box 
      bg={currentBg} 
      color={currentTextColor} 
      minH="100vh" 
      position="relative" 
      transition="background 0.5s ease, color 0.5s ease"
      style={{ fontFamily: "'Outfit', 'Space Grotesk', sans-serif" }}
    >
      
      {/* Google Fonts External Stylesheet Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&family=Space+Grotesk:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}} />

      {/* --- CURSOR MOVEMENT GLOW EFFECT --- */}
      {isDarkMode && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="350px"
          h="350px"
          bg="rgba(6, 182, 212, 0.12)"
          filter="blur(80px)"
          borderRadius="full"
          pointerEvents="none"
          zIndex="99"
          style={{
            transform: `translate3d(${mousePos.x - 175}px, ${mousePos.y - 175}px, 0)`,
            transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />
      )}
      
      {/* --- TOP RESPONSIVE NAVBAR --- */}
      <Box
        as="nav"
        position="fixed"
        top="0"
        w="full"
        zIndex="50"
        bg={isDarkMode ? "rgba(6, 9, 19, 0.8)" : "rgba(248, 250, 252, 0.8)"}
        backdropFilter="blur(24px)"
        borderBottom={`1px solid ${glassBorder}`}
        boxShadow={isDarkMode ? "0 4px 20px rgba(6, 182, 212, 0.08)" : "0 4px 20px rgba(0,0,0,0.02)"}
        h="20"
      >
        <Flex justify="space-between" align="center" maxW="1440px" mx="auto" px="6" h="full">
          <VStack align="start" gap="0">
            <Text fontSize="24px" fontWeight="900" letterSpacing="tighter" color={"#06b6d4"} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              HACKFLOW
            </Text>
            <Text fontSize="10px" fontFamily="'JetBrains Mono', monospace" opacity="0.7" display={{ base: 'none', sm: 'block' }}>
              ESOFT Monaragala
            </Text>
          </VStack>

          {/* Desktop Links */}
          <HStack gap="8" display={{ base: 'none', md: 'flex' }}>
            <Link href="#" color="#06b6d4" fontWeight="bold" fontFamily="'JetBrains Mono', monospace" fontSize="14px" lineHeight="1.2">{t.navHome}</Link>
            <Link href="#guidelines" color={isDarkMode ? "whiteAlpha.700" : "gray.600"} fontWeight="medium" fontFamily="'JetBrains Mono', monospace" fontSize="14px" lineHeight="1.2" _hover={{ color: '#06b6d4', transform: "translateY(-1px)" }} transition="all 0.2s">{t.navGuidelines}</Link>
            <Link href="#schedule" color={isDarkMode ? "whiteAlpha.700" : "gray.600"} fontWeight="medium" fontFamily="'JetBrains Mono', monospace" fontSize="14px" lineHeight="1.2" _hover={{ color: '#06b6d4', transform: "translateY(-1px)" }} transition="all 0.2s">{t.navSchedule}</Link>
            <Link href="#register" color={isDarkMode ? "whiteAlpha.700" : "gray.600"} fontWeight="medium" fontFamily="'JetBrains Mono', monospace" fontSize="14px" lineHeight="1.2" _hover={{ color: '#06b6d4', transform: "translateY(-1px)" }} transition="all 0.2s">{t.navRegister}</Link>
          </HStack>

          {/* Right Action Menu */}
          <HStack gap="4">
            {/* Language Selection Buttons */}
            <HStack bg={isDarkMode ? "whiteAlpha.100" : "blackAlpha.100"} p="1" borderRadius="full" gap="1" h="32px" border="1px solid" borderColor={glassBorder}>
              <Button size="xs" variant={currentLang === 'en' ? 'solid' : 'ghost'} bg={currentLang === 'en' ? '#06b6d4' : 'transparent'} color={currentLang === 'en' ? 'black' : currentTextColor} borderRadius="full" fontWeight="bold" _hover={{ opacity: 0.9 }} onClick={() => setCurrentLang('en')}>EN</Button>
              <Button size="xs" variant={currentLang === 'si' ? 'solid' : 'ghost'} bg={currentLang === 'si' ? '#06b6d4' : 'transparent'} color={currentLang === 'si' ? 'black' : currentTextColor} borderRadius="full" fontWeight="bold" _hover={{ opacity: 0.9 }} onClick={() => setCurrentLang('si')}>සිං</Button>
              <Button size="xs" variant={currentLang === 'ta' ? 'solid' : 'ghost'} bg={currentLang === 'ta' ? '#06b6d4' : 'transparent'} color={currentLang === 'ta' ? 'black' : currentTextColor} borderRadius="full" fontWeight="bold" _hover={{ opacity: 0.9 }} onClick={() => setCurrentLang('ta')}>தம</Button>
            </HStack>

            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="ghost"
              borderRadius="full"
              w="10"
              h="10"
              bg={isDarkMode ? "whiteAlpha.100" : "blackAlpha.100"}
              _hover={{ transform: "scale(1.1) rotate(15deg)", bg: isDarkMode ? "whiteAlpha.200" : "blackAlpha.200" }}
              transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
              <Icon as={isDarkMode ? FiSun : FiMoon} color={isDarkMode ? "yellow.400" : "indigo.600"} w="5" h="5" />
            </Button>

            <Button
              display={{ base: 'none', sm: 'inline-flex' }}
              bgColor="#06b6d4"
              color={'white'}
              borderRadius="full"
              px="6"
              fontSize="12px"
              fontWeight="bold"
              fontFamily="'JetBrains Mono', monospace"
              lineHeight="1.2"
              _hover={{ transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(6, 182, 212, 0.4)" }}
              transition="all 0.2s ease"
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.joinNow}
            </Button>

            {/* Mobile Menu Icon Toggle */}
            <Button
              display={{ base: 'flex', md: 'none' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              w="10"
              h="10"
            >
              <Icon as={isMobileMenuOpen ? FiX : FiMenu} w="6" h="6" />
            </Button>
          </HStack>
        </Flex>

        {/* Mobile Dropdown Menu Container */}
        {isMobileMenuOpen && (
          <Box display={{ md: 'none' }} bg={isDarkMode ? "#0a1020" : "white"} borderBottom={`1px solid ${glassBorder}`} px="6" py="4" position="absolute" top="20" left="0" w="full" zIndex="45">
            <VStack gap="4" align="stretch">
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} py="2" lineHeight="1.5">{t.navHome}</Link>
              <Link href="#guidelines" onClick={() => setIsMobileMenuOpen(false)} py="2" lineHeight="1.5">{t.navGuidelines}</Link>
              <Link href="#schedule" onClick={() => setIsMobileMenuOpen(false)} py="2" lineHeight="1.5">{t.navSchedule}</Link>
              <Link href="#register" onClick={() => setIsMobileMenuOpen(false)} py="2" lineHeight="1.5">{t.navRegister}</Link>
              <Button
                bgColor=" #06b6d4"
                color="white"
                w="full"
                lineHeight="1.2"
                onClick={() => { setIsMobileMenuOpen(false); document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                {t.joinNow}
              </Button>
            </VStack>
          </Box>
        )}
      </Box>

      {/* --- MAIN CONTENT AREA --- */}
      <Box as="main" pt="20">
        
        {/* Hero Section */}
        <Flex position="relative" minH="85vh" align="center" justify="center" overflow="hidden" px="6">
          <Box position="absolute" top="40%" left="50%" transform="translate(-50%, -50%)" w="900px" h="900px" bg={isDarkMode ? "rgba(6, 182, 212, 0.04)" : "rgba(6, 182, 212, 0.05)"} filter="blur(140px)" borderRadius="full" zIndex="0" />
          
          <VStack gap="10" maxW="4xl" textAlign="center" zIndex="10" transition="all 0.6s ease">
            <VStack gap="4">
              <VStack gap="2">
                <Text fontFamily="'JetBrains Mono', monospace" fontSize="12px" fontWeight="700" letterSpacing="widest" color="#06b6d4" bg={isDarkMode ? "rgba(6, 182, 212, 0.08)" : "rgba(6, 182, 212, 0.05)"} border="1px solid" borderColor="rgba(6, 182, 212, 0.2)" px="4" py="1.5" borderRadius="full" lineHeight="1.5">
                  {t.virtualHack}
                </Text>
                <Text fontSize="11px" fontWeight="bold" letterSpacing="wider" opacity="0.6" lineHeight="1.5" fontFamily="'JetBrains Mono', monospace">
                  {t.organizedBy}
                </Text>
              </VStack>
              <Heading as="h1" fontSize={{ base: '38px', sm: '52px', md: '68px' }} fontWeight="900" letterSpacing="-0.04em" lineHeight="1.15" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {t.heroTitle1}<br />
                <Text as="span" bgGradient="linear(to-r, #06b6d4, #3b82f6, #a855f7)" bgClip="text">
                  {t.heroTitle2}
                </Text>
              </Heading>
            </VStack>

            {/* Countdown Widgets */}
            <SimpleGrid columns={{ base: 2, sm: 4 }} gap="4" w="full" maxW="lg" mx="auto">
              <VStack {...glassPanelStyles} p="4" gap="1" h="110px" justify="center" _hover={{ borderColor: "rgba(6, 182, 212, 0.5)", transform: "translateY(-4px)" }}>
                <Text fontSize={{ base: "32px", md: "42px" }} fontWeight="800" color="#06b6d4" lineHeight="1">{isMounted ? timeLeft.days : "00"}</Text>
                <Text fontSize="10px" fontFamily="'JetBrains Mono', monospace" opacity="0.5" lineHeight="1">{t.days}</Text>
              </VStack>
              <VStack {...glassPanelStyles} p="4" gap="1" h="110px" justify="center" _hover={{ borderColor: "rgba(6, 182, 212, 0.5)", transform: "translateY(-4px)" }}>
                <Text fontSize={{ base: "32px", md: "42px" }} fontWeight="800" color="#06b6d4" lineHeight="1">{isMounted ? timeLeft.hours : "00"}</Text>
                <Text fontSize="10px" fontFamily="'JetBrains Mono', monospace" opacity="0.5" lineHeight="1">{t.hours}</Text>
              </VStack>
              <VStack {...glassPanelStyles} p="4" gap="1" h="110px" justify="center" _hover={{ borderColor: "rgba(6, 182, 212, 0.5)", transform: "translateY(-4px)" }}>
                <Text fontSize={{ base: "32px", md: "42px" }} fontWeight="800" color="#06b6d4" lineHeight="1">{isMounted ? timeLeft.minutes : "00"}</Text>
                <Text fontSize="10px" fontFamily="'JetBrains Mono', monospace" opacity="0.5" lineHeight="1">{t.minutes}</Text>
              </VStack>
              <VStack {...glassPanelStyles} p="4" gap="1" h="110px" justify="center" border="1px solid rgba(6, 182, 212, 0.4)" boxShadow="0 0 20px rgba(6, 182, 212, 0.15)" _hover={{ transform: "translateY(-4px)" }}>
                <Text fontSize={{ base: "32px", md: "42px" }} fontWeight="800" color=" #06b6d4" lineHeight="1">
                  {isMounted ? timeLeft.seconds : "00"}
                </Text>
                <Text fontSize="10px" fontFamily="'JetBrains Mono', monospace" color="#06b6d4" fontWeight="bold" lineHeight="1">{t.seconds}</Text>
              </VStack>
            </SimpleGrid>

            <Flex flexDir={{ base: 'column', sm: 'row' }} gap="4" w="full" justify="center" pt="4">
              <Button
                size="lg"
                bgColor=" #06b6d4"
                color="white"
                borderRadius="full"
                px="10"
                fontSize="12px"
                lineHeight="1.2"
                boxShadow="0 4px 25px rgba(6, 182, 212, 0.3)"
                _hover={{ boxShadow: '0 4px 40px rgba(6, 182, 212, 0.5)', transform: "translateY(-2px)" }}
                transition="all 0.2s"
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.regNow}
              </Button>
              
              <DownloadTrigger
                data={pdfStringUrl}
                fileName="HackFlow_2026_Handbook.pdf"
                mimeType="application/pdf"
                asChild
              >
                <Button
                  size="lg"
                  variant="outline"
                  disabled={isLoading || !pdfStringUrl}
                  borderColor={isDarkMode ? "whiteAlpha.300" : "blackAlpha.300"}
                  borderRadius="full"
                  color={isDarkMode ? "whiteAlpha.800" : "gray.600"}
                  px="10"
                  fontSize="12px"
                  lineHeight="1.2"
                  _hover={{ borderColor: '#06b6d4', bg: 'rgba(6, 182, 212, 0.05)', transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  <Icon as={FiDownload} /> {isLoading ? t.loading : t.viewGuide}
                </Button>
              </DownloadTrigger>
            </Flex>
          </VStack>
        </Flex>

        {/* Bento Grid Event Overview with SCROLL ANIMATION */}
        <Box py="20" px="6" maxW="1440px" mx="auto" id="guidelines" style={scrollAnimateClass}>
          <Box mb="10">
            <Heading as="h2" fontSize="40px" mb="2" lineHeight="1.2" fontWeight="800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.eventOverview}</Heading>
            <Box w="16" h="1" bgGradient="linear(to-r, #06b6d4, #3b82f6)" borderRadius="full" />
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap="6">
            <GridItem colSpan={{ base: 1, md: 2 }} {...glassPanelStyles} minH="220px" display="flex" flexDir="column" style={{ justifyContent: 'space-between' }} gap="4" _hover={{ borderColor: 'rgba(6, 182, 212, 0.4)', boxShadow: "0 10px 30px rgba(6, 182, 212, 0.1)", transform: "scale(1.01)" }}>
              <Icon as={FiCalendar} color="#06b6d4" w="10" h="10" />
              <VStack align="start" gap="2">
                <Heading as="h3" fontSize="24px" lineHeight="1.2" fontWeight="700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.bento1Title}</Heading>
                <Text color={isDarkMode ? "whiteAlpha.700" : "gray.600"} fontSize="14px" lineHeight="1.5">{t.bento1Desc}</Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1} {...glassPanelStyles} minH="220px" display="flex" flexDir="column" gap="4" _hover={{ borderColor: 'rgba(6, 182, 212, 0.4)', transform: "scale(1.01)" }}>
              <Flex w="12" h="12" bg={isDarkMode ? "whiteAlpha.50" : "gray.200"} borderRadius="xl" align="center" justify="center" border="1px solid" borderColor={glassBorder}>
                <Icon as={FiMapPin} color="#3b82f6" w="6" h="6" />
              </Flex>
              <VStack align="start" gap="1" mt="auto">
                <Text fontFamily="'JetBrains Mono', monospace" fontSize="12px" fontWeight="bold" lineHeight="1.2" color="#3b82f6">{t.bento2Title}</Text>
                <Text color={isDarkMode ? "whiteAlpha.700" : "gray.600"} fontSize="14px" lineHeight="1.5">{t.bento2Desc}</Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1} rowSpan={{ base: 1, md: 2 }} borderRadius="2xl" overflow="hidden" border="1px solid" borderColor="rgba(234, 179, 8, 0.3)" boxShadow="0 0 30px rgba(234, 179, 8, 0.05)" transition="transform 0.3s" _hover={{ transform: "scale(1.01)" }}>
              <Flex {...glassPanelStyles} border="none" h="full" w="full" minH="220px" flexDir="column" align="center" justify="center" textAlign="center" gap="4" bgGradient="linear(to-br, rgba(234, 179, 8, 0.03), transparent)">
                <Icon as={FiAward} color="yellow.400" w="14" h="14" filter="drop-shadow(0 0 10px rgba(234, 179, 8, 0.3))" mb="2" />
                <Box>
                  <Text fontFamily="'JetBrains Mono', monospace" fontSize="12px" color="yellow.400" letterSpacing="widest" fontWeight="bold" lineHeight="1.5">{t.bento3Label}</Text>
                  <Text fontSize="34px" fontWeight="900" color="yellow.300" lineHeight="1.2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Rs. 25,000</Text>
                </Box>
                <Text color={isDarkMode ? "whiteAlpha.600" : "gray.600"} fontSize="13px" lineHeight="1.5">{t.bento3Desc}</Text>
              </Flex>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }} {...glassPanelStyles} minH="160px" display="flex" alignItems="center" _hover={{ borderColor: 'rgba(6, 182, 212, 0.4)', transform: "scale(1.01)" }}>
              <SimpleGrid columns={2} gap="6" w="full">
                <Box>
                  <Text fontSize="26px" fontWeight="800" color="#06b6d4" lineHeight="1.2">500+</Text>
                  <Text fontSize="11px" opacity="0.5" fontFamily="'JetBrains Mono', monospace" lineHeight="1.2">{t.bento4Label1}</Text>
                </Box>
                <Box>
                  <Text fontSize="26px" fontWeight="800" color="#3b82f6" lineHeight="1.2">24h</Text>
                  <Text fontSize="11px" opacity="0.5" fontFamily="'JetBrains Mono', monospace" lineHeight="1.2">{t.bento4Label2}</Text>
                </Box>
                <Box>
                  <Text fontSize="26px" fontWeight="800" color="#06b6d4" lineHeight="1.2">12</Text>
                  <Text fontSize="11px" opacity="0.5" fontFamily="'JetBrains Mono', monospace" lineHeight="1.2">{t.bento4Label3}</Text>
                </Box>
                <Box>
                  <Text fontSize="26px" fontWeight="800" color="#3b82f6" lineHeight="1.2">{t.bento4Num4}</Text>
                  <Text fontSize="11px" opacity="0.5" fontFamily="'JetBrains Mono', monospace" lineHeight="1.2">{t.bento4Label4}</Text>
                </Box>
              </SimpleGrid>
            </GridItem>

            <GridItem colSpan={1} {...glassPanelStyles} minH="160px" display="flex" flexDir="column" style={{justifyContent:'end'}} bgGradient="linear(to-br, rgba(168, 85, 247, 0.08), transparent)" _hover={{ borderColor: 'rgba(168, 85, 247, 0.4)', transform: "scale(1.01)" }}>
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="12px" color="#a855f7" mb="2" fontWeight="bold" lineHeight="1.2">{t.bento5Label}</Text>
              <Text fontSize="22px" fontWeight="700" lineHeight="1.3" style={{ whiteSpace: 'pre-line', fontFamily: "'Space Grotesk', sans-serif" }}>{t.bento5Title}</Text>
            </GridItem>
          </Grid>
        </Box>

        {/* Challenge Description with SCROLL ANIMATION */}
        <Box py="20" bg={isDarkMode ? "rgba(6, 9, 19, 0.4)" : "gray.50"} borderTop={`1px solid ${glassBorder}`} borderBottom={`1px solid ${glassBorder}`} style={scrollAnimateClass}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="16" maxW="1440px" mx="auto" px="6" alignItems="center">
            <VStack align="start" gap="6">
              <VStack align="start" gap="2">
                <Text fontFamily="'JetBrains Mono', monospace" fontSize="12px" color="#3b82f6" fontWeight="bold" letterSpacing="widest" lineHeight="1.2">{t.challengeLabel}</Text>
                <Heading as="h2" fontSize="40px" lineHeight="1.2" fontWeight="800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.challengeTitle}</Heading>
              </VStack>
              <Text fontSize="17px" color={isDarkMode ? "whiteAlpha.700" : "gray.700"} lineHeight="1.65">{t.challengeDesc}</Text>
            </VStack>

            <VStack position="relative" pl="8" align="start" gap="10" id="schedule">
              <Box position="absolute" left="0" top="0" bottom="0" w="0.5" bgGradient="linear(to-b, #06b6d4, #3b82f6, transparent)" opacity="0.4" />
              <Box position="relative">
                <Box position="absolute" left="-36px" top="1.5" w="3" h="3" bg="#06b6d4" borderRadius="full" boxShadow="0 0 10px #06b6d4" />
                <Text fontSize="12px" fontFamily="'JetBrains Mono', monospace" color="#06b6d4" fontWeight="bold" lineHeight="1.2">{t.timeline1Date}</Text>
                <Heading as="h4" fontSize="24px" fontWeight="700" lineHeight="1.2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.timeline1Title}</Heading>
              </Box>
              <Box position="relative">
                <Box position="absolute" left="-36px" top="1.5" w="3" h="3" bg="#3b82f6" borderRadius="full" boxShadow="0 0 10px #3b82f6" />
                <Text fontSize="12px" fontFamily="'JetBrains Mono', monospace" color="#3b82f6" fontWeight="bold" lineHeight="1.2">{t.timeline2Date}</Text>
                <Heading as="h4" fontSize="24px" fontWeight="700" lineHeight="1.2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.timeline2Title}</Heading>
              </Box>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Form Registration Block with SCROLL ANIMATION */}
        <Box py="20" px="6" position="relative" id="register" style={scrollAnimateClass}>
          <Box maxW="2xl" mx="auto">
            <Box {...glassPanelStyles} p={{ base: '8', md: '12' }} border="1px solid" borderColor={isDarkMode ? "rgba(6, 182, 212, 0.2)" : glassBorder} boxShadow={isDarkMode ? "0 20px 50px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.04)"}>
              <VStack gap="2" textAlign="center" mb="8">
                <Heading as="h2" fontSize="38px" fontWeight="800" lineHeight="1.2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.formTitle}</Heading>
                <Text color={isDarkMode ? "whiteAlpha.600" : "gray.600"} fontSize="15px" lineHeight="1.5">{t.formDesc}</Text>
              </VStack>

              <form onSubmit={handleRegisterSubmit}>
                <VStack gap="5" align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="5" w="full">
                    <Field.Root required>
                      <Field.Label fontSize="12px" fontFamily="'JetBrains Mono', monospace" opacity="0.6" fontWeight="bold" lineHeight="1.5">{t.labelName}</Field.Label>
                      <Input
                        bg={isDarkMode ? "rgba(6, 9, 19, 0.5)" : "white"}
                        border="1px solid"
                        borderColor={glassBorder}
                        color={isDarkMode ? "white" : "black"}
                        borderRadius="xl"
                        py="6"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        _focus={{ borderColor: '#06b6d4', boxShadow: "0 0 10px rgba(6, 182, 212, 0.2)" }}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label fontSize="12px" fontFamily="'JetBrains Mono', monospace" opacity="0.6" fontWeight="bold" lineHeight="1.5">{t.labelEmail}</Field.Label>
                      <Input
                        type="email"
                        bg={isDarkMode ? "rgba(6, 9, 19, 0.5)" : "white"}
                        border="1px solid"
                        borderColor={glassBorder}
                        color={isDarkMode ? "white" : "black"}
                        borderRadius="xl"
                        py="6"
                        placeholder="john@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        _focus={{ borderColor: '#06b6d4', boxShadow: "0 0 10px rgba(6, 182, 212, 0.2)" }}
                      />
                    </Field.Root>
                  </SimpleGrid>

                  {/* 🌟 UNIVERSITY / INSTITUTE SELECT COMPONENT (Sheet Integrated) */}
                  <Field.Root required>
                    <Field.Label fontSize="12px" fontFamily="'JetBrains Mono', monospace" opacity="0.6" fontWeight="bold" lineHeight="1.5">{t.labelInstitute}</Field.Label>
                    <Select.Root 
                      collection={institutesCollection} 
                      size="md"
                      value={formData.institute ? [formData.institute] : []}
                      onValueChange={(details) => {
                        if (details.value.length > 0) {
                          setFormData({ ...formData, institute: details.value[0] });
                        }
                      }}
                    >
                      <Select.HiddenSelect name="institute" />
                      <Select.Control>
                        <Select.Trigger 
                          bg={isDarkMode ? "rgba(6, 9, 19, 0.5)" : "white"}
                          border="1px solid"
                          borderColor={glassBorder}
                          color={isDarkMode ? "white" : "black"}
                          borderRadius="xl"
                          h="50px"
                          px="4"
                          _focus={{ borderColor: '#06b6d4' }}
                        >
                          <Select.ValueText placeholder={t.selectInstPlaceholder} />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator color="#06b6d4" />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner zIndex="60">
                          <Select.Content bg={isDarkMode ? "#0a1020" : "white"} borderColor={glassBorder} borderRadius="xl" maxH="250px" overflowY="auto">
                            {institutesCollection.items.map((inst) => (
                              <Select.Item item={inst} key={inst.value} color={isDarkMode ? "white" : "black"} _hover={{ bg: "#06b6d4", color: "black" }} cursor="pointer" p="3" borderRadius="lg">
                                {inst.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="5" w="full">
                    <Field.Root required>
                      <Field.Label fontSize="12px" fontFamily="'JetBrains Mono', monospace" opacity="0.6" fontWeight="bold" lineHeight="1.5">{t.labelWhatsapp}</Field.Label>
                      <Input
                        bg={isDarkMode ? "rgba(6, 9, 19, 0.5)" : "white"}
                        border="1px solid"
                        borderColor={glassBorder}
                        color={isDarkMode ? "white" : "black"}
                        borderRadius="xl"
                        py="6"
                        placeholder="+94 7X XXX XXXX"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        _focus={{ borderColor: '#06b6d4', boxShadow: "0 0 10px rgba(6, 182, 212, 0.2)" }}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label fontSize="12px" fontFamily="'JetBrains Mono', monospace" opacity="0.6" fontWeight="bold" lineHeight="1.5">{t.labelExp}</Field.Label>
                      <Select.Root 
                        collection={experienceLevels} 
                        size="md"
                        value={[formData.experience]}
                        onValueChange={(details) => {
                          if (details.value.length > 0) {
                            setFormData({ ...formData, experience: details.value[0] });
                          }
                        }}
                      >
                        <Select.HiddenSelect name="experience" />
                        <Select.Control>
                          <Select.Trigger 
                            bg={isDarkMode ? "rgba(6, 9, 19, 0.5)" : "white"}
                            border="1px solid"
                            borderColor={glassBorder}
                            color={isDarkMode ? "white" : "black"}
                            borderRadius="xl"
                            h="50px"
                            px="4"
                            _focus={{ borderColor: '#06b6d4' }}
                          >
                            <Select.ValueText placeholder="Select Experience Level" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator color="#06b6d4" />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner zIndex="60">
                            <Select.Content bg={isDarkMode ? "#0a1020" : "white"} borderColor={glassBorder} borderRadius="xl">
                              {experienceLevels.items.map((level) => (
                                <Select.Item item={level} key={level.value} color={isDarkMode ? "white" : "black"} _hover={{ bg: "#06b6d4", color: "black" }} cursor="pointer" p="3" borderRadius="lg">
                                  {level.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Field.Root>
                  </SimpleGrid>

                  <Button 
                    type="submit" 
                    w="full" 
                    py="7" 
                    mt="4" 
                    bgColor="#06b6d4" 
                    color="white" 
                    fontWeight="bold" 
                    fontFamily="'JetBrains Mono', monospace" 
                    fontSize="12px" 
                    borderRadius="xl" 
                    lineHeight="1.2" 
                    disabled={isSubmitting}
                    _hover={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)', transform: "translateY(-1px)" }}
                  >
                    {isSubmitting ? t.btnSubmitting : t.btnSubmit}
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box as="footer" bg={isDarkMode ? "#04060d" : "gray.200"} borderTop={`1px solid ${glassBorder}`} py="8" w="full">
        <Flex flexDir={{ base: 'column', md: 'row' }} justify="space-between" align="center" maxW="1440px" mx="auto" px="6" gap="4">
          <Text fontSize="12px" fontWeight="bold" color="#06b6d4" lineHeight="1.2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ESOFT Metro College - MONARAGALA</Text>
          <Text fontSize="12px" fontFamily="'JetBrains Mono', monospace" opacity="0.5" lineHeight="1.2">© 2026 HACKFLOW HACKATHON. ALL RIGHTS RESERVED.</Text>
        </Flex>
      </Box>
    </Box>
  );
}