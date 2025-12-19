interface DetailLevelSelectorProps {
  value: "short" | "standard" | "detailed";
  onChange: (level: "short" | "standard" | "detailed") => void;
}

const levels = [
  { value: "short" as const, label: "Curto" },
  { value: "standard" as const, label: "Padrão" },
  { value: "detailed" as const, label: "Detalhado" },
];

export function DetailLevelSelector({ value, onChange }: DetailLevelSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Nível de detalhe:</span>
      <div className="flex gap-1">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            className={`px-3 py-1.5 text-sm border-2 transition-all ${
              value === level.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-foreground hover:bg-accent"
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
