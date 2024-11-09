function LoginBtn() {
  return (
    <button
      type="button"
      className="focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none leading-normal text-primary transition duration-150 ease-in-out inline-flex min-w-5 items-center justify-center text-blue-900 hover:text-green-800 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4 sm:size-5 mr-1"
        transform="scale(-1 1)"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
        />
      </svg>
      Login
    </button>
  );
}

export default LoginBtn;
