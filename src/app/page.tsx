export default function Home() {
  const courses = [
    "C-Programming",
    "C++ Programming",
    "Python Programming",
    "Data Structure and Algorithms with C++",
    "C++ STL",
    "Data Structures and Algorithms with Python",
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        {/* <h1 className="text-2xl font-bold">Courses - encodedCoder · Suresh</h1> */}
        <ul className="list-disc list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {courses.map((course, index) => (
            <li key={index} className="mb-2">
              {course}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
