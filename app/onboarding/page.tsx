"use client"

import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const router = useRouter()

  const handleComplete = () => {
    // This will be called when onboarding is completed
    // The OnboardingFlow component handles the actual navigation
  }

  return <OnboardingFlow onComplete={handleComplete} />
}
