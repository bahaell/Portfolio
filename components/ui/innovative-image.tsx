"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InnovativeImageProps {
    src: string;
    alt: string;
    className?: string;
}

export function InnovativeImage({ src, alt, className }: InnovativeImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={cn("relative group", className)}>
            {/* Main container with glass effect and border glow */}
            <div className="relative rounded-2xl border border-border/50 bg-card/30 p-2 sm:p-3 glass overflow-hidden hover-lift duration-500">

                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                {/* Image wrapper */}
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] sm:aspect-square w-full bg-muted/20">

                    {/* Scanning line effect */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="w-full h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.8)] animate-[scan_3s_ease-in-out_infinite]" />
                    </div>

                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className={cn(
                            "object-cover transition-all duration-700 ease-out filter grayscale hover:grayscale-0",
                            isLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
                        )}
                        onLoad={() => setIsLoaded(true)}
                        priority
                    />

                    {/* Tech overlay pattern */}
                    <div className="absolute inset-0 z-20 pointer-events-none bg-[url('/placeholder.svg')] opacity-[0.03] bg-repeat mix-blend-overlay" />

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-l-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors duration-300 z-20" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-r-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors duration-300 z-20" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-l-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors duration-300 z-20" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-r-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors duration-300 z-20" />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-3 right-4 sm:-right-2 bg-background/80 backdrop-blur-md border border-primary/20 px-3 py-1 rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 z-30">
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        /*<span className="text-[10px] font-mono font-medium tracking-wider text-primary">LIVE</span>*/
                    </div>
                </div>
            </div>

            {/* Background glow */}
            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-full" />
        </div>
    );
}
