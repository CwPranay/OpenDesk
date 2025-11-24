export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white py-20 px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            About OpenDesk
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A minimal, powerful, and distraction-free workspace designed for developers who value speed, clarity, and great design.
          </p>
        </header>

        {/* Big Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/70 backdrop-blur-xl border border-gray-700/60 rounded-3xl p-10 shadow-2xl">

          {/* Section: What is OpenDesk */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">What is OpenDesk?</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              OpenDesk is a lightweight project management space tailored for developers. 
              No unnecessary features, no clutter — just clean UI, fast workflows, and everything you need 
              to stay organized while building and learning.
            </p>
          </section>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-16"></div>

          {/* Section: Why */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Why It Exists</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Most productivity apps try to do everything and end up doing nothing well. 
              Developers need a space that is fast, minimal, and powerful without bloated UI.
              OpenDesk was created with a single goal — <span className="text-indigo-400">focus on building, not managing tools.</span>
            </p>
          </section>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-16"></div>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">What You Get</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Clean, Modern UI", desc: "A distraction-free interface designed for speed and clarity." },
                { title: "Secure Auth", desc: "Clerk-powered authentication ensures your data stays safe." },
                { title: "Express + MongoDB Backend", desc: "Fast APIs and scalable data storage built for developers." },
                { title: "Project Organization", desc: "Create, manage, and explore your projects effortlessly." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-gradient-to-br from-gray-800/60 to-gray-900/40 border border-gray-700/50 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold mb-2 text-indigo-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-16"></div>

          {/* Vision */}
          <section>
            <h2 className="text-3xl font-semibold mb-4">The Vision</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              OpenDesk is just getting started. The long-term vision includes deeper GitHub integrations,
              task workflows, progress analytics, personalized dashboards, and a cleaner ecosystem for teams.
              The goal is simple: <span className="text-indigo-400">A workspace you actually enjoy using.</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
