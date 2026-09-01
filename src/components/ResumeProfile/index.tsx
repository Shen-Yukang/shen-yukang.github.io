import "./index.css";

const education = [
  {
    institution: "Kennesaw State University",
    degree: "M.S. in Software Engineering",
    period: "Jan. 2025 - Nov. 2026 (expected)",
    gpa: "3.77/4.00",
  },
  {
    institution: "Heilongjiang University",
    degree: "B.E. in Computer Network Engineering",
    period: "Sep. 2016 - Jul. 2020",
    gpa: "8.129/10.0",
  },
] as const;

const experience = [
  {
    organization: "City University of Hong Kong",
    role: "Research Assistant (Product Developer)",
    period: "Nov. 2024 - Jan. 2025",
    bullets: [
      "Researched Snowflake and comparable data platforms and use cases, then aligned research on federated learning and encrypted data transactions with product requirements.",
      "Developed the cross-institutional data marketplace, including access-control and transaction-audit workflows.",
    ],
  },
  {
    organization: "SenseTime Group Limited",
    role: "Software Engineer",
    period: "Nov. 2020 - Sep. 2023",
    bullets: [
      "Delivered numerous internal and commercial products; several served 5,000+ users.",
      "Built recruitment and onboarding systems, a company-wide office automation portal, business intelligence platforms, interactive annual-report applications, and smart meeting-room systems across desktop, web, mobile, and integrated hardware.",
      "Mentored 5 interns; named the department's best employee of the year in 2022.",
    ],
  },
] as const;

const honors = [
  {
    institution: "Kennesaw State University",
    distinction: "Second Place, KSU C-Day Computing Showcase, Fall 2025",
  },
  {
    institution: "Heilongjiang University",
    distinction:
      "National Encouragement Scholarship; First-Class Scholarship, 2018, 2019",
  },
] as const;

const presentations = [
  {
    title: "MemoryEIL: An Enhanced Memory Layer Architecture for Heterogeneous Robots",
    venue: "KSU C-Day Computing Showcase",
    period: "Spring 2026",
  },
  {
    title: "A Synthetic Data Engine for Explainable Injection-Area Perception",
    venue: "KSU C-Day Computing Showcase",
    period: "Fall 2025",
  },
  {
    title: "XR Agent: An MLLM-Powered Extended-Reality System on Meta Quest 3",
    venue: "KSU C-Day Computing Showcase",
    period: "Spring 2025",
  },
] as const;

const skillGroups = [
  {
    label: "AI Research",
    skills: [
      "Python",
      "PyTorch",
      "ROS",
      "AI2-THOR",
      "Isaac Sim",
      "MuJoCo",
      "LIBERO",
      "continual and reinforcement learning",
      "VLA models",
      "embodied memory and retrieval",
      "multimodal perception",
      "synthetic data",
      "model evaluation",
      "sim-to-real",
    ],
  },
  {
    label: "Product Development",
    skills: [
      "TypeScript",
      "React",
      "Python",
      "Node.js",
      "CI/CD",
      "requirements engineering",
      "project management",
    ],
  },
] as const;

const ResumeProfile = () => {
  return (
    <section className="resume-profile" aria-labelledby="resume-profile-title">
      <header className="resume-profile__heading">
        <p>Curriculum Vitae</p>
        <h2 id="resume-profile-title">Background</h2>
      </header>

      <div className="resume-profile__layout">
        <div className="resume-profile__primary">
          <section
            className="resume-profile__section"
            aria-labelledby="resume-education-title"
          >
            <h3 id="resume-education-title" className="resume-profile__section-title">
              <span aria-hidden="true">01</span>
              Education
            </h3>

            <div className="resume-profile__education-list">
              {education.map((item) => (
                <article
                  className="resume-profile__education-item"
                  key={item.institution}
                >
                  <div className="resume-profile__item-heading">
                    <h4>{item.institution}</h4>
                    <span className="resume-profile__period">{item.period}</span>
                  </div>
                  <p>{item.degree}</p>
                  <p className="resume-profile__gpa">GPA: {item.gpa}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="resume-profile__section"
            aria-labelledby="resume-experience-title"
          >
            <h3 id="resume-experience-title" className="resume-profile__section-title">
              <span aria-hidden="true">02</span>
              Professional Experience
            </h3>

            <div className="resume-profile__timeline">
              {experience.map((item) => (
                <article className="resume-profile__role" key={item.organization}>
                  <div className="resume-profile__item-heading">
                    <h4>{item.organization}</h4>
                    <span className="resume-profile__period">{item.period}</span>
                  </div>
                  <p className="resume-profile__role-name">{item.role}</p>
                  <ul className="resume-profile__bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="resume-profile__supporting">
          <section
            className="resume-profile__section"
            aria-labelledby="resume-honors-title"
          >
            <h3 id="resume-honors-title" className="resume-profile__section-title">
              <span aria-hidden="true">03</span>
              Honors
            </h3>

            <ul className="resume-profile__honors">
              {honors.map((item) => (
                <li key={item.institution}>
                  <strong>{item.institution}</strong>
                  <span>{item.distinction}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="resume-profile__section"
            aria-labelledby="resume-presentations-title"
          >
            <h3
              id="resume-presentations-title"
              className="resume-profile__section-title"
            >
              <span aria-hidden="true">04</span>
              Selected Presentations
            </h3>

            <ol className="resume-profile__presentations">
              {presentations.map((item) => (
                <li key={item.title}>
                  <h4>{item.title}</h4>
                  <p>
                    {item.venue}
                    <span aria-hidden="true"> / </span>
                    {item.period}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="resume-profile__section"
            aria-labelledby="resume-skills-title"
          >
            <h3 id="resume-skills-title" className="resume-profile__section-title">
              <span aria-hidden="true">05</span>
              Skills
            </h3>

            <dl className="resume-profile__skills">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>
                    <ul aria-label={`${group.label} skills`}>
                      {group.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </section>
  );
};

export default ResumeProfile;
