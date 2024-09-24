'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  resumeUrl: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Robert Johnson",
    role: "Frontend",
    image: "/src/assets/images/clownbert.png?height=400&width=400",
    bio: "Robert has over 15 years of experience in tech leadership and is passionate about creating innovative solutions.",
    resumeUrl: "/src/assets/resumes/robert-johnson-cv.pdf"
  },
  {
    id: 2,
    name: "Christopher Vasankari",
    role: "Frontend",
    image: "/src/assets/images/oldchum.png?height=400&width=400",
    bio: "Christopher is a full-stack developer with a keen interest in AI and machine learning technologies.",
    resumeUrl: "/bob-smith-resume.pdf"
  },
  {
    id: 3,
    name: "Nicole Nilsson",
    role: "Backend",
    image: "/src/assets/images/Nicolen.jpg?height=400&width=400",
    bio: "Nicole brings her extensive experience in finance to help guide our company's growth and investment strategies.",
    resumeUrl: "/carol-williams-resume.pdf"
  },
  {
    id: 4,
    name: "Erik Pettersson",
    role: "Embedded",
    image: "/src/assets/images/erkaP.jpg?height=400&width=400",
    bio: "Erik excels in optimizing business operations and fostering a positive company culture.",
    resumeUrl: "/src/assets/resumes/erik-pettersson-cv.pdf"
  }
]

export default function AboutUs() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <div className="flex min-h-screen w-full flex-col px-4 py-8 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-50">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="text-center text-slate-50">
            <img
              src={member.image}
              alt={member.name}
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedMember(member)}
              style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-8 text-gray-400 bg-grey w-auto px-4 py-8 md:px-6 md:py-10">
  <h1 className="text-2xl font-bold mb-4">Meet the Team Behind the Project</h1>
  <p className="text-center mb-6 max-w-4xl">
  What the fuck did you just fucking say about me, you little bitch? 
  I'll have you know I graduated top of my class in the Navy Seals, 
  and I've been involved in numerous secret raids on Al-Quaeda, 
  and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. 
  You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth,
  mark my fucking words. You think you can get away with saying that shit to me over the Internet?
  Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. 
  The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, 
  and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, 
  you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.
  </p>
      </div>

      <Dialog open={selectedMember !== null} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="sm:max-w-[425px] text-slate-50">
            <DialogHeader>
              <DialogTitle>{selectedMember.name}</DialogTitle>
              <DialogDescription>{selectedMember.role}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <p className="text-center mb-4 text-slate-50">{selectedMember.bio}</p>
              <div className="text-center">
                <Button asChild>
                  <a href={selectedMember.resumeUrl} target="_blank" rel="noopener noreferrer">
                    Look At Resume
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
