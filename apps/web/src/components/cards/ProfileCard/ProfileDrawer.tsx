"use client";

import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ExtendedTeamMember } from "./types";
import { ProfileChips } from "./ProfileChips";

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
 * ProfileDrawer - Full bio drawer with tabs
 * Shows complete profile information organized in tabs
 */
export function ProfileDrawer({ member, open, onOpenChange }: ProfileDrawerProps) {
  const { fullBio, expanded, credentials } = member;
  
  // Kiểm tra content availability cho từng tab
  const hasOverview = fullBio?.overview || credentials || expanded?.microSummary;
  const hasExperience = fullBio?.timeline && fullBio.timeline.length > 0;
  const hasFocus = fullBio?.institutionalValue || expanded?.focusAreas;
  
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
            <p className="text-primaryBlue font-black text-[10px] uppercase tracking-[0.4em] mt-2">
              {member.role}
            </p>
            {member.tagline && (
              <p className="text-white font-semibold text-base mt-3 leading-relaxed">
                {member.tagline}
              </p>
            )}
          </motion.div>

          {/* Expertise Chips */}
          {member.expertiseChips && member.expertiseChips.length > 0 && (
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <ProfileChips 
                chips={member.expertiseChips} 
                maxVisible={8}
              />
            </motion.div>
          )}
        </SheetHeader>

        {/* Content */}
        <div className="mt-6">
          {shouldUseFallback ? (
            <FallbackContent member={member} />
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className={cn(
                "grid w-full",
                hasOverview && hasExperience && hasFocus ? "grid-cols-3" : "grid-cols-2",
                "bg-bgDark border border-white/10 mb-6"
              )}>
                {hasOverview && (
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                )}
                {hasExperience && (
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                )}
                {hasFocus && (
                  <TabsTrigger value="focus">Focus</TabsTrigger>
                )}
              </TabsList>

              {hasOverview && (
                <TabsContent value="overview" className="space-y-6">
                  <OverviewTab member={member} />
                </TabsContent>
              )}

              {hasExperience && (
                <TabsContent value="experience" className="space-y-6">
                  <ExperienceTab member={member} />
                </TabsContent>
              )}

              {hasFocus && (
                <TabsContent value="focus" className="space-y-6">
                  <FocusTab member={member} />
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>

        {/* Footer CTAs */}
        {fullBio?.links && (
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4"
          >
            {fullBio.links.linkedin && (
              <a
                href={fullBio.links.linkedin}
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

// Overview Tab Content
function OverviewTab({ member }: { member: ExtendedTeamMember }) {
  const { fullBio, credentials, expanded } = member;

  return (
    <>
      {fullBio?.overview && (
        <motion.div custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
          <p className="text-textSec text-base leading-7">{fullBio.overview}</p>
        </motion.div>
      )}

      {credentials && (
        <motion.div custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Credentials</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {credentials.primaryOrg && (
              <div>
                <p className="text-primaryBlue text-xs uppercase tracking-wide font-bold mb-1">Organization</p>
                <p className="text-white text-sm">{credentials.primaryOrg}</p>
              </div>
            )}
            {credentials.education && (
              <div>
                <p className="text-primaryBlue text-xs uppercase tracking-wide font-bold mb-1">Education</p>
                <p className="text-white text-sm">{credentials.education}</p>
              </div>
            )}
            {credentials.region && (
              <div>
                <p className="text-primaryBlue text-xs uppercase tracking-wide font-bold mb-1">Region</p>
                <p className="text-white text-sm">{credentials.region}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {expanded?.microSummary && (
        <motion.div custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
          <p className="text-textSec text-sm leading-relaxed italic border-l-2 border-primaryBlue pl-4">
            {expanded.microSummary}
          </p>
        </motion.div>
      )}
    </>
  );
}

// Experience Tab Content  
function ExperienceTab({ member }: { member: ExtendedTeamMember }) {
  const timeline = member.fullBio?.timeline;
  if (!timeline) return null;

  return (
    <motion.div custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
      <div className="space-y-6">
        {timeline.map((item, index) => (
          <div key={index} className="flex gap-4 relative">
            {/* Timeline line */}
            {index < timeline.length - 1 && (
              <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-primaryBlue/30" />
            )}
            
            {/* Timeline dot */}
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primaryBlue border-4 border-cardDark relative z-10" />
            
            {/* Content */}
            <div className="flex-1 pb-2">
              <p className="text-primaryBlue text-xs font-bold uppercase tracking-wide mb-1">
                {item.year}
              </p>
              <p className="text-white font-semibold text-base mb-1">{item.title}</p>
              <p className="text-white/60 text-sm mb-2">{item.org}</p>
              <p className="text-textSec text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Focus Tab Content
function FocusTab({ member }: { member: ExtendedTeamMember }) {
  const { fullBio, expanded } = member;

  return (
    <>
      {fullBio?.institutionalValue && (
        <motion.div custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
            Institutional Value
          </h4>
          <p className="text-textSec text-base leading-7">{fullBio.institutionalValue}</p>
        </motion.div>
      )}

      {expanded?.focusAreas && expanded.focusAreas.length > 0 && (
        <motion.div custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Focus Areas</h4>
          <ProfileChips chips={expanded.focusAreas} maxVisible={10} />
        </motion.div>
      )}

      {expanded?.keyContributions && expanded.keyContributions.length > 0 && (
        <motion.div custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
            Key Contributions
          </h4>
          <ul className="space-y-3">
            {expanded.keyContributions.map((contribution, index) => (
              <li key={index} className="flex items-start gap-3 text-textSec text-sm leading-relaxed">
                <span className="w-2 h-2 bg-primaryBlue rounded-full flex-shrink-0 mt-2" />
                <span>{contribution}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
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
