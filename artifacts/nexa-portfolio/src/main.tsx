import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

// Register all GSAP plugins globally before any component mounts
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

// Register the cinematic ease
CustomEase.create('cinematic', 'M0,0 C0.2,0 0.15,1 1,1');

import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
