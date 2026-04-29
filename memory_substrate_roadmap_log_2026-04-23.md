# Memory Substrate Roadmap Log

Date: 2026-04-23

## Context

This log consolidates the current design discussion around memory for embodied agents and VLA systems. The direction has been narrowed from a broad "memory system" framing to a more concrete engineering path:

- Stage A focuses on the memory substrate itself.
- Stage B focuses on integration interfaces into VLA and planners.
- Stage C focuses on joint optimization of representation and integration.

The current working assumption is that external world knowledge access already exists as a retrieval/search layer, while the novel research target is the consolidation of robot experience into reusable intermediate representations.

## Core Shift

The project is no longer centered on "memory" as generic storage.
Instead, the core target is:

- how to compress experience into reusable IR
- how to preserve 3D spatial and temporal safety-relevant structure
- how to make the resulting substrate actionable for control and reasoning

This avoids collapsing into plain RAG or prompt-only reconsolidation.

## Three-Stage Plan

### Paper-Level Roadmap

The research line should be split into several publishable steps instead of
placing memory substrate, safety, cross-embodiment transfer, fleet learning, and
dataset distillation into one paper.

**Paper 1: Memory Substrate Effectiveness**

Main question:
Can a structured, lifecycle-controlled embodied memory substrate improve
decision-relevant behavior without modifying or fine-tuning the VLA?

Primary focus:

- TOOES-conditioned embodied experience IR
- online trace / candidate item / consolidated substrate separation
- consolidation, retrieval, compression, stubbing, and safe forgetting
- evidence-backed memory items
- comparison against no memory, full episodic memory, relevance-only retrieval,
  and fixed TTL forgetting

Safety scenarios can be used as important evaluation cases, but this paper's
claim is the effectiveness of the substrate mechanism itself.

**Paper 2: Safety Memory**

Main question:
Can safety-specific structured memory reduce unsafe or infeasible actions
without retraining the VLA?

Primary focus:

- failure boundary encoding
- repair memory and repair-guided replanning
- risk-aware retrieval and action blocking / reranking
- success-only memory versus failure-boundary-plus-repair memory
- over-conservatism checks, where unsafe action reduction should not collapse
  task success

This paper can specialize and extend the substrate from Paper 1.

**Later Work**

- cross-embodiment memory IR and training-free transfer
- fleet-level collective memory and cluster aggregation
- memory-to-dataset / model distillation from validated substrate items

These are important paths, but they should not be required for the first
substrate paper.

### Stage A: Memory Substrate

Goal:
Build the memory substrate before deeply modifying the VLA.

Questions to answer:

- What is the right IR unit for embodied experience?
- How should online traces, candidate experience items, and consolidated substrate items be separated?
- How do we extract `state`, `transition`, `boundary`, and `repair` from raw episodes?
- How do we consolidate, merge, retrieve, and promote memories?
- How does safety appear as part of the abstraction, rather than as an isolated add-on?

Expected outputs:

- A stable IR schema
- A storage and retrieval design
- A consolidation pipeline from raw episodes to abstract memory
- Metrics that test whether the memory contains decision-relevant information

Working conclusion:

- `Online trace buffer` stores current episode state for immediate processing and evidence capture.
- `Candidate experience items` store projected TOOES-conditioned fragments that may become reusable memory.
- `Consolidated substrate items` store supported reusable patterns, boundaries, and repair strategies.

The key object is not a raw trajectory, but a compressed unit containing:

- relevant state slice
- transition signature
- boundary signature
- repair signature

### Stage B: Integration Interface

Goal:
Make the memory substrate actionable for VLA and planning systems.

Questions to answer:

- How should external memory first influence VLA behavior?
- Which interface works best: prompt conditioning, reranking, gating, or constraint injection?
- How should memory be translated into TAMP-friendly predicates and constraints?
- What is the path from external memory to internal VLA conditioning?

Expected outputs:

- A clear integration ladder
- Adapters from memory to VLA and TAMP
- Behavioral evaluation showing whether memory actually changes decisions

Working conclusion:

- Short-term integration can use prompt constraints, action reranking, and safety gating.
- Planner integration is easier because memory maps naturally to constraints.
- Deep VLA integration should come after the substrate is validated.

### Stage C: Joint Design

Goal:
Co-design the memory representation and the VLA integration mechanism.

Questions to answer:

- What kind of IR is easiest to tokenize or encode into latent form?
- Which abstractions should stay external, and which should become internal memory tokens?
- Should writing, retrieval, compression, and promotion themselves be learned?
- How should external experience memory interact with online temporal memory inside the VLA?

Expected outputs:

- A memory-aware VLA design
- Learnable retrieval/consolidation/injection behavior
- A system where memory is part of the reasoning process, not just an external scaffold

Working conclusion:

- Stage C should only begin after Stage A and B have produced clear evidence.
- The long-term target is a genuinely memory-conditioned VLA, not just a better prompt pipeline.

## A-Stage Design Focus

### Why Stage A Matters

If Stage A is weak, later token injection or attention integration will only pass low-quality abstractions into the model. The substrate must therefore be independently meaningful before integration work begins.

### Recommended Layering

The substrate should avoid relying on broad cognitive-memory labels such as hot, warm, and cold memory. The engineering layers should instead name the role each layer plays in the pipeline:

- `Online trace buffer`: current episode state, actions, observations, and outcome evidence
- `Candidate experience item`: projected TOOES-conditioned fragments awaiting support, merge, or rejection
- `Consolidated substrate item`: supported reusable patterns, boundaries, repair strategies, and action priors

This layering cleanly separates:

- immediate evidence capture
- candidate experience construction
- reusable decision-relevant substrate

### Recommended IR Contents

Each reusable memory unit should encode:

- `StateSlice`: relevant objects, relations, and agent context
- `TransitionSignature`: action and observed state change
- `BoundarySignature`: unsafe, infeasible, or unstable trigger pattern
- `RepairSignature`: recovery or safer alternative strategy

This is especially important for safety. Safety should not be modeled as a separate memory type; it should emerge from the abstraction over state-action-consequence structure.

### TOOES Conditioning Schema

The current Stage A substrate should use `Task-Object-Operation-Embodiment-Skill`
as an explicit conditioning schema.

This is not meant to be a rigid ontology or the full content of memory. It is
the computable coordinate system that makes embodied experience indexable and
comparable:

- `Task`: the goal or subgoal being pursued
- `Object`: the manipulated or safety-relevant object, including category,
  affordance, properties, and spatial relations
- `Operation`: the attempted action family and parameters
- `Embodiment`: the robot body profile and hardware constraints
- `Skill`: the available capability or controller used to realize the operation

The lifecycle objective should not be expected to discover this structure
implicitly from high-dimensional traces. If the substrate depended only on an
implicit cost function to learn the relevant axes, the problem would become an
IR world-model training problem and would require much more data.

Because embodied interaction data are scarce, Stage A should constrain
lifecycle optimization to the human-specified TOOES schema rather than ask the
cost objective to learn a task-oriented IR world model from raw experience.

Therefore the intended Stage A decomposition is:

- TOOES defines the structured candidate space
- lifecycle cost / utility selects, merges, abstracts, stubs, or forgets memory
- outcome feedback estimates marginal decision value

The future IR world model should be trained from validated substrate items, not
assumed as a prerequisite for this stage.

### Abstraction Level

Memory should not be fully task-agnostic and should not be overly task-specific either.

Recommended center of gravity:

- subtask-conditioned
- embodiment-aware
- safety-relevant

This preserves transferability without losing action relevance.

Useful abstraction layers:

- embodiment-invariant rules
- subtask-level patterns
- task-specific priors

The subtask level is expected to be the best operating point.

## Mathematical / Algorithmic Direction

The substrate should be more than structured logging. It should approximate:

- local state transition behavior
- risk boundaries
- repair opportunities
- action feasibility constraints

Useful modeling views:

- geometric and kinematic constraints
- local transition models
- safe/unsafe/infeasible boundary estimation
- event-level or semi-Markov abstractions
- prototype-based consolidation

Practical algorithmic direction:

1. Convert episodes into object-relation graphs plus event chunks.
2. Extract candidate boundaries from failures and risky transitions.
3. Cluster similar transitions, boundaries, and repairs into prototypes.
4. Score candidate actions using success support and risk penalty.
5. Promote only sufficiently supported and stable abstractions into consolidated substrate items.

This keeps the system grounded in physical interaction rather than generic semantic retrieval.

## Immediate Next Step

The next concrete work item is to define Stage A in implementable terms:

- IR field design
- write/update rules for online traces, candidate items, and consolidated substrate items
- consolidation and promotion logic
- retrieval scoring
- evaluation criteria

The recommended implementation priority is:

1. Define schemas
2. Define consolidation flow
3. Define promotion rules
4. Define retrieval and scoring
5. Only then begin Stage B adapters

## Current Position

The current project stance is:

- external world knowledge retrieval is not the main novelty
- the real contribution is experience consolidation
- safety is a projection of the abstraction, not a disconnected module
- TAMP integration is structurally easier than VLA integration
- VLA internal conditioning remains a later-stage challenge
- fleet-level experience sharing and cluster aggregation are a later paper, not
  part of the current Stage A scope

In short:

The project should first prove that embodied experience can be compressed into a reusable, safety-relevant intermediate representation before trying to inject that representation deeply into a VLA.

## Archived Substrate Hypothesis

The current Stage A hypothesis is:

> In the absence of a reliably generalized embodied model, robot experience
> should first be externalized into a structured, lifecycle-controlled memory
> substrate. This substrate should support immediate adaptation through
> retrieval, constraints, action priors, and repair suggestions. Each memory
> item should remain evidence-backed so that later work can reconstruct labels,
> constraints, preferences, or training examples from the original traces.

This keeps the present work focused on the substrate itself. Fleet-level memory
sharing, cross-robot evolution, and cluster-scale dataset distillation remain
important but should be treated as the next research work after this substrate
stage is validated.
