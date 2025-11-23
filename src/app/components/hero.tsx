"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import hero1 from "../../../public/images/hero-1.jpg";
import hero2 from "../../../public/images/hero-2.jpg";
import hero3 from "../../../public/images/hero-3.jpg";
import hero4 from "../../../public/images/hero-4.jpg";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

export default function Hero() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    router.push("/create-new-trip");
  };

  const imageCollection = [
    { id: 1, name: "image 1", image: hero1 },
    { id: 2, name: "image 2", image: hero2 },
    { id: 3, name: "image 3", image: hero3 },
    { id: 4, name: "image 4", image: hero4 },
  ];

  const [index, setIndex] = useState(0);

  // Refs for GSAP animations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Image carousel effect
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % imageCollection.length),
      4000
    );
    return () => clearInterval(id);
  }, [imageCollection.length]);

  // GSAP text animations - use useLayoutEffect for DOM measurements
  useLayoutEffect(() => {
    // Check if all refs are attached
    if (!titleRef.current || !descRef.current || !ctaRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Get all elements that exist
      const elements = [
        titleRef.current,
        descRef.current,
        ctaRef.current,
      ].filter(Boolean); // Filter out any null values

      // Initial setup
      gsap.set(elements, {
        opacity: 0,
        y: 30,
      });

      // Timeline for coordinated animations
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate title
      if (titleRef.current) {
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Animate description
      if (descRef.current) {
        tl.to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      // Add floating animation to the main title
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []); // Empty dependency array since we only want this to run once

  // Dynamic text animation on index change
  useEffect(() => {
    if (titleRef.current && index > 0) {
      // Only animate after first render
      gsap.fromTo(
        titleRef.current,
        { scale: 0.9, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [index]);

  return (
    <section className="mx-auto mt-5 max-w-7xl px-4" ref={containerRef}>
      <div className="relative h-[84vh] min-h-[280px] rounded-3xl overflow-hidden bg-muted ring-1 ring-border shadow-xl">
        {/* Background Images */}
        {imageCollection.map((img, i) => (
          <Image
            key={img.id}
            src={img.image}
            alt={img.name}
            fill
            sizes="(min-width: 1024px) 1280px, 100vw"
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl w-full text-center mt-20">
            {/* Main Title */}
            <h1
              ref={titleRef}
              className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white opacity-0"
            >
              <span className="block">Your Journey,</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligently Planned
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="mx-auto mb-10 max-w-3xl text-lg sm:text-xl text-gray-100 leading-relaxed font-light opacity-0"
            >
              Experience seamless travel management powered by artificial
              intelligence. From smart itinerary planning to real-time
              recommendations, we make every trip extraordinary.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0"
            >
              <button
                onClick={onSend}
                disabled={!isLoaded}
                className="group relative px-10 py-4 bg-primary text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative">Start Planning</span>
              </button>

              <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 transition-all duration-300 hover:bg-primary/20 hover:scale-105 hover:shadow-xl">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
