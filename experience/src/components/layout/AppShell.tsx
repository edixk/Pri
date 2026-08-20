import { ErrorBoundary } from '../../app/ErrorBoundary';
import { content } from '../../data/content';
import { Introduction } from '../../features/introduction/Introduction';
import { InteractiveChick } from '../interactive/InteractiveChick';
import { InteractiveRose } from '../interactive/InteractiveRose';
import { AmbientBackground } from './AmbientBackground';
import firmaUrl from '../../../firma.svg';

export function AppShell() {
  return (
    <div className="app-shell relative overflow-x-clip">
      <AmbientBackground />

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
          </article>
        </main>

        <footer className="mt-12 pb-2 text-center">
          <p className="font-display italic text-sm leading-relaxed text-mid-300">
            {content.footer.text}
          </p>
          <img
            src={firmaUrl}
            alt=""
            aria-hidden="true"
            className="mx-auto mt-7 h-auto w-40 max-w-[70vw] select-none sm:w-48"
          />
          <p className="mt-7 font-display italic text-mid-300">{content.message.signature}</p>
        </footer>
      </div>

      <ErrorBoundary>
        <InteractiveChick />
      </ErrorBoundary>
    </div>
  );
}