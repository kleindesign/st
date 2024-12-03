"use client";

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import Image from 'next/image'

function StrollModel({ onError }: { onError: (error: Error) => void }) {
  const gltfUrl = `/api/proxy?url=${encodeURIComponent("https://jzyg8siqadeixyxx.public.blob.vercel-storage.com/Stroll-test-mdl-l83GNAIxbpbYkLmSHHI6yj8IrTIQT8.gltf")}`
  const { scene, errors } = useGLTF(gltfUrl)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (errors) {
      console.error("GLTF loading errors:", errors);
      onError(new Error("Failed to load 3D model"));
    }
    if (scene) {
      console.log("GLTF loaded successfully");
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.side = THREE.DoubleSide
        }
      })
      scene.scale.set(0.5, 0.5, 0.5)
      scene.position.set(0, -1, 0)
    }
  }, [scene, errors, onError])

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2
    }
  })

  return scene ? <primitive object={scene} ref={modelRef} /> : null
}

function Scene({ onError }: { onError: (error: Error) => void }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      <Suspense fallback={null}>
        <StrollModel onError={onError} />
      </Suspense>
    </>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const handleError = (error: Error) => {
    console.error("Error in 3D scene:", error);
    setError(error);
    setLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        handleError(new Error("Loading timeout - please check your network connection and try again."));
      }
    }, 60000); // Increased to 60 seconds

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {error || loading ? (
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stroll-CMuigFJpJyKwQELd1DQ2cPSysEnamS.png"
            alt="Stroll Device"
            layout="fill"
            objectFit="contain"
            priority
          />
          {error && (
            <div className="absolute bottom-4 left-4 bg-red-500 text-white p-2 rounded">
              Error: {error.message}
            </div>
          )}
        </div>
      ) : (
        <Canvas 
          className="absolute inset-0" 
          onCreated={() => setLoading(false)}
        >
          <Scene onError={handleError} />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="sunset" />
        </Canvas>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
        <h1 className="text-6xl font-bold text-white mb-6 shadow-sm leading-tight">
          Find Your Way,<br />
          Free Your Mind
        </h1>
        <p className="text-2xl text-white mb-12 max-w-2xl shadow-sm">
          Stroll helps you take in your surroundings while you walk, instead of focusing on your screen. <br />
          Rediscover walking as a daily practice of self-care.
        </p>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg py-3 px-8 rounded-full transition-colors duration-200"
          onClick={() => alert("Thank you for your interest!")}
        >
          Learn More
        </button>
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xl font-semibold text-white">Loading 3D Experience...</div>
          </div>
        </div>
      )}
    </div>
  )
}
