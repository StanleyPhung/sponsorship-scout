import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Target } from "lucide-react";

interface PersonaProfileProps {
  persona: {
    type: string;
    icon: string;
    strengths: string[];
    improvements: string[];
  };
}

export const PersonaProfile = ({ persona }: PersonaProfileProps) => {
  return (
    <Card className="p-6 shadow-soft bg-gradient-card">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl shadow-glow">
          {persona.icon}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">You are: {persona.type}</h2>
          <p className="text-muted-foreground">
            Your authentic teaching style and clear communication make complex topics accessible and engaging.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-success">
            <TrendingUp className="w-4 h-4" />
            Your Strengths
          </h3>
          <div className="space-y-2">
            {persona.strengths.map((strength, index) => (
              <Badge key={index} variant="outline" className="bg-success/10 text-success border-success/30 w-full justify-start">
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-warning">
            <Target className="w-4 h-4" />
            Growth Areas
          </h3>
          <div className="space-y-2">
            {persona.improvements.map((improvement, index) => (
              <Badge key={index} variant="outline" className="bg-warning/10 text-warning border-warning/30 w-full justify-start">
                {improvement}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-accent/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-sm">Persona Match Score</h4>
            <p className="text-xs text-muted-foreground">How well you're leveraging your archetype</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">87%</div>
            <div className="text-xs text-success">Excellent!</div>
          </div>
        </div>
      </div>

      <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
        <User className="w-4 h-4 mr-2" />
        Refine My Persona
      </Button>
    </Card>
  );
};