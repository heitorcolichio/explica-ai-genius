import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            ExplicaAí
          </h1>
          <p className="text-muted-foreground text-lg">
            Análise inteligente de imagens com IA
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-lg font-medium block">
              Antes de começar, qual é o seu nome?
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="h-14 text-lg border-2"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg font-semibold shadow-sm hover:shadow-md transition-all"
            disabled={!name.trim()}
          >
            Continuar
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          As imagens enviadas não são armazenadas.
        </p>
      </div>
    </div>
  );
}
