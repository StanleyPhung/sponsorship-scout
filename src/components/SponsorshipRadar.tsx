import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Circle, Zap, TrendingUp, Users, Award } from "lucide-react";

interface SponsorshipRadarProps {
  score: number;
}

export const SponsorshipRadar = ({ score }: SponsorshipRadarProps) => {
  const milestones = [
    {
      name: "Post Consistently",
      description: "3 videos per week for 2 weeks",
      completed: true,
      points: 15
    },
    {
      name: "Hit 1K Followers",
      description: "150 followers to go",
      completed: false,
      points: 20,
      current: true
    },
    {
      name: "Create Media Kit",
      description: "Professional brand presentation",
      completed: false,
      points: 15
    },
    {
      name: "Brand-Style Content",
      description: "Post 3 sponsor-ready videos",
      completed: false,
      points: 25
    },
    {
      name: "Engagement Rate 5%+",
      description: "Currently at 3.2%",
      completed: false,
      points: 25
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-muted-foreground";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 70) return "Brand Ready!";
    if (score >= 40) return "Almost There";
    return "Building Foundation";
  };

  const completedMilestones = milestones.filter(m => m.completed);
  const totalPossiblePoints = milestones.reduce((sum, m) => sum + m.points, 0);

  return (
    <Card className="p-6 shadow-soft bg-gradient-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        Sponsorship Radar
      </h3>

      {/* Score Display */}
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-muted/20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={getScoreColor(score)}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${score}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</div>
              <div className="text-xs text-muted-foreground">Brand Ready</div>
            </div>
          </div>
        </div>
        <Badge variant="outline" className={`${getScoreColor(score)} bg-opacity-10 border-current/30`}>
          {getScoreMessage(score)}
        </Badge>
      </div>

      {/* Milestones */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-warning" />
          Milestones ({completedMilestones.length}/{milestones.length})
        </h4>
        {milestones.map((milestone, index) => (
          <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
            milestone.completed ? 'bg-success/10 border border-success/20' :
            milestone.current ? 'bg-primary/10 border border-primary/20' :
            'bg-muted/20'
          }`}>
            <div className="flex-shrink-0 mt-0.5">
              {milestone.completed ? (
                <CheckCircle className="w-4 h-4 text-success" />
              ) : milestone.current ? (
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`font-medium text-sm ${
                  milestone.completed ? 'text-success' :
                  milestone.current ? 'text-primary' :
                  'text-muted-foreground'
                }`}>
                  {milestone.name}
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  +{milestone.points}pts
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Next Action */}
      <div className="p-4 bg-gradient-primary rounded-lg text-white">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold text-sm">Next Priority</span>
        </div>
        <p className="text-sm opacity-90 mb-3">
          Focus on reaching 1K followers to unlock brand partnership opportunities
        </p>
        <Button className="w-full bg-white text-primary hover:bg-white/90 font-semibold" size="sm">
          Create Growth Plan
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="text-center p-2 bg-accent/30 rounded">
          <Users className="w-4 h-4 text-primary mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Growth Rate</div>
          <div className="text-sm font-semibold">+12%/week</div>
        </div>
        <div className="text-center p-2 bg-accent/30 rounded">
          <Award className="w-4 h-4 text-success mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Engagement</div>
          <div className="text-sm font-semibold">3.2%</div>
        </div>
      </div>
    </Card>
  );
};