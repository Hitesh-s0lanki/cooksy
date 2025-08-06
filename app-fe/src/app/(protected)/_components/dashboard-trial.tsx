"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_TOKENS } from "@/constant";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

export const DashboardTrial = () => {
  return (
    <div className="border border-border/10 rounded-lg w-full bg-primary/5 flex flex-col gap-y-2">
      <div className="p-3 flex flex-col gap-y-4">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-5" />
          <p className="text-sm font-medium">Free Plan</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-xs">2/{MAX_FREE_TOKENS} tokens.</p>
          <Progress value={(2 / MAX_FREE_TOKENS) * 100} />
        </div>
      </div>
      <Button
        className="bg-transparent border-t border-border/10 hover:bg-white/10 rounded-t-none text-black"
        asChild
      >
        <Link href="/upgrade">Upgrade</Link>
      </Button>
    </div>
  );
};
