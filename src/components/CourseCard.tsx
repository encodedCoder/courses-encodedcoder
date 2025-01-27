import React from "react";
import Image from "next/image";
import styles from "./CourseCard.module.css";

interface CourseCardProps {
  course: {
    image: string;
    name: string;
    isActive: boolean;
    releaseDate: string;
  };
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  return (
    <div
      className={`${styles.card} ${
        !course.isActive ? styles.cardInactive : ""
      }`}
    >
      <div className={styles.cardImage}>
        <Image
          src={course.image}
          alt={course.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-lg object-cover"
          priority={index === 0}
        />
      </div>
      <h2 className={styles.cardTitle}>{course.name}</h2>
      <p className={styles.cardDescription}>
        Learn the fundamentals and advanced concepts of {course.name}.
      </p>
      <button className={styles.cardButton}>{course.releaseDate}</button>
    </div>
  );
};

export default CourseCard;
