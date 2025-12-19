import { useState, useEffect } from "react";
import { NameInput } from "@/components/NameInput";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResult } from "@/components/AnalysisResult";
import { toast } from "sonner";

type AppStep = "name" | "upload" | "result";

const Index = () => {
  const [step, setStep] = useState<AppStep>("name");
  const [userName, setUserName] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check for saved name in localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("explicaai_username");
    if (savedName) {
      setUserName(savedName);
      setStep("upload");
    }
  }, []);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    localStorage.setItem("explicaai_username", name);
    setStep("upload");
  };

  const handleAnalyze = async (image: File, context?: string) => {
    setIsLoading(true);
    setImagePreview(URL.createObjectURL(image));

    try {
      // Convert image to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          // Remove the data:image/xxx;base64, prefix
          const base64 = result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(image);
      const imageBase64 = await base64Promise;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            imageBase64,
            mimeType: image.type,
            userContext: context,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao analisar imagem");
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);
      setStep("result");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao analisar imagem");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult("");
    setImagePreview("");
    setStep("upload");
  };

  return (
    <>
      {step === "name" && <NameInput onSubmit={handleNameSubmit} />}
      {step === "upload" && (
        <ImageUpload
          userName={userName}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />
      )}
      {step === "result" && (
        <AnalysisResult
          userName={userName}
          result={analysisResult}
          imagePreview={imagePreview}
          onReset={handleReset}
        />
      )}
    </>
  );
};

export default Index;
