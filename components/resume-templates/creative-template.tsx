import { ResumeData } from '@/lib/types'

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-preview">
      {/* Header with Colorful Design */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-8 text-white">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white/30 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xl opacity-90">
              {personalInfo.summary?.split('.')[0] || 'Creative Professional'}
            </p>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 mt-6 text-sm">
          {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                  SKILLS
                </h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-purple-600">{skill.level}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-2 rounded-full ${
                              i < skill.level ? 'bg-purple-600' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-pink-500 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-4 border-pink-500 pl-4">
                      <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-pink-600 font-medium">{edu.school}</p>
                      <p className="text-gray-600 text-sm">{edu.graduationDate}</p>
                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
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
                <h2 className="text-2xl font-bold text-orange-500 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                  ABOUT ME
                </h2>
                <p className="text-gray-700 leading-relaxed bg-orange-50 p-4 rounded-lg">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                  EXPERIENCE
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                            <p className="text-purple-600 font-semibold">{exp.company}</p>
                            {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                          </div>
                          <div className="text-right text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                        </div>
                        {exp.description.length > 0 && (
                          <ul className="space-y-2">
                            {exp.description.map((desc, descIndex) => (
                              <li key={descIndex} className="flex items-start gap-2 text-gray-700">
                                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{desc}</span>
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
