import { ResumeData } from '@/lib/types'

interface TechTemplateProps {
  data: ResumeData
}

export function TechTemplate({ data }: TechTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-preview">
      {/* Header with Tech Theme */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 text-white">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">{'<>'}</span>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2 font-mono">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xl text-blue-200 font-mono">
              {personalInfo.summary?.split('.')[0] || 'Software Developer'}
            </p>
          </div>
        </div>
        
        {/* Contact Info with Tech Icons */}
        <div className="flex flex-wrap gap-6 mt-6 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded">📧</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded">📱</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded">📍</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded">🌐</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded">💼</span>
              <span>LinkedIn</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Skills with Progress Bars */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2 font-mono">
                  <div className="w-6 h-6 bg-blue-900 rounded flex items-center justify-center text-white text-xs">
                    {'{}'}
                  </div>
                  SKILLS
                </h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium font-mono">{skill.name}</span>
                        <span className="text-blue-900 font-bold">{Math.round((skill.level / 5) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2 font-mono">
                  <div className="w-6 h-6 bg-blue-900 rounded flex items-center justify-center text-white text-xs">
                    🎓
                  </div>
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-4 border-blue-600 pl-4 bg-blue-50 p-3 rounded-r">
                      <h3 className="font-bold text-gray-800 font-mono">{edu.degree}</h3>
                      <p className="text-blue-700 font-medium">{edu.school}</p>
                      <p className="text-gray-600 text-sm">{edu.graduationDate}</p>
                      {edu.gpa && <p className="text-gray-600 text-sm font-mono">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-8">
            {/* Professional Summary */}
            {personalInfo.summary && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2 font-mono">
                  <div className="w-6 h-6 bg-blue-900 rounded flex items-center justify-center text-white text-xs">
                    ℹ️
                  </div>
                  PROFILE
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                </div>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2 font-mono">
                  <div className="w-6 h-6 bg-blue-900 rounded flex items-center justify-center text-white text-xs">
                    💻
                  </div>
                  EXPERIENCE
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 font-mono">{exp.jobTitle}</h3>
                            <p className="text-blue-700 font-semibold">{exp.company}</p>
                            {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                          </div>
                          <div className="text-right text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-blue-200">
                            <span className="font-mono">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                          </div>
                        </div>
                        {exp.description.length > 0 && (
                          <ul className="space-y-2">
                            {exp.description.map((desc, descIndex) => (
                              <li key={descIndex} className="flex items-start gap-3 text-gray-700">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="font-mono text-sm">{desc}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
