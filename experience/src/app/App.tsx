import { MotionConfig } from 'framer-motion';

import { ExperienceProvider } from './ExperienceProvider';
import { AppShell } from '../components/layout/AppShell';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ExperienceProvider>
        <AppShell />
      </ExperienceProvider>
    </MotionConfig>
  );
}