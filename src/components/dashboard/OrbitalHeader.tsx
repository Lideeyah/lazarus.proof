"use client";

import { ShieldCheck, Wallet } from "lucide-react";
import { Waveform } from "../neural/Waveform";
import { motion } from "framer-motion";
import { CoreState } from "@/lib/types";

interface OrbitalHeaderProps {
    state: CoreState;
}

export const OrbitalHeader = ({ state }: OrbitalHeaderProps) => {
    const isActive = state !== "LOCKED";

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 glass-panel rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto"
        >
            <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-lazarus-cyan" />
                <span className="font-mono font-bold tracking-widest text-sm text-white">
                    LAZARUS <span className="text-lazarus-cyan">{"//"}</span> PROOF
                </span>
            </div>

            <div className="flex items-center gap-4">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? "text-lazarus-cyan animate-pulse" : "text-gray-400"}`}>
                    {state === "PROPOSAL_RECEIVED" ? "CIRCUIT BREAKER: AWAITING_BIO_PROOF" :
                        state === "HOLDING" ? "CIRCUIT BREAKER: VERIFYING..." :
                            state === "EXECUTED" || state === "RECEIPT" ? "CIRCUIT BREAKER: CLOSED" :
                                "NEURAL LINK: STANDBY"}
                </span>
                <Waveform />
            </div>

            <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                <Wallet className="w-4 h-4 text-lazarus-amber" />
                <span className="font-mono text-xs text-lazarus-amber">
                    0x123...abc
                </span>
            </div>
        </motion.header>
    );
};
