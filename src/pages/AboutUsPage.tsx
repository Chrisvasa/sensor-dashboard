"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  resumeUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Robert Johnson",
    role: "Frontend",
    image: "/src/assets/images/robert.jpg?height=400&width=400",
    bio: "Robert is all about fullstack development and loves diving into both the frontend and backend of projects. He’s passionate about programming and is always eager to learn something new. Whether it’s picking up the latest tech or figuring out a tricky problem, Robert is always up for the challenge!",
    resumeUrl: "/src/assets/resumes/robert-johnson-cv.pdf",
  },
  {
    id: 2,
    name: "Christopher Vasankari",
    role: "Frontend",
    image: "/src/assets/images/chris.png?height=400&width=400",
    bio: "Christopher is a fullstack developer who loves problem-solving and programming. He’s passionate about learning new technologies and building all sorts of applications. Mostly focused on .NET and React for now.",
    resumeUrl: "/src/assets/resumes/ChristopherVasankari_CV.pdf",
  },
  {
    id: 3,
    name: "Nicole Nilsson",
    role: "Backend",
    image: "/src/assets/images/Nicolen.jpg?height=400&width=400",
    bio: "Nicole is a quick learner with a strong passion for programming, particularly in embedded systems and backend development. Always eager to expand their knowledge, they enjoy solving complex problems and continuously improving their skills in these areas.",    resumeUrl: "/carol-williams-resume.pdf",
  },
  {
    id: 4,
    name: "Erik Pettersson",
    role: "Embedded",
    image: "/src/assets/images/erkaP.jpg?height=400&width=400",
    bio: "Erik excels in optimizing business operations and fostering a positive company culture.",
    resumeUrl: "/src/assets/resumes/erik-pettersson-cv.pdf",
  },
];

export default function AboutUs() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="flex min-h-screen w-full flex-col px-4 py-8 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-50">
        About Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="text-center text-slate-50">
            <img
              className="w-[200px] h-[200px] rounded-full object-cover mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              src={member.image}
              alt={member.name}
              width={200}
              height={200}
              onClick={() => setSelectedMember(member)}
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-8 text-gray-400 bg-grey w-auto px-4 py-8 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold mb-4">
          Meet the Team Behind the Project
        </h1>
        <p className="text-center mb-6 max-w-4xl">
          We’re a team of four students who love programming and getting
          creative with tech. For our school project, we connected temperature
          sensors to a database and built a cool frontend to display the data in
          real-time. We had a blast working together, tackling challenges, and
          coming up with solutions that made our project shine. We're really
          proud of what we’ve put together and had a great time doing it!
        </p>
      </div>

      <Dialog
        open={selectedMember !== null}
        onOpenChange={() => setSelectedMember(null)}
      >
        {selectedMember && (
          <DialogContent className="sm:max-w-[425px] text-slate-50">
            <DialogHeader>
              <DialogTitle>{selectedMember.name}</DialogTitle>
              <DialogDescription>{selectedMember.role}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <img
                className="w-[150px] h-[150px] rounded-full object-cover mx-auto mb-4"
                src={selectedMember.image}
                alt={selectedMember.name}
                width={150}
                height={150}
              />
              <p className="text-center mb-4 text-slate-50">
                {selectedMember.bio}
              </p>
              <div className="text-center">
                <Button asChild>
                  <a
                    href={selectedMember.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Look At Resume
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
