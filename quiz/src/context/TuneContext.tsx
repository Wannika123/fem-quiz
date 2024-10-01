'use client'

import { createContext, useEffect, useState } from "react";

const Gb = 185.838;
const A = 221;
const Bb = 234.141;
const C = 262.815;     // middle C
const Db = 278.443;
const D = 295;
const Eb = 312.541;
const E = 331.126;
const F = 350.816;
const G = 393.777;

const fastBeat = 0.5;
const slowBeat = 1;

const TuneContext = createContext({
    correctAnswerTune: () => {},
    wrongAnswerTune: () => {},
    celebratingTune: () => {}, 
    mourningTune: () => {}
})

const TuneProvider = ({ children }: {
    children: React.ReactNode
}) => {
    console.log('context')

    const [actx, setActx] = useState<AudioContext | null>(null);

    let out: AudioDestinationNode;
    if (actx) {
        out = actx.destination;
    }
     
    const correctAnswerTune = () => {
        if (!actx) {
            return;
        }
        const time = actx.currentTime;
        const osc = actx.createOscillator();
        const gainNode = actx.createGain()

        osc.frequency.value = A;
        gainNode.gain.value = 0.2;
        osc.connect(gainNode);
        gainNode.connect(out);

        const sixteenth = fastBeat / 4;

        osc.start(time + sixteenth);
        osc.frequency.setValueAtTime(Bb, time + (sixteenth * 2));
        osc.frequency.setValueAtTime(C, time + (sixteenth * 3));
        osc.frequency.setValueAtTime(F, time + (sixteenth * 4));
        osc.stop(time + (fastBeat * 2));
    }

    const wrongAnswerTune = () => {
        if (!actx) {
            return;
        }
        const osc1 = actx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.value = Eb / 2;

        const osc2 = actx.createOscillator();
        osc2.type = 'sawtooth'
        osc2.frequency.value = A;

        const gain1 = actx.createGain();
        gain1.gain.value = 0.05;
        const gain2 = actx.createGain();
        gain2.gain.value = 0.05;

        const merger = actx.createChannelMerger(2);

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(merger, 0, 0);
        gain2.connect(merger, 0, 1);
        merger.connect(out);
        
        osc1.start();
        osc2.start();
        osc1.stop(actx.currentTime + 0.5);
        osc2.stop(actx.currentTime + 0.5);
    }

    const celebratingTune = () => {
        if (!actx) {
            return;
        }
        const time = actx.currentTime;

        const bass = actx.createOscillator();
        bass.frequency.value = F / 2;
        const tenor = actx.createOscillator();
        tenor.frequency.value = A;
        const alto = actx.createOscillator();
        alto.frequency.value = C;
        const soprano = actx.createOscillator();
        soprano.frequency.value = A;   // start at pick-up

        const bassGain = actx.createGain();
        bassGain.gain.value = 0.23;
        const tenorGain = actx.createGain();
        tenorGain.gain.value = 0.23;
        const altoGain = actx.createGain();
        altoGain.gain.value = 0.23;
        const sopranoGain = actx.createGain();
        sopranoGain.gain.value = 0.23;

        const merger = actx.createChannelMerger(4);
        merger.connect(out);

        const sixteenth = fastBeat / 4;

        bass.connect(bassGain);
        bassGain.connect(merger, 0, 0);
        bass.start(time + fastBeat);
        bass.frequency.setValueAtTime(Bb / 2, time + (fastBeat * 2));
        bass.frequency.setValueAtTime(C / 2, time + (fastBeat * 3));
        bass.frequency.setValueAtTime(D / 2, time + ((fastBeat * 3) + (sixteenth * 2)));
        bass.frequency.setValueAtTime(E / 2, time + ((fastBeat * 3) + (sixteenth * 3)));
        bass.frequency.setValueAtTime(F / 2, time + (fastBeat * 4));
        bass.stop(time + (fastBeat * 5));       

        tenor.connect(tenorGain);
        tenorGain.connect(merger, 0, 1);
        tenor.start(time + fastBeat);
        tenor.frequency.setValueAtTime(Bb, time + (fastBeat * 2));
        tenor.frequency.setValueAtTime(Bb, time + (fastBeat * 3));
        tenor.frequency.setValueAtTime(A, time + (fastBeat * 4));
        tenor.stop(time + (fastBeat * 5));

        alto.connect(altoGain);
        altoGain.connect(merger, 0, 2);
        alto.start(time + fastBeat);
        alto.frequency.setValueAtTime(A, time + (fastBeat + sixteenth));
        alto.frequency.setValueAtTime(Bb, time + (fastBeat + (sixteenth * 2)));
        alto.frequency.setValueAtTime(C, time + (fastBeat + (sixteenth * 3)));
        alto.frequency.setValueAtTime(D, time + (fastBeat * 2));
        alto.frequency.setValueAtTime(E, time + (fastBeat * 3));
        alto.frequency.setValueAtTime(F, time + (fastBeat * 4));
        alto.stop(time + (fastBeat * 5));

        soprano.connect(sopranoGain);
        sopranoGain.connect(merger, 0, 3);
        soprano.start(time + sixteenth);
        soprano.frequency.setValueAtTime(Bb, time + (sixteenth * 2));
        soprano.frequency.setValueAtTime(C, time + (sixteenth * 3));
        soprano.frequency.setValueAtTime(F, time + (sixteenth * 4));
        soprano.frequency.setValueAtTime(C, time + ((fastBeat * 2) + sixteenth));
        soprano.frequency.setValueAtTime(E, time + ((fastBeat * 2) + (sixteenth * 2)));
        soprano.frequency.setValueAtTime(F, time + ((fastBeat * 2) + (sixteenth * 3)));
        soprano.frequency.setValueAtTime(G, time + (fastBeat * 3));
        soprano.frequency.setValueAtTime(A * 2, time + ((fastBeat * 3) + (sixteenth * 3)));
        soprano.frequency.setValueAtTime(F, time + (fastBeat * 4));
        soprano.stop(time + (fastBeat * 5));
    }

    const mourningTune = () => {
        if (!actx) {
            return;
        }
        const time = actx.currentTime;

        const bass = actx.createOscillator();
        bass.frequency.value = Gb / 2;
        bass.type = 'sawtooth';
        const tenor = actx.createOscillator();
        tenor.frequency.value = Eb / 2;     // start at pick-up
        tenor.type = 'sawtooth';
        const alto = actx.createOscillator();
        alto.frequency.value = Gb;
        alto.type = 'sawtooth';
        const soprano = actx.createOscillator();
        soprano.frequency.value = A;       // start at pick-up
        soprano.type = 'sawtooth';

        const bassGain = actx.createGain();
        bassGain.gain.value = 0.05;
        const tenorGain = actx.createGain();
        tenorGain.gain.value = 0.05;
        const altoGain = actx.createGain();
        altoGain.gain.value = 0.05;
        const sopranoGain = actx.createGain();
        sopranoGain.gain.value = 0.05;

        const merger = actx.createChannelMerger(4);
  
        bass.connect(bassGain);
        bassGain.connect(merger, 0, 0);
        tenor.connect(tenorGain);
        tenorGain.connect(merger, 0, 1);
        alto.connect(tenorGain);
        altoGain.connect(merger, 0, 2);
        soprano.connect(tenorGain);
        sopranoGain.connect(merger, 0, 3);      
        merger.connect(out);

        bass.start(time + slowBeat);
        bass.frequency.setValueAtTime(F / 4, time + (slowBeat * 4));
        bass.frequency.setValueAtTime(Bb / 2, time + (slowBeat * 7));
        bass.stop(time + (slowBeat * 9));

        tenor.start(time);
        tenor.frequency.setValueAtTime(Db / 2, time + slowBeat);
        tenor.frequency.setValueAtTime(Gb, time + (slowBeat * 3));
        tenor.frequency.setValueAtTime(Eb / 2, time + (slowBeat * 4));
        tenor.frequency.setValueAtTime(C / 2, time + (slowBeat * 6));
        tenor.frequency.setValueAtTime(Bb / 2, time + (slowBeat * 7));
        tenor.stop(time + (slowBeat * 9));

        alto.start(time + slowBeat);
        alto.frequency.setValueAtTime(A, time + (slowBeat * 4));
        alto.frequency.setValueAtTime(Bb, time + (slowBeat * 7));
        alto.stop(time + (slowBeat * 9));

        soprano.start(time);
        soprano.frequency.setValueAtTime(Bb, time + slowBeat);
        soprano.frequency.setValueAtTime(C, time + (slowBeat * 3));
        soprano.frequency.setValueAtTime(Db, time + (slowBeat * 4));
        soprano.frequency.setValueAtTime(Eb, time + (slowBeat * 6));
        soprano.frequency.setValueAtTime(F, time + (slowBeat * 7));
        soprano.stop(time + (slowBeat * 9));
    }

    useEffect(() => {
        console.log('effect context')
        setActx(new AudioContext())
    }, [])

    return (
        <TuneContext.Provider 
            value={{ correctAnswerTune, wrongAnswerTune, celebratingTune, mourningTune }}
        >
            {children}
        </TuneContext.Provider>
    )
}

export { TuneContext, TuneProvider }