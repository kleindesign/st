"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Outfit } from 'next/font/google'
import * as THREE from 'three'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

const outfit = Outfit({ subsets: ['latin'] })

function StrollModel({ onError }: { onError: (error: Error) => void }) {
  const gltfUrl = `/api/proxy?url=${encodeURIComponent("https://jzyg8siqadeixyxx.public.blob.vercel-storage.com/Stroll-test-mdl-l83GNAIxbpbYkLmSHHI6yj8IrTIQT8.gltf")}`
  const { scene, errors } = useGLTF(gltfUrl, undefined, (error) => {
    console.error("GLTF loading error:", error);
    onError(error);
  })
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    console.log("Attempting to load GLTF from:", gltfUrl);
    if (errors) {
      console.error("GLTF loading errors:", errors);
      onError(new Error("Failed to load 3D model"));
    }
    if (scene) {
      console.log("GLTF loaded successfully");
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh
