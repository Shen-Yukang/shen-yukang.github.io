# Stage A Memory Substrate: 导师汇报精炼版

Date: 2026-04-29

## 1. 一句话定位

我们不是做一个普通的经验日志库，也不是直接改 VLA。Stage A 的目标是构建一个外部的 embodied memory substrate：把机器人执行经验压缩成可检索、可合并、可遗忘、且有证据支撑的中间表示，在不微调 VLA 的情况下提升决策、规划、恢复和安全行为。

核心贡献可以压缩成一句公式：

\[
\boxed{
\text{Memory lifecycle}
=
\text{marginal decision value}
\;-\;
\text{storage/query cost}
\quad
\text{under risk coverage constraint}
}
\]

也就是：记什么、合并什么、压缩什么、忘掉什么，不由固定 TTL 或相似度单独决定，而由“对未来决策的边际价值”决定，同时安全风险覆盖率不能跌破阈值。

## 2. 核心假设

Embodied 经验不应该只停留在 raw logs，也不应该一开始就通过昂贵训练吸收到 VLA 参数里。更可行的第一步是：

\[
\text{episode trace}
\rightarrow
\text{task-conditioned event}
\rightarrow
\text{candidate memory}
\rightarrow
\text{consolidated substrate item}
\rightarrow
\text{retrieved actionable context}
\]

这个 substrate 的价值体现在四点：

1. 把经验压缩成可复用的任务/物体/操作/机器人/技能条件表示。
2. 检索结果直接服务于 action prior、planner constraint、risk warning、repair suggestion。
3. 生命周期控制让系统在存储和检索预算下保持有效。
4. 每个 memory item 保留 evidence pointer，可以追溯到原始 episode、frame range、state/action trace 和 outcome。

## 3. 系统运行闭环

Stage A 有两个闭环。

### 3.1 在线闭环

在线闭环处理新经验和任务时检索：

```text
Upstream trace
  -> ExperienceInputAdapter
  -> task-conditioned object graph transition
  -> OnlineTraceBuffer
  -> MemoryCandidateBuilder
  -> Retriever finds related memories
  -> LifecycleController writes / merges / ignores
  -> returns context to VLA / planner / safety checker
  -> outcome feedback updates utility
```

用公式表示：

\[
\hat{x}_t = I_\phi(\tau_{t:t+k}, g_t)
\]

\[
\hat{x}_t =
(g_t,\hat{G}_t,a_t,\hat{G}'_t,\hat{y}_t,e_t,\eta_t)
\]

\[
c_t = B_{\text{cand}}(\hat{x}_t)
\]

\[
\mathcal{C}_t = R(q_t,M_t)
\]

\[
M_{t+1}
=
\mathcal{U}_{\text{life}}(M_t,c_t,\mathcal{C}_t,y_t)
\]

其中：

- \(\tau_{t:t+k}\)：上游 episode chunk、视频、状态、动作或 VLA/TAMP trace。
- \(I_\phi\)：可替换的 upstream projector，不要求它是 ground truth。
- \(\hat{x}_t\)：任务条件对象图转移。
- \(c_t\)：候选 memory，不等于长期记忆。
- \(M_t\)：当前 memory substrate。
- \(\mathcal{C}_t\)：检索到的相关 memory context。
- \(y_t\)：真实或评估得到的 outcome feedback。

### 3.2 维护闭环

维护闭环周期性处理已有 memory：

```text
MemoryStore
  -> sample maintenance batch
  -> compute pressure score
  -> propose compress / stub / forget
  -> shadow ablation estimates marginal loss
  -> risk coverage check
  -> accept or reject operation
```

触发条件：

\[
|M| > B_{\text{size}}
\quad \lor \quad
C_{\text{query}} > B_{\text{latency}}
\quad \lor \quad
C_{\text{store}} > B_{\text{storage}}
\quad \lor \quad
t-t_{\text{last}} > B_{\text{period}}
\]

维护时不全量扫描，而是采样：

\[
\mathcal{B}_t \subset M_t
\]

## 4. 关键 IR：从 episode 到 memory item

### 4.1 Experience event

Stage A 不直接把 raw image/video 当长期记忆，而是先投影成任务条件对象图转移：

\[
\boxed{
\hat{x}_t=(g_t,\hat{G}_t,a_t,\hat{G}'_t,\hat{y}_t,e_t,\eta_t)
}
\]

\[
\hat{G}_t=(\hat{V}_t,\hat{E}_t),
\qquad
\hat{G}'_t=(\hat{V}'_t,\hat{E}'_t)
\]

含义：

- \(g_t\)：任务或子目标。
- \(\hat{G}_t,\hat{G}'_t\)：动作前后对象-关系图。
- \(a_t\)：操作、skill 或 VLA action。
- \(\hat{y}_t\)：成功、失败、near miss、risk avoided、repair 等 outcome。
- \(e_t\)：证据指针，指向 frame、video slice、state trace、action trace。
- \(\eta_t\)：置信度、来源、embodiment 信息、缺失字段等元数据。

### 4.2 TOOES 坐标系

经验的可比较性来自显式坐标系：

\[
\text{TOOES}
=
\text{Task}/\text{Object}/\text{Operation}/\text{Embodiment}/\text{Skill}
\]

它不是封闭 ontology，而是让少量 embodied data 可索引、可聚类、可检索、可迁移的工程坐标。

### 4.3 Memory item

长期 memory 的最小形式是：

\[
m_i=(z_i,e_i,c_i)
\]

其中：

- \(z_i\)：内容表示，可是图、符号、embedding、prototype 或 hybrid payload。
- \(e_i\)：证据指针。
- \(c_i\)：生命周期控制状态，如 support count、risk lock、utility、cost、access count。

stub 不是失败，而是低成本可恢复索引：

\[
\mathrm{stub}(m_i)=(\tilde z_i,e_i,\tilde c_i)
\]

## 5. 生命周期目标函数

Memory lifecycle 的目标：

\[
\mathcal{J}(M,R)
=
\alpha C_{\text{store}}(M)
+
\beta C_{\text{query}}(R|M)
-
\gamma U_{\text{act}}(M,R)
\]

约束：

\[
\mathrm{Coverage}_{\text{risk}}(M)\ge \rho_{\min}
\]

解释：

- \(C_{\text{store}}\)：存储大小、索引大小、更新成本、维护成本。
- \(C_{\text{query}}\)：检索延迟、候选数、rerank 成本、context 注入成本。
- \(U_{\text{act}}\)：对任务成功、规划成功、动作准确、恢复和避险的估计收益。
- \(\mathrm{Coverage}_{\text{risk}}\)：风险验证查询集中被正确覆盖的比例。

操作集合：

\[
o \in
\{
\text{write},\text{update},\text{merge},
\text{compress},\text{stub},\text{forget}
\}
\]

每个操作提出新状态：

\[
M'=o(M,x)
\]

接受规则：

\[
\Delta\mathcal{J}(o)
=
\widehat{\mathcal{J}}(M',R')
-
\widehat{\mathcal{J}}(M,R)
<0
\]

并且：

\[
\mathrm{Coverage}_{\text{risk}}(M')\ge \rho_{\min}
\]

如果降低成本但破坏风险覆盖，必须拒绝。

## 6. 写入、合并、巩固、遗忘规则

### 6.1 写入

候选 memory 不冗余且有未来价值时写入：

\[
\text{write}(c_t)
\quad \text{if} \quad
V(c_t)-C(c_t)>\tau_{\text{write}}
\]

\[
V(c_t)
=
\lambda_s\Delta\text{success}
+
\lambda_a\Delta\text{action\_accuracy}
+
\lambda_p\Delta\text{planning}
+
\lambda_r\Delta\text{risk\_coverage}
+
\lambda_e\text{salience}
\]

### 6.2 合并

候选与旧 memory 相似且能增强 abstraction 时合并：

\[
\text{merge}(c_t,m_i)
\quad \text{if} \quad
\mathrm{sim}(c_t,m_i)>\tau_{\text{sim}}
\land
\Delta\mathcal{J}<0
\]

合并只增加支持和抽象质量，不能丢 evidence。

### 6.3 巩固

如果移除某候选会明显伤害决策质量，则提升为 consolidated substrate item：

\[
c_i\rightarrow\mathrm{Consolidated}
\quad \text{if} \quad
\widehat{\mathcal{J}}(M\setminus c_i,R)
-
\widehat{\mathcal{J}}(M,R)
>
\tau_{\text{ltm}}
\]

实际估计方式：shadow ablation、replay 或 validation tasks。

### 6.4 维护压力

对已有 memory \(m_i\) 计算维护压力：

\[
P_i
=
\lambda_c C_i
+
\lambda_o O_i
+
\lambda_d D_i
+
\lambda_n N_i
-
\lambda_u U_i
-
\lambda_r R_i
\]

其中：

- \(C_i\)：存储、检索、context 注入成本。
- \(O_i\)：陈旧性。
- \(D_i\)：冗余度。
- \(N_i\)：噪声或矛盾。
- \(U_i\)：历史决策收益。
- \(R_i\)：风险覆盖贡献。

若：

\[
P_i>\tau_{\text{maintain}}
\]

则进入 compress / stub / forget 候选队列。

### 6.5 遗忘

先做 shadow ablation：

\[
\Delta_i
=
\widehat{\mathcal{J}}(M\setminus m_i,R)
-
\widehat{\mathcal{J}}(M,R)
\]

遗忘规则：

\[
\text{forget}(m_i)
\quad \text{if} \quad
\Delta_i<\tau_{\text{forget}}
\land
\mathrm{Coverage}_{\text{risk}}(M\setminus m_i)\ge\rho_{\min}
\land
\text{shadow\_tests\_pass}(m_i)
\]

若效用低但删除会破坏风险覆盖：

\[
m_i \rightarrow \text{risk-locked stub}
\]

默认降级路径：

\[
\text{active}
\rightarrow
\text{consolidated}
\rightarrow
\text{stub candidate}
\rightarrow
\text{stub}
\rightarrow
\text{archived/deleted}
\]

## 7. 检索流程

查询来自 VLA、planner 或 safety monitor：

\[
q_t=(p_t^{obs},g_t,a_{t-1},\pi_t,r_t)
\]

返回：

\[
\mathcal{M}_t^{ctx}=R(q_t,M_t)
\]

检索输出不是长文本，而是小而可执行的 context：

```text
RetrievedContext =
  relevant memories
  + risk constraints
  + action priors
  + repair suggestions
  + evidence refs
```

Stage A 检索流水线：

1. vector/key recall：用 embedding、TOOES key 或 token match 取候选。
2. structured filter：按 task、object、operation、embodiment、skill、risk type 过滤。
3. risk-priority rerank：安全相关 memory 优先。
4. top-k packaging：只返回可注入 planner/VLA/safety checker 的小上下文。

一个可实现的 rerank score：

\[
S(m_i,q_t)
=
w_v\mathrm{sim}_{vec}(m_i,q_t)
+
w_k\mathrm{match}_{TOOES}(m_i,q_t)
+
w_r\mathrm{risk}(m_i,q_t)
+
w_u U_i
-
w_c C_i
-
w_s\mathrm{stale}_i
\]

取：

\[
\mathcal{M}_t^{ctx}=\mathrm{TopK}_{m_i\in M_t} S(m_i,q_t)
\]

## 8. 风险覆盖

风险覆盖是硬约束：

\[
\mathrm{Coverage}_{\text{risk}}(M)
=
\frac{
\#\text{risk queries correctly covered by }M
}{
\#\text{risk queries}
}
\]

这意味着：

- fixed TTL 不能直接删安全相关经验。
- relevance-only retrieval 不能保证安全边界不丢。
- full episodic memory 虽然不丢，但检索成本会膨胀。
- 我们的方法在预算约束下保留对决策真正有边际价值的 memory。

## 9. 算法复杂度

设：

- \(T\)：一个 episode chunk 的长度。
- \(|V|\)、\(|E|\)：对象图节点数和边数。
- \(N=|M|\)：memory item 数量。
- \(d\)：embedding 维度。
- \(K\)：最终返回的 top-k 数量。
- \(L\)：rerank 候选数。
- \(B=|\mathcal{B}_t|\)：维护 batch 大小。
- \(Q_r\)：risk validation query 数量。
- \(A\)：shadow ablation/replay 的验证任务数。

### 9.1 输入投影

\[
\hat{x}_t=I_\phi(\tau_{t:t+k},g_t)
\]

复杂度依赖上游 projector。对 memory substrate 而言，只把它当作输入边界：

\[
O(\mathrm{Projector}(T))
\]

若 projector 已输出结构化 state/action trace，adapter 主要是规范化：

\[
O(T+|V|+|E|)
\]

### 9.2 graph delta 与 candidate 构造

比较 \(\hat{G}_t\) 与 \(\hat{G}'_t\)：

\[
O(|V|+|E|)
\]

如果需要对象匹配或去重，朴素匹配是：

\[
O(|V|^2+|E|^2)
\]

使用 object id / canonical key 后可降到：

\[
O(|V|+|E|)
\]

### 9.3 检索

朴素全量向量检索：

\[
O(Nd)
\]

ANN 索引近似：

\[
O(d\log N + Ld)
\]

结构化过滤：

\[
O(L)
\]

rerank：

\[
O(L\log L)
\]

如果只维护 top-k heap：

\[
O(L\log K)
\]

因此一次查询的 practical cost：

\[
O(d\log N + Ld + L\log K)
\]

朴素实现上界：

\[
O(Nd + N\log K)
\]

### 9.4 写入/合并

写入单个 candidate：

\[
O(1)+O(\text{index update})
\]

若 index update 是 ANN 插入，近似：

\[
O(d\log N)
\]

合并需要和候选集合比较。若先检索 \(L\) 个近邻：

\[
O(Ld + L)
\]

朴素全量合并判断：

\[
O(Nd)
\]

### 9.5 维护

每次维护只采样 batch：

\[
\mathcal{B}_t\subset M_t,\quad |\mathcal{B}_t|=B
\]

计算压力分数：

\[
O(B)
\]

如果每个 memory 需要局部 redundancy 检查 \(L\) 个近邻：

\[
O(BL)
\]

如果做 shadow ablation，需要跑 \(A\) 个验证任务：

\[
O(BA\cdot C_{\text{eval}})
\]

风险覆盖检查朴素为：

\[
O(Q_r\cdot C_{\text{risk\_query}})
\]

若 risk queries 有索引或按 risk type 分桶，单次操作只检查受影响风险桶：

\[
O(Q_r^{affected}\cdot C_{\text{risk\_query}})
\quad
Q_r^{affected}\ll Q_r
\]

### 9.6 存储复杂度

每个完整 memory：

\[
O(|z_i|+|e_i|+|c_i|+d)
\]

总存储：

\[
O\left(\sum_i |z_i| + \sum_i |e_i| + Nd\right)
\]

stub 后若 payload 被摘要替代：

\[
O(|\tilde z_i|+|e_i|+d),
\quad
|\tilde z_i|\ll |z_i|
\]

压缩收益：

\[
\mathrm{CompressionRatio}
=
\frac{\text{full memory bytes}}
{\text{active + stub + archive index bytes}}
\]

## 10. 对导师讲的算法摘要

可以把算法讲成下面 6 步：

1. Trace projection：把 episode 或 VLA/TAMP/simulator trace 投影成任务条件对象图转移。
2. Candidate building：提取 graph delta、action signature、outcome、risk/repair signature。
3. Retrieval：基于 TOOES、embedding 和结构化条件检索相似经验。
4. Lifecycle decision：用 \(\Delta\mathcal{J}<0\) 判断 write / merge / compress / stub / forget。
5. Risk guard：任何破坏 \(\mathrm{Coverage}_{risk}\ge\rho_{min}\) 的操作都拒绝。
6. Outcome feedback：用后续任务结果更新 support、utility、risk contribution 和 future retrieval priority。

简化伪代码：

```text
for each incoming trace chunk:
    x_hat = Project(trace, goal)
    c = BuildCandidate(x_hat)
    related = Retrieve(query(x_hat), M)
    proposals = ProposeOps(c, related, M)

    for op in proposals:
        M_prime = Apply(op, M)
        if DeltaJ(M_prime, M) < 0 and RiskCoverage(M_prime) >= rho_min:
            M = M_prime

    ctx = PackageTopK(Retrieve(current_query, M))
    send ctx to VLA / planner / safety checker
    update utility using outcome feedback

periodically:
    B = SampleMaintenanceBatch(M)
    for m in B:
        P = Pressure(m)
        if P > tau_maintain:
            test compress / stub / forget by shadow ablation
            accept only if DeltaJ < 0 and risk coverage is preserved
```

## 11. 实验对照

需要比较的不是“有没有 memory”，而是生命周期控制是否在预算下带来更高决策价值。

Baselines：

1. No memory。
2. Full episodic memory without forgetting。
3. Relevance-only retrieval memory。
4. Fixed TTL forgetting。
5. Ours：constrained lifecycle memory substrate。

关键指标：

- Decision：task success、recovery rate、action accuracy、planning success。
- Safety：unsafe action block rate、risk miss rate、risk coverage before/after operation。
- Memory：memory count、retrieval latency、context size、compression ratio、stub ratio、forgotten count。

预期优势：

- 相比 full episodic memory：检索成本更低。
- 相比 relevance-only memory：决策收益和安全边界更稳定。
- 相比 TTL forgetting：更少安全回退和误删。
- 相比 no memory：恢复、规划、避险和动作选择更好。

## 12. 汇报时的核心表述

可以这样讲：

> 我们的 Stage A 不试图训练一个新的 VLA，也不把 memory 简化成 RAG。我们先定义一个外部 substrate，把 embodied experience 投影成 task-conditioned object graph transition，再压缩成候选 memory。生命周期控制器根据边际决策价值、存储/检索成本和风险覆盖约束决定写入、合并、压缩、stub 或遗忘。这样 memory 不是越多越好，而是在固定预算下保留对未来行为真正有用且安全关键的经验。

最核心的三条公式：

\[
\hat{x}_t=(g_t,\hat{G}_t,a_t,\hat{G}'_t,\hat{y}_t,e_t,\eta_t)
\]

\[
\mathcal{J}(M,R)
=
\alpha C_{\text{store}}(M)
+
\beta C_{\text{query}}(R|M)
-
\gamma U_{\text{act}}(M,R)
\]

\[
\Delta\mathcal{J}<0
\quad \land \quad
\mathrm{Coverage}_{\text{risk}}(M')\ge\rho_{\min}
\]

一句话总结：

\[
\boxed{
\text{保留能改变未来决策的经验，压缩冗余经验，保护安全关键经验。}
}
\]
