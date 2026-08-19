import { ErrorBoundary } from '../../app/ErrorBoundary';
import { content } from '../../data/content';
import { DiscoverableHost } from '../../features/discoveries/DiscoverableHost';
import { Introduction } from '../../features/introduction/Introduction';
import { MessageCenter } from '../../features/messages/MessageCenter';
import { InteractiveChick } from '../interactive/InteractiveChick';
import { InteractiveRose } from '../interactive/InteractiveRose';
import { AmbientBackground } from './AmbientBackground';

export function AppShell() {
  return (
    <div className="app-shell relative overflow-x-clip">
      <AmbientBackground />
      <DiscoverableHost />

      <div className="content-safe relative z-10 mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 sm:px-8">
        <header>
          <Introduction />
        </header>

        <main className="flex flex-1 flex-col items-center justify-center gap-10">
          <ErrorBoundary>
            <InteractiveRose />
          </ErrorBoundary>

          <article className="max-w-xl text-center">
            {content.message.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-display text-lg italic leading-relaxed text-mid-100 sm:text-xl"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-5 font-display italic text-mid-300">{content.message.signature}</p>
          </article>

          <ErrorBoundary>
            <MessageCenter />
          </ErrorBoundary>
        </main>

        <footer className="mt-8 text-center text-xs text-mid-300/80">
          <p>{content.footer.text}</p>
        </footer>
      </div>

      <ErrorBoundary>
        <InteractiveChick />
      </ErrorBoundary>
    </div>
  );
}