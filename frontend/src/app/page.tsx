"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PredictionForm from "@/components/PredictionForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import type { PlayerInput, PredictionResponse } from "@/lib/types";

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
