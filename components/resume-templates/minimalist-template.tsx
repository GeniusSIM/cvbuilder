import { ResumeData } from '@/lib/types'

interface MinimalistTemplateProps {
  data: ResumeData
}

export function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg" id="resume-preview">
      {/* Header */}
      <div className="text-center mb-12 pb-8 border-b border-gray-200">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
            EXPERIENCE
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-1">{exp.jobTitle}</h3>
                <p className="text-gray-600 mb-2">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                {exp.description.length > 0 && (
                  <div className="max-w-2xl mx-auto">
                    {exp.description.map((desc, index) => (
                      <p key={index} className="text-gray-700 mb-2 text-sm leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
            SKILLS
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm tracking-wide"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
            EDUCATION
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
