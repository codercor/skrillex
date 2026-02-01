"use client";

import React from "react";
import Loader from "@/components/ui/Loader";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Loader />
            {children}
        </>
    );
}
