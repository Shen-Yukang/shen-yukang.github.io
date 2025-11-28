// ResearchProjectShow.tsx / ResearchProjectShow.jsx
import {medicalAIProject} from '@/front_db/details'
import { getImageUrlByKey,getVideoUrlByKey } from '@/utlis/dynamicResourceModules'



function SummaryCard({ title, content }: {title:string,content:string}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-700">{content}</p>
    </div>
  );
}

function BackgroundQA({ q, a }:{q:string,a:string}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2">
      <p className="text-xs font-semibold text-slate-900">{q}</p>
      <p className="mt-1 text-xs text-slate-700">{a}</p>
    </div>
  );
}

function ResearchProjectShow() {

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8 lg:px-16">
      <main className="mx-auto max-w-5xl space-y-10">
        {/* 1. Header */}
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
            Research Project
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {medicalAIProject.title}
          </h1>
          <p className="text-sm text-slate-600">{medicalAIProject.subtitle}</p>
        </header>

        {/* 2. Three-block summary: Problem / Theme / Outcome */}
        <section className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-3">
          <SummaryCard title="Problem" content={medicalAIProject.summary.problem} />
          <SummaryCard title="Theme" content={medicalAIProject.summary.theme} />
          <SummaryCard title="Outcome" content={medicalAIProject.summary.result} />
        </section>

        {/* 3. Background & clinical context */}
        <section className="grid gap-8 lg:grid-cols-[3fr,2fr]">
          {/* Left: text + Q&A */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Background &amp; Clinical Context
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              {medicalAIProject.background.intro}
            </p>

            <div className="mt-4 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Key Questions
              </p>
              {medicalAIProject.background.challenges.map((item) => (
                <BackgroundQA key={item.question} q={item.question} a={item.answer} />
              ))}
            </div>
          </div>

          {/* Right: image placeholders */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-900">
              Data Collection & Labeling Gap
            </h3>

            {/* Dynamic grid (1/2/3 columns depending on screen) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

              {medicalAIProject.background.images?.map((img) => (
                <div
                  key={img.sourceKey}
                  className="rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <div className="aspect-video bg-slate-100">
                    <img
                      src={getImageUrlByKey(img.sourceKey)}
                      alt={img.alt}
                      className="h-full w-full "
                    />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* 4. Contributions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Motivation &amp; Contributions
          </h2>
          <p className="text-sm text-slate-700">
            Instead of treating data scarcity as a fixed limitation, this project asks:{" "}
            <span className="font-medium">
              “What if we design a synthetic-first engine that continuously generates,
              filters, and reuses data to train reliable medical perception models?”
            </span>
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {medicalAIProject.contributions.map((c, idx) => (
              <li key={idx} className="rounded-2xl bg-white p-4 text-sm shadow-sm">
                <p className="font-medium text-slate-900">
                  C{idx + 1} · {c.split(":")[0]}
                </p>
                <p className="mt-1 text-slate-700">{c}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Method design */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Method Design &amp; Data Engine
          </h2>
          <p className="text-sm text-slate-700">
            The system is organized as a high-efficiency data engine plus a safety-aware
            perception module:
          </p>
          <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
            {medicalAIProject.methods.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          
          <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
            <div className="aspect-video rounded-xl bg-slate-200">
              
                {medicalAIProject.methods.images.map((item) => (
                  <img className="flex h-full items-center justify-center text-xs text-slate-500" src={getImageUrlByKey(item.sourceKey)} alt="" />
                ))}
              
              
             
            </div>
          </div>
        </section>

        {/* 6. Evaluation results */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Evaluation &amp; Key Results
          </h2>
          <p className="text-sm text-slate-700">
            We summarize core quantitative results and synthetic→real generalization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalAIProject.resultsImages?.map((fig) => (
              <div
                key={fig.sourceKey}
                className="rounded-2xl overflow-hidden bg-white shadow"
              >
                <div className="aspect-video bg-slate-100">
                  { fig.type === "video"?<video
                      src={getVideoUrlByKey(fig.sourceKey)}
                      controls
                      className="h-full w-full"
                      autoPlay={false}
                      muted={false}
                    />: <img
                    src={getImageUrlByKey(fig.sourceKey)}
                    alt={fig.alt}
                    className="h-full w-full"
                  />}
                </div>
                {fig.caption && (
                  <p className="text-xs text-slate-500 p-3">{fig.caption}</p>
                )}
              </div>
            ))}
          </div>
        </section>

      <img className="flex h-full items-center justify-center text-xs text-slate-500" src="/resut4.png" alt="" />
        {/* 7. Resources & contact */}
        <section className="space-y-3 border-t border-dashed border-slate-200 pt-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Resources &amp; Contact
          </h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            <li>
              <a
                href={medicalAIProject.openSourcedCode}
                className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:border-sky-400 hover:text-sky-700"
              >
                GitHub Code (coming soon)
              </a>
            </li>
            <li>
              <a
                href={medicalAIProject.paper}
                className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:border-sky-400 hover:text-sky-700"
              >
                Paper / Preprint  (coming soon)
              </a>
            </li>
          </ul>
          <p className="text-xs text-slate-500">
            Contact:
            <a
              href={`mailto:${medicalAIProject.contact.email}`}
              style={{textDecoration:"none"}}
              className="font-medium text-sky-700 underline-offset-2 hover:underline"
            >
              {medicalAIProject.contact.email}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default ResearchProjectShow;
