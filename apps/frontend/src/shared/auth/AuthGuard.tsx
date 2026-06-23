"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Spinner, Center } from "@chakra-ui/react";

import { useAuthStore } from "shared/store/auth-store";
import type { UserRole } from "shared/auth/types";

type AuthGuardProps = {
    children: React.ReactNode;

    requireAuth?: boolean;
    allowedRoles?: UserRole[];
    publicPaths?: string[];

    redirectIfNotAuth?: string;
    redirectIfWrongRole?: string;
};

export function AuthGuard({
    children,
    requireAuth = true,
    allowedRoles,
    publicPaths = ["/login"],
    redirectIfNotAuth = "/login",
    redirectIfWrongRole = "/",
}: AuthGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const user = useAuthStore((state) => state.user);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isAuthenticated = Boolean(user);
    const isPublicPath = publicPaths.includes(pathname);
    const shouldRequireAuth = requireAuth && !isPublicPath;

    const hasAllowedRole =
        !allowedRoles || !user
            ? true
            : user.roles.some((role) => allowedRoles.includes(role));

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        if (shouldRequireAuth && !isAuthenticated) {
            router.replace(redirectIfNotAuth);
            return;
        }

        if (shouldRequireAuth && isAuthenticated && !hasAllowedRole) {
            router.replace(redirectIfWrongRole);
        }
    }, [
        isMounted,
        shouldRequireAuth,
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

    if (shouldRequireAuth && !isAuthenticated) {
        return null;
    }

    if (shouldRequireAuth && isAuthenticated && !hasAllowedRole) {
        return null;
    }

    return <>{children}</>;
}
