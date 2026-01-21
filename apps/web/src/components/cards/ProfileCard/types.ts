export type { ExtendedTeamMember } from "@/data/team.data";

export interface ProfileCardProps {
  member: ExtendedTeamMember;
  className?: string;
}

export interface ProfileCardState {
  isDrawerOpen: boolean;
}
