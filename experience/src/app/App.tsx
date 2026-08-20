import { MotionConfig } from 'framer-motion';

import { ExperienceProvider } from './ExperienceProvider';
import { AppShell } from '../components/layout/AppShell';
import { Cover } from '../components/cover/Cover';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ExperienceProvider>
        <AppShell />
        <Cover />
      </ExperienceProvider>
    </MotionConfig>
  );
}