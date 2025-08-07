import { ResumeData } from './types'

export interface ScoreResult {
  overall: number
  breakdown: {
    personalInfo: number
    experience: number
    education: number
    skills: number
  }
  suggestions: string[]
}

export function scoreResume(data: ResumeData): ScoreResult {
  const suggestions: string[] = []
  let personalInfoScore = 0
  let experienceScore = 0
  let educationScore = 0
  let skillsScore = 0

  // Personal Info Scoring (25 points)
  const { personalInfo } = data
  if (personalInfo.fullName) personalInfoScore += 5
  if (personalInfo.email) personalInfoScore += 5
  if (personalInfo.phone) personalInfoScore += 5
  if (personalInfo.location) personalInfoScore += 3
  if (personalInfo.summary && personalInfo.summary.length > 50) {
    personalInfoScore += 7
  } else if (personalInfo.summary) {
    personalInfoScore += 3
    suggestions.push("Expand your professional summary to 2-3 sentences")
  } else {
    suggestions.push("Add a professional summary to introduce yourself")
  }

  // Experience Scoring (35 points)
  if (data.experience.length === 0) {
    suggestions.push("Add your work experience to strengthen your resume")
  } else {
    experienceScore += Math.min(data.experience.length * 10, 25)
    
    data.experience.forEach((exp, index) => {
      if (exp.description.length > 0) {
        experienceScore += 2
      } else {
        suggestions.push(`Add bullet points describing your role at ${exp.company}`)
      }
      
      if (exp.description.length >= 3) {
        experienceScore += 1
      } else if (exp.description.length > 0) {
        suggestions.push(`Add more details about your achievements at ${exp.company}`)
      }
    })
  }

  // Education Scoring (20 points)
  if (data.education.length === 0) {
    suggestions.push("Add your educational background")
  } else {
    educationScore += Math.min(data.education.length * 15, 20)
    if (data.education.some(edu => edu.gpa)) {
      educationScore += 5
    }
  }

  // Skills Scoring (20 points)
  if (data.skills.length === 0) {
    suggestions.push("Add relevant skills to showcase your expertise")
  } else if (data.skills.length < 5) {
    skillsScore += data.skills.length * 3
    suggestions.push("Add more skills to reach 5-10 relevant skills")
  } else {
    skillsScore += Math.min(data.skills.length * 2, 20)
  }

  const overall = personalInfoScore + experienceScore + educationScore + skillsScore

  // Additional suggestions based on overall score
  if (overall < 60) {
    suggestions.unshift("Your resume needs significant improvement. Focus on adding more content.")
  } else if (overall < 80) {
    suggestions.unshift("Good start! Add more details to make your resume stand out.")
  } else if (overall < 90) {
    suggestions.unshift("Great resume! A few tweaks will make it excellent.")
  } else {
    suggestions.unshift("Excellent resume! You're ready to apply to top companies.")
  }

  return {
    overall,
    breakdown: {
      personalInfo: personalInfoScore,
      experience: experienceScore,
      education: educationScore,
      skills: skillsScore
    },
    suggestions
  }
}
