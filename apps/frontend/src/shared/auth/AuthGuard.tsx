"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner, Center } from "@chakra-ui/react";

import { useAuthStore } from "@/shared/store/auth-store";
import type { UserRole } from "@/shared/auth/types";

type AuthGuardProps = {
    children: React.ReactNode;

    requireAuth?: boolean;
    allowedRoles?: UserRole[];

    redirectIfNotAuth?: string;
    redirectIfWrongRole?: string;
};

export function AuthGuard({
    children,
    requireAuth = true,
    allowedRoles,
    redirectIfNotAuth = "/login",
    redirectIfWrongRole = "/",
}: AuthGuardProps) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isAuthenticated = Boolean(user);

    const hasAllowedRole =
        !allowedRoles || !user ? true : allowedRoles.includes(user.role);

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        if (requireAuth && !isAuthenticated) {
            router.replace(redirectIfNotAuth);
            return;
        }

        if (requireAuth && isAuthenticated && !hasAllowedRole) {
            router.replace(redirectIfWrongRole);
        }
    }, [
        isMounted,
        requireAuth,
        isAuthenticated,
        hasAllowedRole,
        router,
        redirectIfNotAuth,
        redirectIfWrongRole,
    ]);

    if (!isMounted) {
        return (
            <Center minH="100vh">
                <Spinner />
            </Center>
        );
    }

    if (requireAuth && !isAuthenticated) {
        return null;
    }

    if (requireAuth && isAuthenticated && !hasAllowedRole) {
        return null;
    }

    return <>{children}</>;
}