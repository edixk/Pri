import type { Message } from '../../types/message';

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  const isCompletion = message.kind === 'completion';

  return (
    <div
      className={`rounded-2xl border px-5 py-4 text-center shadow-sm ${
        isCompletion
          ? 'border-gold/30 bg-gold/10 text-gold'
          : 'border-mid-100/10 bg-night-900/60 text-mid-100'
      }`}
    >
      <p className="font-display text-base italic leading-relaxed sm:text-lg">{message.text}</p>
    </div>
  );
}