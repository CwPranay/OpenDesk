export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white py-12 px-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About OpenDesk</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A simple, fast, and modern workspace to manage all your personal and
            development projects in one place.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 md:p-10 shadow-xl">
          
          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">What is OpenDesk?</h2>
            <p className="text-gray-400 leading-relaxed">
              OpenDesk is a minimal and productivity-focused project manager that helps
              you organize your ideas, track progress, and store your projects with
              clean UI and zero clutter. Whether you're building web apps, learning new
              skills, or just storing ideas — OpenDesk keeps everything structured and easy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Why I Built It</h2>
            <p className="text-gray-400 leading-relaxed">
              Most project tools are bloated, slow, or overcomplicated. As developers, we
              just need something fast, clean, and reliable. OpenDesk was built to solve
              that — a personal dashboard that actually stays out of your way but helps you
              work better.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Features</h2>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Simple & distraction-free UI</li>
              <li>Create, manage, and explore projects</li>
              <li>Secure authentication using Clerk</li>
              <li>Fast backend powered by Express + MongoDB</li>
              <li>Modern design with smooth interactions</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">The Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              OpenDesk will continue evolving into a complete developer workspace —  
              with better analytics, GitHub integrations, task workflows, and team
              collaboration in the future. This is only the beginning.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
