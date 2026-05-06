"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, ShieldCheck, Lightbulb } from "lucide-react";
import PredictionForm from "@/components/PredictionForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import type { PlayerInput, PredictionResponse } from "@/lib/types";

const CHURN_CARDS = [
  {
    icon: TrendingDown,
    title: "What is Churn?",
    description:
      "Player churn occurs when a gamer stops playing or uninstalls a game. It's one of the biggest challenges in the gaming industry — acquiring new players costs 5-7× more than retaining existing ones.",
    color: "text-risk-high",
    bgColor: "bg-risk-high/10",
    borderColor: "hover:border-risk-high/30",
  },
  {
    icon: ShieldCheck,
    title: "Why Predict It?",
    description:
      "By identifying at-risk players before they leave, game studios can intervene with personalised offers, difficulty adjustments, or social features — turning potential churners into loyal fans.",
    color: "text-risk-medium",
    bgColor: "bg-risk-medium/10",
    borderColor: "hover:border-risk-medium/30",
  },
  {
    icon: Lightbulb,
    title: "How ChurnGuard Helps",
    description:
      "Our ML model analyses 15 behavioural features — from session frequency to in-app purchases — to produce a churn probability score and actionable, tailored retention recommendations.",
    color: "text-risk-low",
    bgColor: "bg-risk-low/10",
    borderColor: "hover:border-risk-low/30",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function HomePage() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastPlayerData, setLastPlayerData] = useState<PlayerInput | null>(null);

  return (
    <div className="space-y-10 pb-16 pt-4">
      {/* ── Hero Heading ── */}
      <section className="relative text-center">
        <div className="hero-glow pointer-events-none absolute inset-0 -top-20" />

        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Predict <span className="gradient-text">Player Churn</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-3 max-w-xl text-gray-400"
        >
          Enter player behaviour data below and our ML model will predict the
          likelihood of churn along with tailored recommendations.
        </motion.p>
      </section>

      {/* ── What is Churn Prediction? ── */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="section-heading mb-2 text-center text-2xl sm:text-3xl"
        >
          What is <span className="gradient-text">Churn Prediction</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="mx-auto mb-8 max-w-2xl text-center text-gray-400"
        >
          Churn prediction uses machine learning to forecast which players are
          likely to stop engaging with a game. By analysing historical
          behavioural patterns — play time, session frequency, purchase history
          and more — the model flags at-risk players so studios can act before
          it&apos;s too late.
        </motion.p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHURN_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className={`glass-card group flex flex-col items-start gap-4 ${card.borderColor}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bgColor} ${card.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <card.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Prediction Form & Results ── */}
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <PredictionForm
            onResult={setResult}
            onPlayerSubmit={setLastPlayerData}
            loading={loading}
            setLoading={setLoading}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="lg:sticky lg:top-24"
        >
          <ResultsDisplay
            result={result}
            loading={loading}
            playerData={lastPlayerData}
          />
        </motion.div>
      </div>
    </div>
  );
}
