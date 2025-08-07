"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search, TrendingUp } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: "10 Resume Mistakes That Are Costing You Job Interviews",
    excerpt: "Learn about the most common resume mistakes that prevent you from getting interviews and how to fix them.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    category: "Resume Tips",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "How to Write a Resume Summary That Gets Noticed",
    excerpt: "Craft a compelling professional summary that captures recruiters' attention in the first few seconds.",
    author: "Mike Chen",
    date: "2024-01-12",
    category: "Writing Tips",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 3,
    title: "ATS-Friendly Resume: Complete Guide for 2024",
    excerpt: "Everything you need to know about creating resumes that pass Applicant Tracking Systems.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    category: "ATS Optimization",
    readTime: "10 min read",
    featured: true
  },
  {
    id: 4,
    title: "Remote Work Resume: How to Showcase Virtual Experience",
    excerpt: "Tips for highlighting remote work experience and skills that employers value in the digital age.",
    author: "David Park",
    date: "2024-01-08",
    category: "Remote Work",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 5,
    title: "Career Change Resume: Transitioning to a New Industry",
    excerpt: "Strategic advice for crafting a resume when switching careers or industries.",
    author: "Lisa Thompson",
    date: "2024-01-05",
    category: "Career Change",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 6,
    title: "The Psychology of Resume Design: What Recruiters Really See",
    excerpt: "Understanding how visual design affects recruiter perception and decision-making.",
    author: "Alex Kumar",
    date: "2024-01-03",
    category: "Design",
    readTime: "9 min read",
    featured: false
  }
]

const categories = [
  "All Posts",
  "Resume Tips",
  "Writing Tips", 
  "ATS Optimization",
  "Remote Work",
  "Career Change",
  "Design",
  "Interview Tips"
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Career Advice Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tips, insights, and strategies to help you land your dream job and advance your career.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-teal-600" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-r from-teal-500 to-blue-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                      <Calendar className="h-4 w-4 ml-2" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Stay Updated with Career Tips
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Get the latest career advice and resume tips delivered to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white text-gray-900"
                />
                <Button className="bg-white text-teal-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
