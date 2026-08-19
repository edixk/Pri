import { CompletionBadge } from '../../components/feedback/CompletionBadge';
import { MessageReveal } from '../../components/message/MessageReveal';

export function MessageCenter() {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <MessageReveal />
      <div className="flex min-h-11 items-center">
        <CompletionBadge />
      </div>
    </div>
  );
}