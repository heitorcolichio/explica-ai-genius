import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw, Globe } from "lucide-react";
import { toast } from "sonner";
import { SuggestedQuestions } from "./SuggestedQuestions";

interface AnalysisResultProps {
  userName: string;
  result: string;
  quickSummary: string;
  imagePreview: string;
  onReset: () => void;
  onFollowUp: (question: string) => void;
}

const LANGUAGES = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

export function AnalysisResult({ userName, result, quickSummary, imagePreview, onReset, onFollowUp }: AnalysisResultProps) {
  const [copied, setCopied] = useState(false);
  const [translatedResult, setTranslatedResult] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedResult || result);
      setCopied(true);
      toast.success("Resultado copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Erro ao copiar");
    }
  };

  const handleTranslate = async (langCode: string) => {
    if (langCode === selectedLanguage) return;
    
    setIsTranslating(true);
    setSelectedLanguage(langCode);
    // Reset translated result before new translation to avoid mixing languages
    setTranslatedResult(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          // Always translate from original result, not from previously translated text
          text: result,
          targetLanguage: langCode,
        }),
      });

      if (!response.ok) throw new Error("Translation failed");

      const data = await response.json();
      setTranslatedResult(data.translatedText);
    } catch {
      toast.error("Erro ao traduzir");
      setSelectedLanguage(null);
    } finally {
      setIsTranslating(false);
    }
  };

  const displayResult = translatedResult || result;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Olá, {userName}!
          </h1>
          <p className="text-muted-foreground">
            Aqui está a análise da sua imagem.
          </p>
        </header>

        <div className="border-2 border-foreground p-4">
          <img
            src={imagePreview}
            alt="Imagem analisada"
            className="max-h-48 mx-auto object-contain"
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">Traduzir para:</span>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleTranslate(lang.code)}
                disabled={isTranslating}
                className={`px-3 py-1 text-sm border-2 transition-all ${
                  selectedLanguage === lang.code
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-foreground hover:bg-accent"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {isTranslating && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Traduzindo...</span>
            </div>
          )}
        </div>

        {/* Quick Summary */}
        {quickSummary && (
          <div className="border-2 border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-primary mb-1">📋 Resumo rápido</p>
            <p className="text-sm">{quickSummary}</p>
          </div>
        )}

        <div className="border-2 border-foreground bg-card">
          <div className="border-b-2 border-foreground p-4 flex items-center justify-between">
            <h2 className="font-bold text-lg">Resultado da Análise</h2>
          </div>
          <div className="p-6">
            <div className="prose prose-sm max-w-none whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {displayResult}
            </div>
          </div>
        </div>

        {/* Suggested Questions */}
        <SuggestedQuestions onQuestionClick={onFollowUp} />

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="lg"
            className="flex-1 h-12 text-base font-semibold border-2"
          >
            {copied ? (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Copiado!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Copy className="w-5 h-5" />
                Copiar resultado
              </span>
            )}
          </Button>

          <Button
            onClick={onReset}
            size="lg"
            className="flex-1 h-12 text-base font-semibold shadow-sm hover:shadow-md transition-all"
          >
            <span className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Analisar outra imagem
            </span>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          As imagens enviadas não são armazenadas.
        </p>
      </div>
    </div>
  );
}
