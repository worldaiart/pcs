import React from 'react';

export interface BusinessModel {
  id: string;
  title: string;
  description: string;
  icon: string;
  detailedDescription?: string;
}

export interface SiteButton {
  id: string;
  label: string;
  link: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

export interface SiteConfig {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  accentColor: string;
  secondaryAccentColor: string;
  videoUrl: string;
  logoUrl: string;
  logoInvert: boolean;
  backgroundColor: string;
  backgroundOpacity: number;
  overlayColor: string;
  overlayOpacity: number;
  fontSize: number;
  fontWeight: string;
  heroTitleSize: number;
  heroTitleWeight: string;
  heroSubtitleSize: number;
  heroSubtitleWeight: string;
  logoFontSize: number;
  buttons: SiteButton[];
  news: NewsItem[];
  phone: string;
  email: string;
  address: string;
  googleFormUrl: string;
  recruitmentButtonLabel: string;
}

export const INITIAL_BUSINESS_MODELS: BusinessModel[] = [
  {
    id: 'air-care',
    title: '공공기관 에어 케어',
    description: '공공기관 에어컨 청소 및 공기정화 서비스. 정부 우선 구매 대상 비즈니스 모델로 안정적인 수익 창출.',
    icon: 'Wind',
    detailedDescription: '전국지역산업기술협동조합의 에어 케어 사업은 공공기관, 학교, 병원 등 대규모 시설의 실내 공기질을 혁신적으로 개선합니다. AI 기반 오염도 측정 시스템과 정밀 분해 세척 기술을 결합하여 에너지 효율을 높이고 쾌적한 환경을 제공합니다. 정부 우선 구매 대상 비즈니스 모델로서 안정적인 판로 확보와 지속 가능한 수익 구조를 보장합니다.',
  },
  {
    id: 'care',
    title: '케어복지법인',
    description: 'AI 활용 케어 전문가 양성. 홈케어 및 요양기관용 AI 환자 데이터 케어 시스템 기반 서비스.',
    icon: 'HeartPulse',
    detailedDescription: '초고령 사회를 대비하여 AI 기술을 접목한 스마트 케어 서비스를 제공합니다. AI 환자 데이터 분석 시스템을 통해 개인별 맞춤형 케어 플랜을 수립하고, 전문적인 AI 케어 전문가를 양성하여 홈케어 및 요양 시설의 서비스 질을 획기적으로 향상시킵니다. 데이터 기반의 정밀한 돌봄으로 어르신들의 삶의 질을 높이는 복지 혁신 모델입니다.',
  },
  {
    id: 'smartfarm',
    title: '스마트 팜 협동 농장',
    description: 'AI 기반 빅데이터 위탁 운영 모델 (지역 발전형 + 청년 도약형). 전문가 양성 및 농장 운영.',
    icon: 'Leaf',
    detailedDescription: '전통 농업에 AI와 빅데이터를 결합하여 생산성을 극대화하는 미래형 농업 모델입니다. 지역 발전형과 청년 도약형으로 구분하여 맞춤형 스마트 팜 운영 솔루션을 제공하며, 데이터 기반의 작물 재배 최적화 시스템을 통해 안정적인 수익을 창출합니다. 농업 전문가 양성 교육을 병행하여 지역 경제 활성화와 청년 일자리 창출에 기여합니다.',
  },
  {
    id: 'sns-agency',
    title: 'SNS 기획사',
    description: '1인 크리에이터 창작 기술 지원. 유튜브/인스타/X/틱톡/쓰레드 콘텐츠 수익 모델 협업.',
    icon: 'Video',
    detailedDescription: '1인 미디어 시대의 크리에이터들을 위한 종합 창작 지원 시스템입니다. AI 기반의 트렌드 분석과 콘텐츠 기획 도구를 제공하여 유튜브, 인스타그램, 틱톡 등 다양한 플랫폼에서 경쟁력 있는 콘텐츠를 제작할 수 있도록 돕습니다. 단순한 기술 지원을 넘어, 수익 모델 다각화와 브랜드 협업 기회를 제공하여 크리에이터의 성장을 지원합니다.',
  },
  {
    id: 'sns-ad',
    title: 'SNS 광고 대행사',
    description: '자영업자 및 소상공인 마케팅 지원 (스토리텔링 및 비주얼 중심).',
    icon: 'Megaphone',
    detailedDescription: '지역 소상공인과 자영업자들을 위한 최적화된 마케팅 솔루션을 제공합니다. AI를 활용한 타겟 분석과 매력적인 스토리텔링, 고품질 비주얼 콘텐츠 제작을 통해 실질적인 매출 증대로 이어지는 광고 캠페인을 운영합니다. 저비용 고효율의 SNS 광고 전략으로 지역 상권의 디지털 전환과 경쟁력 강화를 선도합니다.',
  },
  {
    id: 'voice-keep',
    title: 'VOICE KEEP 법인',
    description: 'AI 스마트 보이스 메이커 양성. 지역 방언 AI 학습 데이터 구축, 유족을 위한 고인 목소리 복원 서비스.',
    icon: 'Mic2',
    detailedDescription: '목소리에 담긴 감정과 기억을 AI 기술로 보존하고 재현하는 혁신적인 서비스입니다. 지역 방언 보존을 위한 AI 학습 데이터 구축 사업과 더불어, 유족들을 위해 고인의 목소리를 따뜻하게 복원해주는 감성 AI 서비스를 제공합니다. AI 스마트 보이스 메이커 양성을 통해 새로운 기술 영역의 일자리를 창출하고 사회적 가치를 실현합니다.',
  },
  {
    id: 'ai-roleplay',
    title: 'AI 역할 대행 서비스',
    description: '심리 안정 및 외로움 해결을 위한 AI 역할극 전문가 양성 (가족 역할 수행 등).',
    icon: 'Users',
    detailedDescription: '현대 사회의 고립과 외로움 문제를 해결하기 위한 심리 지원 서비스입니다. AI 역할극 전문가를 양성하여 가족, 친구 등 필요한 역할을 수행함으로써 사용자의 정서적 안정을 돕습니다. 전문적인 심리 상담 기법과 AI 기술을 결합하여 현대인들의 마음 건강을 돌보고 사회적 연결망을 보완하는 따뜻한 기술 모델입니다.',
  },
  {
    id: 'ai-skillnet',
    title: 'AI SKILL NET',
    description: '경력 단절 여성을 위한 AI 역량 개발 및 취업 연계 (취업형/아웃소싱형 프리미엄 교육).',
    icon: 'Network',
    detailedDescription: '경력 단절 여성들이 AI 시대의 핵심 인재로 거듭날 수 있도록 돕는 프리미엄 교육 및 취업 네트워크입니다. 실무 중심의 AI 역량 개발 프로그램을 제공하고, 취업형과 아웃소싱형 등 다양한 형태의 일자리를 연계합니다. 여성들의 잠재력을 깨우고 지속 가능한 커리어를 구축할 수 있도록 강력한 지원 네트워크를 운영합니다.',
  },
  {
    id: 'ai-agent',
    title: 'AI AGENT CONVERTER',
    description: '시니어 및 경단녀를 위한 AI 직무 복귀 파일럿 (AI 에이전트 설계 및 운영 관리자 양성).',
    icon: 'Cpu',
    detailedDescription: '시니어와 경력 단절 여성들이 AI 에이전트 설계 및 운영 전문가로 활약할 수 있도록 돕는 직무 전환 프로그램입니다. 복잡한 코딩 없이도 AI를 활용하여 업무 자동화 솔루션을 구축하는 기술을 교육하며, 기업의 AI 도입을 돕는 컨설턴트로 성장할 수 있도록 지원합니다. 풍부한 사회 경험과 AI 기술의 결합으로 새로운 가치를 창출합니다.',
  },
  {
    id: 'companion-bot',
    title: '반려봇 및 기업 AI 전환',
    description: '디지털 트윈 기반 위험 감시/투약 관리 서비스 및 정부 보조금을 활용한 기업 AI 전환 전문 인력 양성.',
    icon: 'Bot',
    detailedDescription: '디지털 트윈 기술이 적용된 반려봇을 통해 독거 노인 및 환자의 안전을 24시간 모니터링합니다. 실시간 위험 감지와 투약 관리 기능을 통해 응급 상황에 신속히 대응합니다. 또한, 중소기업의 AI 전환을 위해 정부 보조금 매칭과 전문 인력 파견을 지원하여 지역 산업 전반의 디지털 혁신을 가속화합니다.',
  },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: '제 1차 전국 지점장 통합 VIP 초청 설명회',
    date: '2026.04.11 (토)',
    description: '시간: 오후 3시 | 장소: 서울시 동작구 노량진로186, 세미나실. 전근식 서울시 교육감과 전국 지점장님들을 모시고 통합 비즈니스 모델 설명회를 개최합니다.',
    image: 'https://ais-dev-iu65vekjux2d4dgbghfdpn-304371246819.asia-northeast1.run.app/api/attachments/iu65vekjux2d4dgbghfdpn/input_file_0.png',
    category: '설명회',
    link: '#',
  },
  {
    id: 'news-2',
    title: '제 2차 AI시대 대한민국 산업기술 인력 전략 포럼',
    date: '2026.05.02 (토) 오후3시',
    description: 'AI 시대의 도래에 따른 지역 산업기술 인력 양성 및 확보 전략을 논의하는 국회 포럼이 개최됩니다.',
    image: 'https://ais-dev-iu65vekjux2d4dgbghfdpn-304371246819.asia-northeast1.run.app/api/attachments/iu65vekjux2d4dgbghfdpn/input_file_1.png',
    category: '국회포럼',
    link: '#',
  },
  {
    id: 'news-3',
    title: '제 3차 전국 지점장 통합 워크숍 개최 안내',
    date: '2026.05.22 (금)',
    description: '전국 지점 간의 네트워크 강화와 성공 모델 공유를 위한 통합 워크숍이 진행될 예정입니다.',
    image: 'https://ais-dev-iu65vekjux2d4dgbghfdpn-304371246819.asia-northeast1.run.app/api/attachments/iu65vekjux2d4dgbghfdpn/input_file_2.png',
    category: '워크숍',
    link: '#',
  },
];

export const INITIAL_CONFIG: SiteConfig = {
  siteName: '전국지역산업기술협동조합',
  heroTitle: '정부지원 사업 기반의 지역 혁신, 미래를 여는 협동의 힘',
  heroSubtitle: '공공기관 에어컨청소·공기정화 우선구매 대상자 모집 - 정부 우선 구매 대상 비즈니스 모델과 함께 성장할 파트너를 찾습니다.',
  accentColor: '#8A2BE2',
  secondaryAccentColor: '#00D2FF',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0',
  logoUrl: '',
  logoInvert: true,
  backgroundColor: '#000000',
  backgroundOpacity: 0.4,
  overlayColor: '#000000',
  overlayOpacity: 0.6,
  fontSize: 16,
  fontWeight: '400',
  heroTitleSize: 80,
  heroTitleWeight: '900',
  heroSubtitleSize: 24,
  heroSubtitleWeight: '400',
  logoFontSize: 24,
  buttons: [
    { id: '1', label: '지점장 지원하기', link: '#recruit' },
    { id: '2', label: '사업모델 보기', link: '#business' },
  ],
  news: INITIAL_NEWS,
  phone: '1533-8516',
  email: 'pcs@itcoop.or.kr',
  address: '서울시 동작구 노량진로186',
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-S8Yp-p_Y_z-p_Y_z-p_Y_z-p_Y_z-p_Y_z-p_Y_z-p_Y_z/viewform',
  recruitmentButtonLabel: '지원서 작성하러 가기',
};
