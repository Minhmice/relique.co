"use client";

import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ExtendedTeamMember } from "./types";

interface ProfileDrawerProps {
  member: ExtendedTeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sectionVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
};

/**
 * ProfileDrawer - Full bio drawer with 2-column layout
 * Left: Overview content | Right: Credentials
 */
export function ProfileDrawer({ member, open, onOpenChange }: ProfileDrawerProps) {
  const { fullBio } = member;
  
  // Nếu không có fullBio, fallback về description
  const shouldUseFallback = !fullBio;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className={cn(
          "w-full sm:max-w-[75%]",
          "bg-cardDark border-l border-white/10",
          "overflow-y-auto",
          "pt-28 px-6 sm:px-8 pb-6",
          "[&>button]:fixed [&>button]:top-[5.5rem] sm:[&>button]:top-[6rem] [&>button]:right-[2rem]"
        )}
      >
        {/* Header */}
        <SheetHeader className="space-y-4 pb-6 border-b border-white/10">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <SheetTitle className="text-3xl font-bold tracking-tight text-white">
              {member.name}
            </SheetTitle>
            <p className="text-primaryBlue font-black text-[10px] uppercase mt-2">
              {member.role}
            </p>
            {member.tagline && (
              <p className="text-white font-semibold text-base mt-3 leading-relaxed">
                {member.tagline}
              </p>
            )}
          </motion.div>
        </SheetHeader>

        {/* Content - 2 Column Layout */}
        <div className="mt-6">
          {shouldUseFallback ? (
            <FallbackContent member={member} />
          ) : (
            <TwoColumnContent member={member} />
          )}
        </div>

        {/* Footer CTAs */}
        {false && fullBio?.links && (
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4"
          >
            {fullBio?.links?.linkedin && (
              <a
                href={fullBio?.links?.linkedin ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-6 py-3",
                  "bg-primaryBlue hover:bg-accentBlue",
                  "text-white text-sm font-medium",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue"
                )}
              >
                Connect on LinkedIn
              </a>
            )}
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Two Column Layout Content
function TwoColumnContent({ member }: { member: ExtendedTeamMember }) {
  const { fullBio, expanded } = member;
  const experience = expanded?.experienceSnapshot;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Overview */}
      <div className="space-y-6">
        {fullBio?.overview && (
          <motion.div custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Overview</h4>
            <p className="text-textSec text-base leading-7">{fullBio.overview}</p>
          </motion.div>
        )}
      </div>

      {/* Right Column - Experience Timeline */}
      {experience && experience.length > 0 && (
        <motion.div custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-wide">Credential</h4>
            
            <div className="space-y-0">
              {experience.map((item, index) => (
                <div key={index} className="flex gap-4 relative">
                  {/* Timeline line */}
                  {index < experience.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-primaryBlue/30" />
                  )}
                  
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primaryBlue border-4 border-cardDark relative z-10" />
                  
                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <p className="text-primaryBlue text-xs font-bold uppercase tracking-wide mb-1">
                      {item.period}
                    </p>
                    <p className="text-white font-semibold text-base mb-1">{item.title}</p>
                    <p className="text-white/60 text-sm">{item.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Fallback content for members without enriched data
function FallbackContent({ member }: { member: ExtendedTeamMember }) {
  return (
    <motion.div custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
      <div className="space-y-4">
        <h4 className="text-white font-bold text-lg">About</h4>
        {member.description.map((paragraph, index) => (
          <p key={index} className="text-textSec text-base leading-7">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
