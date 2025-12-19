import { MessageCircleQuestion, Loader2 } from "lucide-react";

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
  isLoading?: boolean;
}

const suggestions = [
  "Quer que eu resuma?",
  "Quer entender o impacto disso?",
  "Quer saber o que fazer agora?",
];

export function SuggestedQuestions({ onQuestionClick, isLoading }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageCircleQuestion className="w-4 h-4" />
        <span className="text-sm font-medium">Perguntas sugeridas:</span>
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((question) => (
          <button
            key={question}
            onClick={() => onQuestionClick(question)}
            disabled={isLoading}
            className="px-3 py-2 text-sm border-2 border-foreground hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
