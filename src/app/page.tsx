"use client";

import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

export default function Home() {
  interface Course {
    image: string;
    name: string;
    isActive: boolean;
    releaseDate: string;
  }

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/data/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="grid items-center justify-items-center min-h-screen gap-4 sm:gap-8 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-col items-center sm:items-start py-8 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
