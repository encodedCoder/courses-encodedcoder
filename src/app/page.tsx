"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  interface Course {
    image: string;
    name: string;
  }

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/data/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="grid items-center justify-items-center min-h-screen gap-4 sm:gap-8 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-col items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 min-h-[400px]"
            >
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-t-lg object-cover"
                  priority={index === 0} // Add priority to the first image
                />
              </div>
              <h2 className="text-xl font-bold mb-2 text-black">
                {course.name}
              </h2>
              <p className="text-gray-600 mb-4">
                Learn the fundamentals and advanced concepts of {course.name}.
              </p>
              <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
