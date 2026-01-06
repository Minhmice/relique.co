"use client";

import { useEffect } from "react";
import { alertService } from "@/lib/services/alertService";

export function AlertScheduler() {
  useEffect(() => {
    const checkRules = async () => {
      await alertService.checkRules();
    };

    checkRules();

    const interval = setInterval(() => {
      checkRules();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

