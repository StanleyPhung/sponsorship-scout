"use client"

import * as React from "react"
import { User } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GeneratorNav } from "@/components/navigation"

export default function ProfilePage() {
  return (
    <main className="h-screen bg-background overflow-hidden">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-6 px-4 py-6 lg:px-8">
        <GeneratorNav />
        <div className="flex flex-1 flex-col gap-6 overflow-hidden lg:flex-row">
          <Card className="flex h-full flex-col lg:min-h-0">
            <CardHeader>
              <CardTitle>Profile Workspace</CardTitle>
              <CardDescription>
                Manage your creator profile, branding assets, and audience insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center">
              <div className="text-center space-y-3">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Coming Soon</p>
                <p className="text-xs text-muted-foreground max-w-sm">
                  This workspace is under development. You'll be able to edit your creator
                  profile, upload brand assets, and analyze your audience here.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
