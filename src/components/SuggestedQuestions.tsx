import { MessageCircleQuestion } from "lucide-react";

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const suggestions = [
  "Quer que eu resuma?",
  "Quer entender o impacto disso?",
  "Quer saber o que fazer agora?",
];

export function SuggestedQuestions({ onQuestionClick }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageCircleQuestion className="w-4 h-4" />
        <span className="text-sm font-medium">Perguntas sugeridas:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((question) => (
          <button
            key={question}
            onClick={() => onQuestionClick(question)}
            className="px-3 py-2 text-sm border-2 border-foreground hover:bg-accent transition-all"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
