import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types for our Neural State
interface EEGSignal {
    alpha: number;
    beta: number;
    delta: number;
    theta: number;
    timestamp: number;
}

interface NeuralState {
    // Connection Status
    isConnected: boolean;
    signalQuality: number; // 0-100

    // Real-time Data
    currentFocus: number; // 0.0 - 1.0 (Derived from Beta/Alpha ratio)
    lastSignal: EEGSignal | null;

    // Interaction States
    isScanning: boolean;
    isAnchored: boolean;
    did: string | null;
    cid: string | null;

    // [NEW] Security Settings
    thresholdAmount: number;
    paranoidMode: boolean;

    // Actions
    connect: () => void;
    disconnect: () => void;
    updateSignal: (signal: EEGSignal) => void;
    setScanning: (status: boolean) => void;
    setAnchored: (cid: string) => void;
    // [NEW] Action to anchor proof with Transaction ID binding
    generateProof: (transactionId: string) => Promise<void>;
    reset: () => void;
    // [NEW] Security Actions
    setThreshold: (amount: number) => void;
    setParanoidMode: (enabled: boolean) => void;
}

export const useNeuralStore = create<NeuralState>()(
    devtools(
        (set) => ({
            isConnected: false,
            signalQuality: 0,
            currentFocus: 0,
            lastSignal: null,
            isScanning: false,
            isAnchored: false,
            did: null,
            cid: null,

            // Defaults
            thresholdAmount: 500,
            paranoidMode: false,

            connect: () => set({ isConnected: true, signalQuality: 100 }),

            disconnect: () => set({
                isConnected: false,
                signalQuality: 0,
                currentFocus: 0
            }),

            updateSignal: (signal) => set((state) => {
                // Calculate focus score: (Beta / Alpha) normalized
                // Simplified "Concentration" metric
                const rawFocus = (signal.beta / (signal.alpha + 0.1));
                const normalizedFocus = Math.min(Math.max(rawFocus / 2, 0), 1);

                return {
                    lastSignal: signal,
                    currentFocus: normalizedFocus
                };
            }),

            setScanning: (status) => set({ isScanning: status }),

            setAnchored: (cid) => set({
                isAnchored: true,
                cid,
                isScanning: false
            }),

            // Bio-Settlement Stage 2: The Anchor (High Fidelity Simulation)
            generateProof: async (transactionId: string) => {
                set({ isScanning: true });

                // 1. Snapshot the Bio-Stream (Mocking the Python Ingest)
                // "The Brain" Logic: Bandpass -> FFT -> Peak Freq
                const timestamp = Date.now();
                const peakFreq = (Math.random() * (30 - 13) + 13).toFixed(4); // Beta Peak (13-30Hz)
                const deviceID = "BCI-HEADSET-X9";

                // 2. Local Hashing (Privacy Layer)
                // NeuralHash = SHA-256(PeakFreq + Timestamp + DeviceID)
                const payload = `${peakFreq}|${timestamp}|${deviceID}`;

                // Using Web Crypto API for real SHA-256 in browser
                const msgBuffer = new TextEncoder().encode(payload);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const neuralHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

                console.log("[BIO-EXTRACT] Peak Freq:", peakFreq, "Hz");
                console.log("[PRIVACY] Generated Neural Hash:", neuralHash);

                // 3. Upload to Lighthouse (The Anchor)
                // "The Truth" Logic: Pinning the Hash + Transaction ID Binding
                const { uploadNeuralHash } = await import('@/lib/lighthouse');

                // Simulate Network Latency (The "Handshake")
                await new Promise(resolve => setTimeout(resolve, 1500));

                const cid = await uploadNeuralHash({
                    hash: neuralHash,
                    timestamp: timestamp,
                    transactionId: transactionId, // [BLUEPRINT] Metadata Binding
                    intent: "RELEASE_FUNDS",
                    contract: "LazarusGuard.cdc"
                });

                if (cid) {
                    console.log("[ANCHOR] Proof Pinned to Filecoin:", cid);
                    set({ isAnchored: true, cid, isScanning: false });
                } else {
                    console.error("[ANCHOR] Failed to pin proof");
                    set({ isScanning: false });
                }
            },

            reset: () => set({
                isScanning: false,
                isAnchored: false,
                cid: null,
                currentFocus: 0
            }),

            setThreshold: (amount: number) => set({ thresholdAmount: amount }),
            setParanoidMode: (enabled: boolean) => set({ paranoidMode: enabled })
        }),
        { name: 'NeuralStore' }
    )
);
