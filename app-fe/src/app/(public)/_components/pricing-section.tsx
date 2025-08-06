export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full flex py-20 flex-col justify-center items-center gap-16"
    >
      <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold">
        All our plans
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {/* Basic Plan */}
        <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 rounded-lg">
          <p className="font-semibold">Basic</p>
          <h1 className="text-3xl font-semibold">
            $0<span className="text-gray-500 text-sm font-normal">/month</span>
          </h1>
          <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
            <li className="flex items-center gap-2">
              {/* check icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>5 dishes free</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Image generation free</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>All access to basic AI tools</p>
            </li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="w-72 bg-primary relative text-center text-white border border-gray-500/30 p-6 rounded-lg">
          <p className="font-semibold pt-2">Pro</p>
          <h1 className="text-3xl font-semibold">
            $19<span className="text-sm font-normal">/month</span>
          </h1>
          <ul className="list-none text-white text-sm mt-6 space-y-1">
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="currentColor"
                />
              </svg>
              <p>100 dishes free</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="currentColor"
                />
              </svg>
              <p>Image generation free</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="currentColor"
                />
              </svg>
              <p>All access to pro AI features</p>
            </li>
          </ul>
          <button
            type="button"
            className="bg-white text-sm w-full py-2 rounded text-primary font-medium mt-7 hover:bg-gray-200 transition-all"
          >
            Get Started
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 rounded-lg">
          <p className="font-semibold">Enterprise</p>
          <h1 className="text-3xl font-semibold">
            $49
            <span className="text-gray-500 text-sm font-normal">/month</span>
          </h1>
          <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Unlimited dishes</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Unlimited image generation</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5L2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>All-access to every feature</p>
            </li>
          </ul>
          <button
            type="button"
            className="bg-primary text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-primary transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
