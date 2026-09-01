import "./index.css";
import "./singularity.css";
import MatterFlux from "./MatterFlux";

const ResearchCredo = () => {
  return (
    <aside
      id="philosophy"
      className="research-credo"
      aria-label="Research philosophy"
    >
      <div className="research-credo-copy">
        <blockquote className="research-credo-quote" lang="zh-Hans">
          <p>“物之生也，若骤若驰；无动而不变，无时而不移。”</p>
          <cite>—《庄子·秋水》</cite>
        </blockquote>

        <p className="research-credo-statement">
          The physical world never stands still, neither should intelligence.
        </p>
      </div>

      <MatterFlux />
    </aside>
  );
};

export default ResearchCredo;
