import { ResumeData } from '@/lib/types'

interface ExecutiveTemplateProps {
  data: ResumeData
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-preview">
      <div className="grid grid-cols-3 min-h-screen">
        {/* Left Sidebar - Dark Theme */}
        <div className="bg-gray-900 text-white p-8">
          {/* Profile Photo */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-600 rounded-full"></div>
            </div>
            <h1 className="text-xl font-bold text-center mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-center text-gray-300 text-sm">
              {personalInfo.summary?.split(' ').slice(0, 3).join(' ') || 'Professional Title'}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-blue-400">CONTACT</h2>
            <div className="space-y-3 text-sm">
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">📞</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">✉️</span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">📍</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">💼</span>
                  <span className="text-xs">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-blue-400">SKILLS</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span>{Math.round((skill.level / 5) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full"
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
              <h2 className="text-lg font-semibold mb-4 text-blue-400">EDUCATION</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                    <p className="text-gray-300">{edu.school}</p>
                    <p className="text-gray-400 text-xs">{edu.graduationDate}</p>
                    {edu.gpa && <p className="text-gray-400 text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 p-8">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-400 pb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-400 pb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-blue-400">
                    <div className="absolute w-4 h-4 bg-blue-400 rounded-full -left-2 top-0"></div>
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-blue-600 font-semibold">{exp.company}</p>
                      <p className="text-gray-600 text-sm">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        {exp.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
