import { useCallback, useEffect, useMemo, useState } from "react";
import { useSpacetimeDB, type UserProfile } from "./useSpacetimeDB";

export type AuthRole = "educator" | "administrator" | "parent";
export type AuthPlan =
  | "free"
  | "individual"
  | "small"
  | "professional"
  | "enterprise"
  | "enterprise_plus"
  | "district"
  | "government";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: AuthRole;
  plan: AuthPlan;
  centerName?: string;
  hasWallet: boolean;
  walletAddress?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  privyUser: any;
  error: string | null;
  hasCompletedOnboarding: boolean;
  ready: boolean;
}

export interface AuthActions {
  login: () => void;
  logout: () => Promise<void>;
  completeOnboarding: (userData: {
    name: string;
    role: AuthRole;
    plan: AuthPlan;
    centerName?: string;
  }) => Promise<void>;
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>;
  upgradePlan: (newPlan: AuthPlan) => Promise<void>;
  createWallet: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
}

export interface Permission {
  module: "lessons" | "children" | "compliance" | "parents" | "analytics" | "staff" | "billing";
  action: "create" | "read" | "update" | "delete" | "manage";
  resource?: string;
}

const ROLE_PERMISSIONS: Record<AuthRole, Permission[]> = {
  educator: [
    { module: "lessons", action: "create" },
    { module: "lessons", action: "read" },
    { module: "lessons", action: "update" },
    { module: "children", action: "read" },
    { module: "children", action: "update" },
    { module: "parents", action: "create" },
    { module: "parents", action: "read" },
    { module: "compliance", action: "read" },
  ],
  administrator: [
    { module: "lessons", action: "manage" },
    { module: "children", action: "manage" },
    { module: "compliance", action: "manage" },
    { module: "parents", action: "manage" },
    { module: "analytics", action: "read" },
    { module: "staff", action: "manage" },
    { module: "billing", action: "read" },
  ],
  parent: [
    { module: "children", action: "read", resource: "own" },
    { module: "parents", action: "read", resource: "own" },
    { module: "parents", action: "update", resource: "own" },
  ],
};

const PLAN_FEATURES: Record<AuthPlan, string[]> = {
  free: ["basic_lessons", "limited_children", "basic_communication"],
  individual: ["ai_lessons", "unlimited_children", "parent_portal", "basic_analytics"],
  small: ["compliance_tracking", "staff_management", "advanced_analytics", "custom_branding"],
  professional: ["workflow_automation", "advanced_compliance", "reporting", "api_access"],
  enterprise: ["multi_center", "advanced_roles", "sso", "priority_support"],
  enterprise_plus: ["white_labeling", "custom_integrations", "dedicated_support"],
  district: ["district_management", "bulk_operations", "advanced_reporting"],
  government: ["regulatory_compliance", "audit_trails", "government_reporting"],
};

interface PrivyState {
  ready: boolean;
  authenticated: boolean;
  user: any;
}

const buildMockPrivyUser = (email: string): any => ({
  id: "privy-demo-user",
  email: { address: email },
  wallet: undefined,
});

export function useAuth(): (AuthState & AuthActions) & {
  hasPermission: (permission: Permission) => boolean;
  hasFeature: (feature: string) => boolean;
} {
  const [privyState, setPrivyState] = useState<PrivyState>({
    ready: false,
    authenticated: false,
    user: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { connected, statusMessage, userProfile, registerUser, updateUserProfile } = useSpacetimeDB();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrivyState((previous) => ({ ...previous, ready: true }));
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!connected) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [connected, statusMessage]);

  useEffect(() => {
    if (privyState.user && typeof window !== "undefined") {
      const stored = window.localStorage.getItem(`katosuite_onboarding_${privyState.user.id}`);
      setHasCompletedOnboarding(Boolean(stored));
    }
  }, [privyState.user]);

  const transformUser = useCallback(
    (privyUser: any, profile: UserProfile | null): AuthUser | null => {
      if (!privyUser) {
        return null;
      }

      const profileData =
        profile ?? {
          identity: null,
          email: privyUser.email?.address ?? "demo@katosuite.com",
          name: privyUser.email?.address?.split("@")[0] ?? "Demo User",
          role: "educator" as AuthRole,
          plan: "free" as AuthPlan,
          isActive: true,
          centerName: undefined,
          createdAt: new Date().toISOString(),
        };

      return {
        id: privyUser.id,
        email: profileData.email,
        name: profileData.name,
        role: profileData.role,
        plan: profileData.plan,
        centerName: profileData.centerName,
        hasWallet: Boolean(privyUser.wallet),
        walletAddress: privyUser.wallet?.address,
        isActive: profileData.isActive,
        createdAt: new Date(profileData.createdAt),
      };
    },
    [],
  );

  const login = useCallback(() => {
    setError(null);
    setPrivyState({ ready: true, authenticated: true, user: buildMockPrivyUser("demo@katosuite.com") });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("katosuite_auth_token", "demo-token");
    }
  }, []);

  const logout = useCallback(async () => {
    setPrivyState({ ready: true, authenticated: false, user: null });
    setHasCompletedOnboarding(false);
    setError(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("katosuite_auth_token");
    }
  }, []);

  const completeOnboarding = useCallback<AuthActions["completeOnboarding"]>(async (userData) => {
    if (!privyState.user) {
      setError("User email not available");
      throw new Error("User email not available");
    }

    try {
      setIsLoading(true);
      await registerUser(
        privyState.user.email?.address ?? "demo@katosuite.com",
        userData.name,
        userData.role,
        userData.plan,
        userData.centerName,
      );

      if (typeof window !== "undefined") {
        window.localStorage.setItem(`katosuite_onboarding_${privyState.user.id}`, "true");
      }
      setHasCompletedOnboarding(true);
      setError(null);
    } catch (err) {
      setError("Failed to complete onboarding. Please try again.");
      throw err instanceof Error ? err : new Error(String(err));
    } finally {
      setIsLoading(false);
    }
  }, [privyState.user, registerUser]);

  const updateProfile = useCallback<AuthActions["updateProfile"]>(async (updates) => {
    try {
      setIsLoading(true);
      const profileUpdates: Partial<UserProfile> = {
        name: updates.name,
        role: updates.role as AuthRole | undefined,
        plan: updates.plan as AuthPlan | undefined,
        centerName: updates.centerName,
      };
      await updateUserProfile(profileUpdates);
      setError(null);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      throw err instanceof Error ? err : new Error(String(err));
    } finally {
      setIsLoading(false);
    }
  }, [updateUserProfile]);

  const upgradePlan = useCallback<AuthActions["upgradePlan"]>(async (newPlan) => {
    try {
      setIsLoading(true);
      await updateUserProfile({ plan: newPlan });
      setError(null);
    } catch (err) {
      setError("Failed to upgrade plan. Please try again.");
      throw err instanceof Error ? err : new Error(String(err));
    } finally {
      setIsLoading(false);
    }
  }, [updateUserProfile]);

  const createWallet = useCallback<AuthActions["createWallet"]>(async () => {
    setPrivyState((previous) => {
      if (!previous.user) {
        return previous;
      }

      return {
        ...previous,
        user: { ...previous.user, wallet: { address: "0xDEMO" } },
      };
    });
  }, []);

  const signMessage = useCallback<AuthActions["signMessage"]>(async (message) => {
    return `signed:${message}`;
  }, []);

  const hasPermission = useCallback(
    (permission: Permission) => {
      const currentProfile = userProfile ?? null;
      if (!currentProfile) {
        return false;
      }

      const rolePermissions = ROLE_PERMISSIONS[currentProfile.role];
      return rolePermissions.some((perm) => {
        const actionMatches = perm.action === "manage" || perm.action === permission.action;
        const moduleMatches = perm.module === permission.module;
        const resourceMatches =
          !permission.resource || !perm.resource || perm.resource === permission.resource;
        return actionMatches && moduleMatches && resourceMatches;
      });
    },
    [userProfile],
  );

  const hasFeature = useCallback(
    (feature: string) => {
      const currentProfile = userProfile ?? null;
      if (!currentProfile) {
        return false;
      }
      return PLAN_FEATURES[currentProfile.plan].includes(feature);
    },
    [userProfile],
  );

  const user = useMemo(() => transformUser(privyState.user, userProfile), [privyState.user, userProfile, transformUser]);

  const isAuthenticated = privyState.ready && privyState.authenticated && hasCompletedOnboarding;

  const authState: AuthState = {
    isLoading,
    isAuthenticated,
    user,
    privyUser: privyState.user,
    error,
    hasCompletedOnboarding,
    ready: privyState.ready,
  };

  const actions: AuthActions = {
    login,
    logout,
    completeOnboarding,
    updateProfile,
    upgradePlan,
    createWallet,
    signMessage,
  };

  return { ...authState, ...actions, hasPermission, hasFeature };
}

export { ROLE_PERMISSIONS, PLAN_FEATURES };
