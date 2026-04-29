import { useParams } from 'react-router-dom';
import { medicalAIProject, projectDetailsById } from '@/front_db/details';
import { ProjectHeader } from '@/components/Research/ProjectHeader';
import { SummarySection } from '@/components/Research/SummarySection';
import { BackgroundSection } from '@/components/Research/BackgroundSection';
import { MethodSection } from '@/components/Research/MethodSection';
import { ResultsSection } from '@/components/Research/ResultsSection';
import { ResourcesSection } from '@/components/Research/ResourcesSection';

function ResearchProjectShow() {
  const { id } = useParams();
  const project = id ? projectDetailsById[id] ?? medicalAIProject : medicalAIProject;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8 lg:px-16">
      <main className="mx-auto max-w-5xl space-y-10">
        <ProjectHeader project={project} />
        <SummarySection project={project} />
        <ResultsSection project={project} />
        <BackgroundSection project={project} />
        <MethodSection project={project} />
        <ResourcesSection project={project} />
      </main>
    </div>
  );
}
export default ResearchProjectShow;
