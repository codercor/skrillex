import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function WobbleCardSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full my-40 px-6">
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-2 h-full bg-neutral-900/80 border border-white/10 min-h-[500px] lg:min-h-[300px]"
                className=""
            >
                <div className="max-w-xs">
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Policies that travel with your agents.
                    </h2>
                    <p className="mt-4 text-left  text-base/6 text-neutral-200">
                        Embed compliance constraints directly into agent prompts and workflows. BaseLex ensures no agent acts outside the law.
                    </p>
                </div>
                <img
                    src="/assets/baselex-hero-bg-2.png"
                    width={500}
                    height={500}
                    alt="governance dashboard demo"
                    className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl opacity-60"
                />
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-neutral-950 border border-white/10">
                <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Code is Law.
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                    If an action violates policy, it is blocked at the runtime level. No exceptions.
                </p>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-indigo-950/40 border border-indigo-500/20 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div className="max-w-sm">
                    <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Every decision, traced and logged.
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        From the initial prompt to the final output, visualize the entire decision chain. Compliance isn't an afterthought—it's the foundation.
                    </p>
                </div>
                <img
                    src="/assets/baselex-hero-bg-1.png"
                    width={500}
                    height={500}
                    alt="Audit logs demo"
                    className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl opacity-60"
                />
            </WobbleCard>
        </div>
    );
}
