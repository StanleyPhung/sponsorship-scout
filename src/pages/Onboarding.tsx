import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Upload, Link, Brain, Sparkles, CheckCircle } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [videoLinks, setVideoLinks] = useState(["", "", ""]);
  const [quizAnswers, setQuizAnswers] = useState({
    goal: "",
    niche: "",
    comfort: ""
  });
  const navigate = useNavigate();

  const progress = (step / 4) * 100;

  const handleVideoLinkChange = (index: number, value: string) => {
    const newLinks = [...videoLinks];
    newLinks[index] = value;
    setVideoLinks(newLinks);
  };

  const renderStep1 = () => (
    <div className="text-center animate-slideUp">
      <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <Upload className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Share Your Best Content</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Paste links to 3-5 of your recent TikTok or Instagram videos so we can analyze your style
      </p>
      
      <div className="space-y-4 max-w-md mx-auto">
        {videoLinks.map((link, index) => (
          <div key={index}>
            <Label htmlFor={`video-${index}`}>Video {index + 1}</Label>
            <Input
              id={`video-${index}`}
              placeholder="https://www.tiktok.com/@username/video/..."
              value={link}
              onChange={(e) => handleVideoLinkChange(index, e.target.value)}
              className="mt-1"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="text-center animate-slideUp">
      <div className="w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6">
        <Brain className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Tell Us About You</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Help us understand your creator goals and style
      </p>
      
      <div className="space-y-6 max-w-lg mx-auto">
        <div>
          <Label className="text-base font-semibold">What's your main goal?</Label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {["Grow followers", "Make money", "Build brand", "Have fun"].map((goal) => (
              <Button
                key={goal}
                variant={quizAnswers.goal === goal ? "default" : "outline"}
                onClick={() => setQuizAnswers({...quizAnswers, goal})}
                className="h-12"
              >
                {goal}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold">What's your niche?</Label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {["Lifestyle", "Comedy", "Education", "Beauty"].map((niche) => (
              <Button
                key={niche}
                variant={quizAnswers.niche === niche ? "default" : "outline"}
                onClick={() => setQuizAnswers({...quizAnswers, niche})}
                className="h-12"
              >
                {niche}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold">Comfort level?</Label>
          <div className="grid grid-cols-1 gap-3 mt-3">
            {["Love being on camera", "Prefer voiceover only", "Product focused"].map((comfort) => (
              <Button
                key={comfort}
                variant={quizAnswers.comfort === comfort ? "default" : "outline"}
                onClick={() => setQuizAnswers({...quizAnswers, comfort})}
                className="h-12"
              >
                {comfort}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center animate-slideUp">
      <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-10 h-10 text-white animate-glow" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Analyzing Your Creator Style</h2>
      <p className="text-muted-foreground mb-8">
        We're analyzing your content, finding trends, and building your personalized creator profile...
      </p>
      
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-success" />
          <span>Analyzing video style and trends</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-success" />
          <span>Identifying your creator persona</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Building sponsorship roadmap</span>
        </div>
      </div>
      
      <div className="mt-8">
        <Progress value={85} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">Almost done...</p>
      </div>
    </div>
  );

  const canProceed = () => {
    if (step === 1) return videoLinks.some(link => link.trim());
    if (step === 2) return quizAnswers.goal && quizAnswers.niche && quizAnswers.comfort;
    return true;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Progress value={progress} className="h-2 mb-4" />
            <p className="text-sm text-muted-foreground">Step {step} of 4</p>
          </div>

          <Card className="p-8 shadow-soft">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </Card>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-primary hover:opacity-90"
            >
              {step === 3 ? "Almost Ready..." : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;