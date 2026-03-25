import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface RecruitmentFormProps {
  googleFormUrl: string;
  buttonLabel: string;
}

export default function RecruitmentForm({ googleFormUrl, buttonLabel }: RecruitmentFormProps) {
  return (
    <section id="recruit" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">전국 지점장 모집</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          정부지원 사업 기반의 혁신적인 AI 비즈니스 모델과 함께 지역 산업을 이끌어갈 리더를 모십니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold text-accent">모집 핵심 포인트</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="font-bold">정부지원 사업 기반</p>
                  <p className="text-sm text-text-secondary">안정적인 정부 지원 사업을 기반으로 한 비즈니스 모델 제공</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="font-bold">정부 우선 구매 대상</p>
                  <p className="text-sm text-text-secondary">공공기관 에어컨 청소 및 공기정화 우선구매 대상자 선정 지원</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="font-bold">여성기업인 우대</p>
                  <p className="text-sm text-text-secondary">여성 기업인 가점 및 우대 혜택 적용</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-lg font-bold mb-4">문의처</h3>
            <p className="text-text-secondary text-sm">궁금하신 사항은 언제든 문의주세요.</p>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-text-secondary">대표번호:</span> 1533-8516</p>
              <p><span className="text-text-secondary">이메일:</span> pcs@itcoop.or.kr</p>
            </div>
          </div>
        </div>

        <motion.div 
          className="lg:col-span-2 glass-card p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-8"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
            <ExternalLink className="w-10 h-10 text-accent" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">온라인 지원서 작성</h3>
            <p className="text-text-secondary">
              아래 버튼을 클릭하여 구글 폼 지원서를 작성해 주세요.<br />
              작성해주신 내용은 담당자가 확인 후 개별 연락드립니다.
            </p>
          </div>

          <motion.a 
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-sm bg-accent hover:bg-accent-hover text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-accent/30 text-lg"
          >
            {buttonLabel}
            <ExternalLink className="w-5 h-5" />
          </motion.a>

          <p className="text-xs text-text-secondary">
            * 구글 계정 로그인이 필요할 수 있습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
