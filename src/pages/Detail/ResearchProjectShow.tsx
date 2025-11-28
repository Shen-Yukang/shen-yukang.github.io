// ResearchProjectShow.tsx / ResearchProjectShow.jsx
import {medicalAIProject} from '@/front_db/details'
import { ProjectHeader } from '@/components/Research/ProjectHeader';
import { SummarySection } from '@/components/Research/SummarySection';
import { BackgroundSection } from '@/components/Research/BackgroundSection';
import { MethodSection } from '@/components/Research/MethodSection';
import { ResultsSection } from '@/components/Research/ResultsSection';
import { ResourcesSection } from '@/components/Research/ResourcesSection';

function ResearchProjectShow() {

    return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8 lg:px-16">
      <main className="mx-auto max-w-5xl space-y-10">
        <ProjectHeader project={medicalAIProject} />
        <SummarySection project={medicalAIProject} />
        <ResultsSection project={medicalAIProject} />
        <BackgroundSection project={medicalAIProject} />
        <MethodSection project={medicalAIProject} />
        

        {/* 如果底部单独的 png 还要保留，可以专门做个 small section 或挪到 ResultsSection 里 */}
        {/* <img className="..." src="/resut4.png" alt="" /> */}

        <ResourcesSection project={medicalAIProject} />
      </main>
    </div>
  );
}

export default ResearchProjectShow;



