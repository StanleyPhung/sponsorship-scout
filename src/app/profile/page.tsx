"use client"

import * as React from "react"
import { Sparkles, Target, TrendingUp, Upload } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GeneratorNav } from "@/components/navigation"

export default function ProfilePage() {
  return (
    <main className="h-screen bg-background overflow-hidden">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-6 px-4 py-6 lg:px-8">
        <GeneratorNav />
        
        <div className="flex h-full flex-col gap-6 overflow-y-auto lg:min-h-0">
          {/* Top Profile Bio Section - Always Vertical Stack */}
          <div className="flex flex-col gap-6">
            {/* Cover + Avatar + Bio */}
            <Card>
              <div className="relative">
                {/* Cover Wallpaper */}
                <div className="h-32 w-full rounded-t-lg bg-gradient-to-br from-violet-100 via-pink-100 to-amber-100 dark:from-violet-950 dark:via-pink-950 dark:to-amber-950" />
                
                {/* Avatar & Bio Content */}
                <CardContent className="relative pt-0">
                  {/* Avatar - Overlaps Cover */}
                  <div className="flex flex-col items-center -mt-12 mb-4">
                    <Avatar className="h-24 w-24 border-4 border-background">
                      <AvatarImage src="" alt="Creator Avatar" />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-violet-200 to-pink-200 dark:from-violet-800 dark:to-pink-800">
                        FM
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Creator Name & Bio */}
                  <div className="text-center space-y-3">
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight">Fredy Mercury</h1>
                      <p className="text-sm text-muted-foreground">@fredymercury</p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-6 text-sm">
                      <div>
                        <span className="font-semibold text-foreground">1.25k</span>
                        <span className="text-muted-foreground ml-1">Followers</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">455</span>
                        <span className="text-muted-foreground ml-1">Following</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                      Indonesian-based senior UI/UX designer with 10+ years creating magic across industries—from early-stage startups to unicorns. Hobby includes playing guitar and exploring new coffee spots.
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Creative DNA Card - Below Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-violet-500" />
                  Creative DNA
                </CardTitle>
                <CardDescription>
                  Your unique creator identity at a glance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Niche</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">UI/UX Design</Badge>
                    <Badge variant="secondary">Tech Tutorials</Badge>
                    <Badge variant="secondary">Lifestyle</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Content Style</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Educational</Badge>
                    <Badge variant="secondary">Casual</Badge>
                    <Badge variant="secondary">Visual-first</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Personality</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Friendly</Badge>
                    <Badge variant="secondary">Curious</Badge>
                    <Badge variant="secondary">Detail-oriented</Badge>
                    <Badge variant="secondary">Collaborative</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Insights Section - Three Separate Cards */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            {/* Goals Card */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Goals
                </CardTitle>
                <CardDescription>
                  What you're working toward
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Current Focus</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span>Grow to 5k followers by Q2</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span>Land 2-3 brand partnerships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span>Experiment with new content formats</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Top Formats</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Design Tips</Badge>
                    <Badge variant="outline">Behind-the-Scenes</Badge>
                    <Badge variant="outline">Day-in-Life</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Past Posts</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload 3-5 recent posts
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Connect TikTok to auto-fetch your latest content
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Superpowers Card */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  Superpowers
                </CardTitle>
                <CardDescription>
                  Your creative strengths
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <div className="space-y-2">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
                    <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100">Visual Storytelling</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      You create eye-catching visuals that stop the scroll
                    </p>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
                    <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100">Consistent Posting</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      You maintain a steady cadence that keeps your audience engaged
                    </p>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
                    <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100">Authentic Voice</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      Your genuine personality shines through in every post
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Zones Card */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  Growth Zones
                </CardTitle>
                <CardDescription>
                  Opportunities to level up
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <div className="space-y-2">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/30">
                    <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Call-to-Action Clarity</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      Experiment with stronger CTAs to boost engagement
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/30">
                    <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Trending Audio Use</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      Try incorporating more trending sounds for wider reach
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/30">
                    <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Collaboration Frequency</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      Partner with other creators to tap into new audiences
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
