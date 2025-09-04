import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ArrowUp, Users, Trophy } from "lucide-react";

interface ProgressionLadderProps {
  progression: {
    currentStage: string;
    currentFollowers: number;
    nextStage: string;
    nextMilestone: number;
    pathways: string[];
  };
}

export const ProgressionLadder = ({ progression }: ProgressionLadderProps) => {
  const stages = [
    { name: "Starter", range: "0-100", followers: 100, color: "text-muted-foreground" },
    { name: "Emerging Creator", range: "100-1K", followers: 1000, color: "text-primary", current: true },
    { name: "Niche Builder", range: "1K-5K", followers: 5000, color: "text-success" },
    { name: "Rising Star", range: "5K-25K", followers: 25000, color: "text-warning" },
    { name: "Brand Partner", range: "25K+", followers: 50000, color: "text-purple-600" }
  ];

  const progressToNext = (progression.currentFollowers / progression.nextMilestone) * 100;
  
  return (
    <Card className="p-6 shadow-soft bg-gradient-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ArrowUp className="w-5 h-5 text-success" />
        Your Creator Journey
      </h3>

      {/* Current Progress */}
      <div className="mb-6 p-4 bg-gradient-primary rounded-lg text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-90">Progress to {progression.nextStage}</span>
          <span className="font-semibold">{progression.currentFollowers}/{progression.nextMilestone}</span>
        </div>
        <Progress value={progressToNext} className="h-2 bg-white/20" />
        <p className="text-sm opacity-90 mt-2">{Math.round(progressToNext)}% complete</p>
      </div>

      {/* Progression Stages */}
      <div className="space-y-3 mb-6">
        {stages.map((stage, index) => {
          const isCurrent = stage.current;
          const isCompleted = progression.currentFollowers >= stage.followers;
          const isNext = !isCompleted && !isCurrent && index === stages.findIndex(s => s.current) + 1;
          
          return (
            <div key={stage.name} className={`flex items-center gap-3 p-3 rounded-lg ${
              isCurrent ? 'bg-primary/10 border border-primary/20' : 
              isCompleted ? 'bg-success/10' : 'bg-muted/30'
            }`}>
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full bg-primary animate-pulse" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                    {stage.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{stage.range}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Steps */}
      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-warning" />
          Your Path Forward
        </h4>
        <div className="space-y-2">
          {progression.pathways.map((pathway, index) => (
            <div key={index} className="flex items-center gap-2 text-sm p-2 bg-accent/30 rounded">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>{pathway}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};