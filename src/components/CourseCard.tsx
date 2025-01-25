import React from "react";
import Image from "next/image";

interface CourseCardProps {
  course: {
    image: string;
    name: string;
  };
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 min-h-[400px] cursor-pointer">
      <div className="w-full h-48 relative mb-4">
        <Image
          src={course.image}
          alt={course.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-lg object-cover"
          priority={index === 0}
        />
      </div>
      <h2 className="text-xl font-bold mb-2 text-black">{course.name}</h2>
      <p className="text-gray-600 mb-4">
        Learn the fundamentals and advanced concepts of {course.name}.
      </p>
      <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
        Coming Soon
      </button>
    </div>
  );
};

export default CourseCard;
