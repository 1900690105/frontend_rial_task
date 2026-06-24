"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function TeaCupAnimation() {
  return (
    <div className="relative flex h-[300px] items-center justify-center overflow-hidden">
      {/* Cup */}
      <motion.div
        initial={{
          y: -400,
          rotate: -8,
          opacity: 0,
        }}
        animate={{
          y: 0,
          rotate: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            delay: 1.1,
            duration: 0.4,
          }}
        >
          <Image
            src="/hero.png"
            alt="Tea Cup"
            width={220}
            height={220}
            priority
          />
        </motion.div>
      </motion.div>

      {/* Steam */}
      <motion.div
        className="absolute -top-4"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: [0, 1, 0.8],
          y: [-10, -40, -70],
        }}
        transition={{
          delay: 1.4,
          duration: 2,
        }}
      >
        <div className="flex gap-2">
          <div className="h-20 w-3 rounded-full bg-white/50 blur-sm" />
          <div className="h-24 w-3 rounded-full bg-white/50 blur-sm" />
          <div className="h-20 w-3 rounded-full bg-white/50 blur-sm" />
        </div>
      </motion.div>
    </div>
  );
}
