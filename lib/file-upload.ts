export interface UploadedFile {
  name: string
  size: number
  type: string
  content: string
}

export const parseResumeFile = async (file: File): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      // Simulate parsing resume content
      const mockData = {
        personalInfo: {
          fullName: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          location: 'New York, NY',
          summary: 'Experienced professional with 5+ years in software development and project management.'
        },
        experience: [
          {
            id: '1',
            jobTitle: 'Senior Software Engineer',
            company: 'Tech Corp',
            location: 'New York, NY',
            startDate: '2020-01',
            endDate: '2024-01',
            current: false,
            description: [
              'Led development of microservices architecture serving 1M+ users',
              'Improved system performance by 40% through optimization',
              'Mentored 5 junior developers and conducted code reviews'
            ]
          }
        ],
        education: [
          {
            id: '1',
            degree: 'Bachelor of Computer Science',
            school: 'University of Technology',
            location: 'New York, NY',
            graduationDate: '2019-05'
          }
        ],
        skills: [
          { id: '1', name: 'JavaScript', level: 5 },
          { id: '2', name: 'React', level: 4 },
          { id: '3', name: 'Node.js', level: 4 },
          { id: '4', name: 'Python', level: 3 }
        ]
      }
      
      setTimeout(() => resolve(mockData), 1500)
    }
    reader.readAsText(file)
  })
}
