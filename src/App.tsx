import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Youtube, Instagram, Twitter, 
  Settings, Layout, Type, Palette, Image as ImageIcon,
  ChevronRight, ArrowRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { INITIAL_BUSINESS_MODELS, INITIAL_CONFIG, INITIAL_NEWS, SiteConfig, BusinessModel, NewsItem } from './constants';
import BusinessSection from './components/BusinessSection';
import RecruitmentForm from './components/RecruitmentForm';
import TextSelectionToolbar from './components/TextSelectionToolbar';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [models, setModels] = useState<BusinessModel[]>(INITIAL_BUSINESS_MODELS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);

  // Logo generation on mount
  useEffect(() => {
    const generateLogo = async () => {
      if (config.logoUrl && !config.logoUrl.includes('picsum')) return; // Already has a logo
      
      setIsGeneratingLogo(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A professional, abstract circular logo for a regional industrial technology cooperative. The logo features three interlocking human-like figures in dark blue, light blue, and orange, arranged in a circle. The design is clean, modern, and minimalist, on a transparent background. Vector style.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const imageUrl = `data:image/png;base64,${base64EncodeString}`;
            handleConfigChange('logoUrl', imageUrl);
            break;
          }
        }
      } catch (error) {
        console.error("Logo generation error:", error);
      } finally {
        setIsGeneratingLogo(false);
      }
    };

    generateLogo();
  }, []);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConfigChange = (key: keyof SiteConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleConfigChange('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddButton = () => {
    const newButton = { id: Date.now().toString(), label: '새 버튼', link: '#' };
    handleConfigChange('buttons', [...config.buttons, newButton]);
  };

  const handleRemoveButton = (id: string) => {
    handleConfigChange('buttons', config.buttons.filter(b => b.id !== id));
  };

  const handleUpdateButton = (id: string, field: 'label' | 'link', value: string) => {
    handleConfigChange('buttons', config.buttons.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleUpdateNews = (id: string, field: keyof NewsItem, value: string) => {
    handleConfigChange('news', config.news.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  const handleUpdateModel = (id: string, field: keyof BusinessModel, value: string) => {
    setModels(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleNewsImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateNews(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="min-h-screen bg-black selection:bg-accent selection:text-white"
      style={{ 
        fontSize: `${config.fontSize}px`, 
        fontWeight: config.fontWeight,
        '--accent': config.accentColor,
        '--accent-secondary': config.secondaryAccentColor,
        '--accent-hover': `${config.accentColor}dd`
      } as React.CSSProperties}
    >
      <TextSelectionToolbar onStyleChange={handleConfigChange} currentConfig={config} />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {isGeneratingLogo ? (
                <div className="w-12 h-12 bg-white/10 rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              ) : (
                <img 
                  src={config.logoUrl} 
                  alt="Logo" 
                  className="w-12 h-12 object-contain transition-transform group-hover:rotate-12" 
                  style={{ 
                    filter: config.logoInvert ? 'invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.2)' : 'none',
                    mixBlendMode: config.logoInvert ? 'screen' : 'normal'
                  }}
                  referrerPolicy="no-referrer" 
                />
              )}
              <span 
                className="font-black hidden md:block tracking-tighter"
                style={{ fontSize: `${config.logoFontSize}px` }}
              >
                {config.siteName}
              </span>
            </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#business" className="text-text-secondary hover:text-white transition-colors">사업모델</a>
            <a href="#recruit" className="text-text-secondary hover:text-white transition-colors">지점장 모집</a>
            <a href="#news" className="text-text-secondary hover:text-white transition-colors">공지사항</a>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5 text-text-secondary" />
            </button>
            <a 
              href="#recruit" 
              className="bg-accent hover:bg-accent-hover px-6 py-2.5 rounded-full font-semibold transition-all"
            >
              지금 지원하기
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold">
              <a href="#business" onClick={() => setIsMenuOpen(false)}>사업모델</a>
              <a href="#recruit" onClick={() => setIsMenuOpen(false)}>지점장 모집</a>
              <a href="#news" onClick={() => setIsMenuOpen(false)}>공지사항</a>
              <button 
                onClick={() => { setIsAdminOpen(true); setIsMenuOpen(false); }}
                className="flex items-center gap-2 text-accent"
              >
                <Settings className="w-6 h-6" /> 관리자 설정
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0" style={{ backgroundColor: config.backgroundColor }}>
          <iframe 
            src={config.videoUrl}
            className="w-full h-[120%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            style={{ opacity: config.backgroundOpacity }}
            allow="autoplay; encrypted-media"
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundColor: config.overlayColor,
              opacity: config.overlayOpacity 
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <h1 
              className="font-black mb-8 leading-tight tracking-tighter"
              style={{ fontSize: `${config.heroTitleSize}px`, fontWeight: config.heroTitleWeight }}
            >
              {config.heroTitle.split(' ').map((word, i) => (
                <motion.span 
                  key={i} 
                  className={`inline-block ${i % 2 === 1 ? 'gradient-text' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: `${config.heroSubtitleSize}px`, fontWeight: config.heroSubtitleWeight }}
            >
              {config.heroSubtitle}
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {config.buttons.map((btn, idx) => (
                <motion.a 
                  key={btn.id}
                  href={btn.link} 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full md:w-auto px-10 py-5 rounded-full text-xl font-bold flex items-center justify-center gap-2 group transition-all shadow-xl ${
                    idx === 0 
                      ? "bg-accent hover:bg-accent-hover shadow-accent/20" 
                      : "glass-card hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {btn.label}
                  {idx === 0 && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-secondary"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-accent rounded-full" />
          </div>
        </motion.div>
      </header>

      {/* Business Models */}
      <BusinessSection models={models} />

      {/* Recruitment Form */}
      <RecruitmentForm 
        googleFormUrl={config.googleFormUrl} 
        buttonLabel={config.recruitmentButtonLabel}
      />

      {/* News Section */}
      <section id="news" className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-4">새로운 소식 & 일정</h2>
              <p className="text-text-secondary">협동조합의 최신 공지사항과 주요 행사 일정을 전해드립니다.</p>
            </div>
            <button className="flex items-center gap-2 text-accent hover:underline self-start md:self-auto">
              전체 공지사항 보기 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.news.map((item, i) => (
              <motion.div 
                key={item.id} 
                className="glass-card overflow-hidden group cursor-pointer flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => item.link !== '#' && window.open(item.link, '_blank')}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent/90 backdrop-blur-md rounded-full text-xs font-bold">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-accent-secondary text-sm font-bold mb-2">{item.date}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-6 whitespace-pre-line">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all">
                    상세보기 <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={config.logoUrl} 
                alt="Logo" 
                className="w-8 h-8 object-contain" 
                style={{ 
                  filter: config.logoInvert ? 'invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.2)' : 'none',
                  mixBlendMode: config.logoInvert ? 'screen' : 'normal'
                }}
                referrerPolicy="no-referrer" 
              />
              <span className="font-bold text-xl">{config.siteName}</span>
            </div>
            <p className="text-text-secondary mb-8 max-w-md">
              우리는 기술과 협동의 가치를 믿습니다. 전국의 지역 산업이 AI를 통해 혁신하고, 
              모든 구성원이 함께 성장하는 생태계를 만들어갑니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">바로가기</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><a href="#" className="hover:text-white transition-colors">조합소개</a></li>
              <li><a href="#business" className="hover:text-white transition-colors">사업모델</a></li>
              <li><a href="#recruit" className="hover:text-white transition-colors">지점장 모집</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">공지사항</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">고객지원</h4>
            <ul className="space-y-4 text-text-secondary">
              <li>대표번호: {config.phone}</li>
              <li>이메일: {config.email}</li>
              <li>주소: {config.address}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-text-secondary text-sm">
          © 2026 {config.siteName}. All rights reserved.
        </div>
      </footer>

      {/* Admin Dashboard Sidebar (Simulated) */}
      <AnimatePresence>
        {isAdminOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[70] bg-[#0A0A0A] border-l border-white/10 p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold">관리자 대시보드</h2>
                </div>
                <button onClick={() => setIsAdminOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <X />
                </button>
              </div>

              <div className="space-y-8">
                {/* Site Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                    <Layout className="w-4 h-4" /> 기본 정보 설정
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">사이트 이름</label>
                    <input 
                      type="text" 
                      value={config.siteName}
                      onChange={(e) => handleConfigChange('siteName', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">로고 업로드</label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                        <img 
                          src={config.logoUrl} 
                          alt="Preview" 
                          className="w-full h-full object-contain" 
                          style={{ 
                            filter: config.logoInvert ? 'invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.2)' : 'none',
                            mixBlendMode: config.logoInvert ? 'screen' : 'normal'
                          }}
                        />
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="text-xs text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-hover cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="logoInvert"
                      checked={config.logoInvert}
                      onChange={(e) => handleConfigChange('logoInvert', e.target.checked)}
                      className="w-4 h-4 accent-accent"
                    />
                    <label htmlFor="logoInvert" className="text-xs text-text-secondary">로고 배경 제거 (반전 필터)</label>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                    <Layout className="w-4 h-4" /> 연락처 및 지원 링크
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">구글 폼 지원 링크</label>
                    <input 
                      type="text" 
                      value={config.googleFormUrl}
                      onChange={(e) => handleConfigChange('googleFormUrl', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                      placeholder="https://docs.google.com/forms/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">지원 버튼 문구</label>
                    <input 
                      type="text" 
                      value={config.recruitmentButtonLabel}
                      onChange={(e) => handleConfigChange('recruitmentButtonLabel', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">대표번호</label>
                    <input 
                      type="text" 
                      value={config.phone}
                      onChange={(e) => handleConfigChange('phone', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">이메일</label>
                    <input 
                      type="text" 
                      value={config.email}
                      onChange={(e) => handleConfigChange('email', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">주소</label>
                    <input 
                      type="text" 
                      value={config.address}
                      onChange={(e) => handleConfigChange('address', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                    />
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                    <Type className="w-4 h-4" /> 타이포그래피 설정
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">기본 폰트 크기 (px)</label>
                      <input 
                        type="number" 
                        value={config.fontSize}
                        onChange={(e) => handleConfigChange('fontSize', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">폰트 굵기</label>
                      <select 
                        value={config.fontWeight}
                        onChange={(e) => handleConfigChange('fontWeight', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                      >
                        <option value="300">Light (300)</option>
                        <option value="400">Regular (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="600">SemiBold (600)</option>
                        <option value="700">Bold (700)</option>
                        <option value="900">Black (900)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Button Management */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                      <Layout className="w-4 h-4" /> 버튼 관리
                    </div>
                    <button 
                      onClick={handleAddButton}
                      className="text-xs bg-accent/20 text-accent px-2 py-1 rounded hover:bg-accent/30 transition-colors"
                    >
                      + 추가
                    </button>
                  </div>
                  <div className="space-y-4">
                    {config.buttons.map((btn) => (
                      <div key={btn.id} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-accent">버튼 #{btn.id.slice(-4)}</span>
                          <button 
                            onClick={() => handleRemoveButton(btn.id)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            삭제
                          </button>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">라벨</label>
                          <input 
                            type="text" 
                            value={btn.label}
                            onChange={(e) => handleUpdateButton(btn.id, 'label', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">링크</label>
                          <input 
                            type="text" 
                            value={btn.link}
                            onChange={(e) => handleUpdateButton(btn.id, 'link', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Model Management */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                    <Layout className="w-4 h-4" /> 사업 모델 관리
                  </div>
                  <div className="space-y-4">
                    {models.map((model) => (
                      <div key={model.id} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                        <div className="text-xs font-bold text-accent">{model.title}</div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">제목</label>
                          <input 
                            type="text" 
                            value={model.title}
                            onChange={(e) => handleUpdateModel(model.id, 'title', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">간략 설명</label>
                          <textarea 
                            rows={2}
                            value={model.description}
                            onChange={(e) => handleUpdateModel(model.id, 'description', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">상세 설명</label>
                          <textarea 
                            rows={4}
                            value={model.detailedDescription}
                            onChange={(e) => handleUpdateModel(model.id, 'detailedDescription', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* News Management */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                    <ImageIcon className="w-4 h-4" /> 소식 & 일정 관리
                  </div>
                  <div className="space-y-4">
                    {config.news.map((item) => (
                      <div key={item.id} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-accent">뉴스 #{item.id.slice(-1)}</span>
                          <div className="flex items-center gap-2">
                            <label className="text-[10px] text-text-secondary">카테고리</label>
                            <input 
                              type="text" 
                              value={item.category}
                              onChange={(e) => handleUpdateNews(item.id, 'category', e.target.value)}
                              className="bg-black/40 border border-white/10 rounded px-2 py-0.5 text-[10px] focus:border-accent outline-none w-20"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">제목</label>
                          <input 
                            type="text" 
                            value={item.title}
                            onChange={(e) => handleUpdateNews(item.id, 'title', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">날짜</label>
                          <input 
                            type="text" 
                            value={item.date}
                            onChange={(e) => handleUpdateNews(item.id, 'date', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">내용</label>
                          <textarea 
                            rows={3}
                            value={item.description}
                            onChange={(e) => handleUpdateNews(item.id, 'description', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">이미지 설정 (URL 직접 입력 가능)</label>
                          <div className="flex flex-col gap-2">
                            <input 
                              type="text" 
                              value={item.image}
                              onChange={(e) => handleUpdateNews(item.id, 'image', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:border-accent outline-none"
                              placeholder="이미지 URL (https://...)"
                            />
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-px bg-white/10" />
                              <span className="text-[10px] text-text-secondary">또는</span>
                              <div className="flex-1 h-px bg-white/10" />
                            </div>
                            <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-text-secondary py-3 rounded-lg text-xs font-bold transition-colors text-center">
                              기기에서 이미지 파일 선택
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleNewsImageUpload(item.id, e)}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-text-secondary">상세보기 링크</label>
                          <input 
                            type="text" 
                            value={item.link}
                            onChange={(e) => handleUpdateNews(item.id, 'link', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Typography */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                    <Type className="w-4 h-4" /> 히어로 타이포그래피
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">메인 타이틀 크기 (px)</label>
                      <input 
                        type="number" 
                        value={config.heroTitleSize}
                        onChange={(e) => handleConfigChange('heroTitleSize', parseInt(e.target.value))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">메인 타이틀 굵기</label>
                      <select 
                        value={config.heroTitleWeight}
                        onChange={(e) => handleConfigChange('heroTitleWeight', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                      >
                        <option value="300">Light</option>
                        <option value="400">Regular</option>
                        <option value="700">Bold</option>
                        <option value="900">Black</option>
                      </select>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">서브 타이틀 크기 (px)</label>
                      <input 
                        type="number" 
                        value={config.heroSubtitleSize}
                        onChange={(e) => handleConfigChange('heroSubtitleSize', parseInt(e.target.value))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">서브 타이틀 굵기</label>
                      <select 
                        value={config.heroSubtitleWeight}
                        onChange={(e) => handleConfigChange('heroSubtitleWeight', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-accent outline-none"
                      >
                        <option value="300">Light</option>
                        <option value="400">Regular</option>
                        <option value="700">Bold</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Hero Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                    <Type className="w-4 h-4" /> 히어로 섹션 텍스트
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">메인 타이틀</label>
                    <textarea 
                      rows={2}
                      value={config.heroTitle}
                      onChange={(e) => handleConfigChange('heroTitle', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">서브 타이틀</label>
                    <textarea 
                      rows={3}
                      value={config.heroSubtitle}
                      onChange={(e) => handleConfigChange('heroSubtitle', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Visuals */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-bold uppercase tracking-wider">
                    <Palette className="w-4 h-4" /> 디자인 & 미디어
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">포인트 컬러 1</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={config.accentColor}
                          onChange={(e) => handleConfigChange('accentColor', e.target.value)}
                          className="w-10 h-10 rounded bg-transparent border-none cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">포인트 컬러 2</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={config.secondaryAccentColor}
                          onChange={(e) => handleConfigChange('secondaryAccentColor', e.target.value)}
                          className="w-10 h-10 rounded bg-transparent border-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">로고 글자 크기 ({config.logoFontSize}px)</label>
                    <input 
                      type="range" 
                      min="12" 
                      max="60" 
                      value={config.logoFontSize}
                      onChange={(e) => handleConfigChange('logoFontSize', parseInt(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary">배경 영상 URL (YouTube Embed)</label>
                    <input 
                      type="text" 
                      value={config.videoUrl}
                      onChange={(e) => handleConfigChange('videoUrl', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-accent outline-none"
                    />
                  </div>
                  
                  {/* Background Color & Opacity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">배경 색상</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={config.backgroundColor}
                          onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                          className="w-8 h-8 rounded bg-transparent border-none cursor-pointer"
                        />
                        <input 
                          type="text" 
                          value={config.backgroundColor}
                          onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs focus:border-accent outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">영상 투명도 ({Math.round(config.backgroundOpacity * 100)}%)</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01"
                        value={config.backgroundOpacity}
                        onChange={(e) => handleConfigChange('backgroundOpacity', parseFloat(e.target.value))}
                        className="w-full accent-accent"
                      />
                    </div>
                  </div>

                  {/* Overlay Color & Opacity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">오버레이 색상</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={config.overlayColor}
                          onChange={(e) => handleConfigChange('overlayColor', e.target.value)}
                          className="w-8 h-8 rounded bg-transparent border-none cursor-pointer"
                        />
                        <input 
                          type="text" 
                          value={config.overlayColor}
                          onChange={(e) => handleConfigChange('overlayColor', e.target.value)}
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs focus:border-accent outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary">오버레이 투명도 ({Math.round(config.overlayOpacity * 100)}%)</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01"
                        value={config.overlayOpacity}
                        onChange={(e) => handleConfigChange('overlayOpacity', parseFloat(e.target.value))}
                        className="w-full accent-accent"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <button 
                    onClick={() => setIsAdminOpen(false)}
                    className="w-full bg-accent py-3 rounded-xl font-bold hover:bg-accent-hover transition-colors"
                  >
                    설정 저장 및 닫기
                  </button>
                  <p className="text-[10px] text-text-secondary text-center mt-4">
                    * 이 설정은 현재 세션에만 적용됩니다. 실제 운영 시 데이터베이스 연동이 필요합니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
