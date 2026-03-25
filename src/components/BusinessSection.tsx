import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { BusinessModel } from '../constants';

interface Props {
  models: BusinessModel[];
}

export default function BusinessSection({ models }: Props) {
  const [selectedModel, setSelectedModel] = useState<BusinessModel | null>(null);

  return (
    <section id="business" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 block"
        >
          Core Business Models
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          10대 핵심 사업 모델
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary max-w-2xl mx-auto text-lg"
        >
          전국지역산업기술협동조합은 AI와 빅데이터 기술을 기반으로 지역 사회의 문제를 해결하고 새로운 가치를 창출합니다.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model, index) => {
          const IconComponent = (Icons as any)[model.icon] || Icons.HelpCircle;
          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: (index % 3) * 0.1,
                ease: "easeOut"
              }}
              onClick={() => setSelectedModel(model)}
              whileHover={{ 
                y: -15,
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(138, 43, 226, 0.4)"
              }}
              className="glass-card p-8 group cursor-pointer border border-white/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative background glow on hover */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <motion.div 
                className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:rotate-6 transition-all duration-300"
                whileHover={{ rotate: 12, scale: 1.1 }}
              >
                <IconComponent className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors tracking-tight">
                {model.title}
              </h3>
              <p className="text-text-secondary leading-relaxed group-hover:text-white/80 transition-colors">
                {model.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-accent font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-sm">자세히 보기</span>
                <Icons.ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedModel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModel(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 blur-3xl rounded-full" />
              
              <button 
                onClick={() => setSelectedModel(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Icons.X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                  {React.createElement((Icons as any)[selectedModel.icon] || Icons.HelpCircle, { className: "w-8 h-8 text-white" })}
                </div>
                <div>
                  <h3 className="text-3xl font-bold tracking-tight">{selectedModel.title}</h3>
                  <p className="text-accent font-medium mt-1">핵심 비즈니스 모델</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-text-secondary font-bold mb-3">사업 개요</h4>
                  <p className="text-xl text-white/90 leading-relaxed">
                    {selectedModel.description}
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <h4 className="text-sm uppercase tracking-widest text-text-secondary font-bold mb-3">상세 설명</h4>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                    {selectedModel.detailedDescription || "상세 설명이 준비 중입니다."}
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <button 
                  onClick={() => {
                    setSelectedModel(null);
                    window.location.href = '#recruit';
                  }}
                  className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-accent/20"
                >
                  이 사업 모델로 지원하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
