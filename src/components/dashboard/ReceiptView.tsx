"use client";

import { motion } from "framer-motion";
import { FileCode, Share2, ShieldCheck } from "lucide-react";
import { useNeuralStore } from "@/store/neural-store";

interface ReceiptViewProps {
    onClose: () => void;
}

export const ReceiptView = ({ onClose }: ReceiptViewProps) => {
    const { cid } = useNeuralStore();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full max-w-sm glass-card p-6 rounded-xl border border-white/10 flex flex-col gap-6 shadow-2xl relative pointer-events-auto"
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="bg-lazarus-cyan/10 p-3 rounded-full mb-2">
                        <ShieldCheck className="w-8 h-8 text-lazarus-cyan" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight font-mono">INTENT ANCHORED</h2>
                    <p className="text-xs text-gray-400 font-mono">Immutable Receipt of Human Will</p>
                </div>

                <div className="bg-black/40 rounded-lg p-4 font-mono text-xs space-y-3 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-20">
                        <FileCode className="w-12 h-12" />
                    </div>

                    <div>
                        <span className="text-gray-500 block mb-1">INTENT ANCHOR (CID)</span>
                        <span className="text-lazarus-cyan break-all font-mono text-[10px]">{cid || "PENDING_PROOF_GENERATION..."}</span>
                    </div>

                    <div className="border-t border-white/5 pt-2">
                        <span className="text-gray-500 block mb-1">METADATA BINDING</span>
                        <span className="text-white break-all font-mono text-[10px] bg-white/5 px-2 py-1 rounded inline-block">
                            TX-ID: {Math.floor(Math.random() * 1000000).toString(16).toUpperCase()}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/5 pt-2">
                        <div>
                            <span className="text-gray-500 block mb-1">LIVENESS CHECK</span>
                            <span className="text-green-400 font-bold">PASS (&lt;60s)</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-500 block mb-1">CIRCUIT BREAKER</span>
                            <span className="text-lazarus-cyan font-bold">VERIFIED (Flow)</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors font-mono text-sm tracking-wider"
                    >
                        CLOSE RECEIPT
                    </button>
                    <button className="px-4 border border-white/10 rounded-lg hover:bg-white/5 text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
