import { ResumeData } from '@/lib/types'

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-preview">
      <div className="grid grid-cols-3 min-h-screen">
        {/* Left Sidebar */}
        <div className="bg-gray-800 text-white p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="w-12 h-1 bg-teal-400 mb-4"></div>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-teal-400">CONTACT</h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
              {personalInfo.website && <p className="text-teal-400">{personalInfo.website}</p>}
              {personalInfo.linkedin && <p className="text-teal-400">{personalInfo.linkedin}</p>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-teal-400">SKILLS</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span>{Math.round((skill.level / 5) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-teal-400 h-2 rounded-full"
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
              <h2 className="text-lg font-semibold mb-4 text-teal-400">EDUCATION</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-300">{edu.school}</p>
                    <p className="text-gray-400">{edu.graduationDate}</p>
                    {edu.gpa && <p className="text-gray-400">GPA: {edu.gpa}</p>}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">PROFILE</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">EXPERIENCE</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-teal-400">
                    <div className="absolute w-4 h-4 bg-teal-400 rounded-full -left-2 top-0"></div>
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-teal-600 font-medium">{exp.company}</p>
                      <p className="text-gray-600 text-sm">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
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
