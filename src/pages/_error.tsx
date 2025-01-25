import { NextPageContext } from "next";
import Link from "next/link";

interface ErrorProps {
  statusCode: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Sorry, something went wrong. Please try again later.
        <Link href="/">
          <a className="text-blue-500 hover:underline">Go back to Home</a>
        </Link>
      </p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
