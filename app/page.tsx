"use client";

import { useState, useRef, useEffect } from "react"
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  const scrollToNextSection = () => {
    const nextSection = (currentSection + 1) % sectionsRef.current.length
    sectionsRef.current[nextSection]?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    setCurrentSection(nextSection)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionsRef.current.findIndex(ref => ref === entry.target)
          setCurrentSection(index)
        }
      })
    }, { threshold: 0.5 })

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-screen h-screen overflow-x-auto overflow-y-hidden whitespace-nowrap snap-x snap-mandatory font-outfit">
      <div className="inline-flex h-full">
        <div ref={el => sectionsRef.current[0] = el} className="relative w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center p-4 text-center snap-start bg-gray-900">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stroll-CMuigFJpJyKwQELd1DQ2cPSysEnamS.png"
            alt="Stroll Device"
            layout="fill"
            objectFit="contain"
            priority
            className="absolute inset-0 z-0"
          />
          <div className="relative z-10">
            <h1 className="text-6xl font-bold text-white mb-6 shadow-sm leading-tight">
              Find Your Way,<br />
              Free Your Mind
            </h1>
            <p className="text-2xl text-white mb-12 max-w-2xl shadow-sm">
              Stroll helps you take in your surroundings while you walk, instead of focusing on your screen. <br />
              Rediscover walking as a daily practice of self-care.
            </p>
            <Button
              onClick={scrollToNextSection}
              className="bg-[#FF611A] hover:bg-[#FF611A]/90 text-white py-3 px-8 rounded-full transition-colors duration-200"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div ref={el => sectionsRef.current[1] = el} className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center p-4 text-center snap-start bg-blue-100">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">How Stroll Works</h2>
          <p className="text-xl text-blue-800 mb-8 max-w-2xl">
            Stroll uses advanced haptic feedback and audio cues to guide you through your environment,
            allowing you to keep your head up and eyes on your surroundings.
          </p>
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Stroll Device Diagram"
            width={300}
            height={300}
            className="mb-8"
          />
          <Button 
            onClick={scrollToNextSection}
            className="bg-[#FF611A] hover:bg-[#FF611A]/90 text-white rounded-full"
          >
            Next: Features
          </Button>
        </div>

        <div ref={el => sectionsRef.current[2] = el} className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center p-4 text-center snap-start bg-green-100">
          <h2 className="text-4xl font-bold text-green-900 mb-6">Key Features</h2>
          <ul className="text-xl text-green-800 mb-8 max-w-2xl">
            <li className="mb-4">• Intuitive haptic feedback for navigation</li>
            <li className="mb-4">• Audio cues for points of interest</li>
            <li className="mb-4">• Long-lasting battery life</li>
            <li className="mb-4">• Waterproof and durable design</li>
          </ul>
          <Button 
            onClick={scrollToNextSection}
            className="bg-[#FF611A] hover:bg-[#FF611A]/90 text-white rounded-full"
          >
            Next: Get Started
          </Button>
        </div>

        <div ref={el => sectionsRef.current[3] = el} className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center p-4 text-center snap-start bg-purple-100">
          <h2 className="text-4xl font-bold text-purple-900 mb-6">Get Started with Stroll</h2>
          <p className="text-xl text-purple-800 mb-8 max-w-2xl">
            Ready to transform your walking experience? Join our waitlist to be among the first to experience Stroll.
          </p>
          <Button 
            className="bg-[#FF611A] hover:bg-[#FF611A]/90 text-white rounded-full"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </div>
  )
}
