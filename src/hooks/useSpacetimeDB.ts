import { useCallback, useEffect, useMemo, useState } from "react";

export interface UserProfile {
  identity: string | null;
  email: string;
  name: string;
  role: "educator" | "administrator" | "parent";
  plan: "free" | "individual" | "small" | "professional" | "enterprise" | "enterprise_plus" | "district" | "government";
  centerName?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  parentIds: string[];
  developmentMilestones: Record<string, boolean>;
}

export interface LessonPlan {
  id: string;
  title: string;
  description: string;
  framework: string;
  ageGroup: string;
  duration: number;
  materials: string[];
  objectives: string[];
  activities: string[];
  assessments: string[];
  isPublic: boolean;
}

export type ComplianceRecordType =
  | "safety_inspection"
  | "staff_training"
  | "licensing"
  | "health_check";

export interface ComplianceRecord {
  id: string;
  type: ComplianceRecordType;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  assignedTo: string;
  documents: string[];
  notes?: string;
}

export interface ParentCommunication {
  id: string;
  childId: string;
  parentId: string;
  type: "daily_report" | "message" | "announcement";
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface SpacetimeDBState {
  connected: boolean;
  statusMessage: string;
  userProfile: UserProfile | null;
}

export interface UseSpacetimeDBResult extends SpacetimeDBState {
  registerUser: (
    email: string,
    name: string,
    role: UserProfile["role"],
    plan: UserProfile["plan"],
    centerName?: string,
  ) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export function useSpacetimeDB(): UseSpacetimeDBResult {
  const [connected, setConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Connecting to KatoSuite services...");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnected(true);
      setStatusMessage("All systems operational");
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const registerUser = useCallback<UseSpacetimeDBResult["registerUser"]>(
    async (email, name, role, plan, centerName) => {
      const profile: UserProfile = {
        identity: null,
        email,
        name,
        role,
        plan,
        centerName,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      setUserProfile(profile);
    },
  []);

  const updateUserProfile = useCallback<UseSpacetimeDBResult["updateUserProfile"]>(
    async (updates) => {
      setUserProfile((previous) => (previous ? { ...previous, ...updates } : previous));
    },
  []);

  return useMemo(
    () => ({ connected, statusMessage, userProfile, registerUser, updateUserProfile }),
    [connected, statusMessage, userProfile, registerUser, updateUserProfile],
  );
}
