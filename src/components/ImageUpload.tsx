import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { DetailLevelSelector } from "./DetailLevelSelector";

type DetailLevel = "short" | "standard" | "detailed";

interface ImageUploadProps {
  userName: string;
  onAnalyze: (image: File, context?: string, level?: DetailLevel) => void;
  isLoading: boolean;
  detailLevel: DetailLevel;
  onDetailLevelChange: (level: DetailLevel) => void;
}

export function ImageUpload({ userName, onAnalyze, isLoading, detailLevel, onDetailLevelChange }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onAnalyze(selectedImage, context || undefined, detailLevel);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Olá, {userName}!
          </h1>
          <p className="text-muted-foreground">
            Envie uma imagem para receber uma análise completa.
          </p>
        </header>

        <div className="space-y-6">
          {/* Detail Level Selector */}
          <DetailLevelSelector value={detailLevel} onChange={onDetailLevelChange} />

          <div className="space-y-3">
            <label className="text-sm font-medium block">
              O que você quer saber dessa imagem? (opcional)
            </label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Explique esse erro, Resuma esse documento, Diga o que significa esse aviso..."
              className="resize-none border-2 min-h-[80px]"
              disabled={isLoading}
            />
          </div>

          <div
            className={`relative border-2 border-dashed transition-all ${
              selectedImage ? "border-primary" : "border-muted-foreground/30 hover:border-primary/50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />

            {previewUrl ? (
              <div className="relative p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearImage();
                  }}
                  className="absolute top-2 right-2 p-2 bg-background border-2 border-foreground hover:bg-accent transition-colors z-10"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </button>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 mx-auto object-contain"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-16 h-16 border-2 border-foreground flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <p className="font-medium mb-1">Arraste uma imagem aqui</p>
                <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full h-14 text-lg font-semibold shadow-sm hover:shadow-md transition-all"
            disabled={!selectedImage || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Analisando a imagem...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Upload className="w-5 h-5" />
                Enviar imagem para análise
              </span>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          As imagens enviadas não são armazenadas.
        </p>
      </div>
    </div>
  );
}
