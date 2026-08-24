# Visual grammars and diagram model

Choose the grammar by the question being answered. Subject matter alone is not enough: the same software system may need a system map for ownership, a hierarchy for calls, and a sequence diagram for runtime behavior.

## Grammar selection

| User needs to see | Grammar | Template type | Organize by |
| --- | --- | --- | --- |
| Components, boundaries, ownership, or context | System map | `map` | containment and proximity |
| Parent/child structure, call hierarchy, or dependencies | Hierarchy | `hierarchy` | levels from root to leaves |
| Ordered execution, branches, or data movement | Flow | `flow` | direction and connector labels |
| Actors interacting over time | Sequence | `sequence` | participants horizontally, time vertically |
| Causes, central problem, effects, and constraints | Causal map | `map` | causes left, problem center, effects right |
| States and allowed transitions | State model | `flow` | states as nodes, conditions as edges |
| Alternatives sharing attributes | Comparison | HTML table or `map` | alternatives as columns or aligned cards |
| Events or phases over time | Timeline | `map` | a single time axis with milestone branches |

Use `map` when spatial meaning, containment, or a non-layered arrangement matters. Use explicit `x` and `y` coordinates to keep that meaning intentional.

## Diagram data

Edit only the JSON inside the template's `diagram-data` element when its existing renderer is sufficient.

```json
{
  "title": "How does a request reach storage?",
  "subtitle": "Confirmed synchronous path; asynchronous audit shown separately",
  "type": "flow",
  "direction": "lr",
  "categories": {
    "entry": { "label": "Entry point", "color": "#55b8ff", "fill": "#112535" },
    "component": { "label": "Component", "color": "#a8e063", "fill": "#172b25" }
  },
  "nodes": [
    {
      "id": "api",
      "label": "API handler",
      "detail": ["POST /orders", "Confirmed"],
      "category": "entry",
      "status": "known"
    },
    {
      "id": "service",
      "label": "Order service",
      "detail": ["Validates and coordinates storage"],
      "category": "component",
      "status": "known"
    }
  ],
  "edges": [
    {
      "from": "api",
      "to": "service",
      "label": "calls",
      "kind": "call"
    }
  ],
  "groups": [
    {
      "id": "runtime",
      "label": "Application runtime",
      "nodeIds": ["api", "service"]
    }
  ],
  "annotations": [
    {
      "label": "Open question",
      "detail": ["Retry ownership is unresolved"],
      "x": 840,
      "y": 560,
      "category": "question"
    }
  ]
}
```

### Top-level fields

- `title`: the question or conclusion the visual answers.
- `subtitle`: optional scope, evidence boundary, or reading hint.
- `type`: `flow`, `hierarchy`, `sequence`, or `map`.
- `direction`: `lr` or `tb` for `flow` and `hierarchy`.
- `categories`: semantic styles used by nodes and annotations. Give every category a visible label as well as a color.
- `nodes`: the principal actors, components, states, events, or concepts.
- `edges`: relationships or sequence messages.
- `groups`: optional named boundaries calculated from their member nodes.
- `annotations`: optional compact notes placed with explicit coordinates.

### Node fields

- `id`: unique stable identifier.
- `label`: short primary label.
- `detail`: string or short array of supporting lines.
- `category`: key from `categories`.
- `status`: `known`, `inferred`, `proposed`, or `unknown`. Non-known statuses receive a visible line treatment and status label.
- `x`, `y`: top-left position for `map`; ignored by automatic layouts when omitted.
- `rank`: optional layer override for `flow` or `hierarchy`.
- `order`: optional ordering within a layer or sequence participants.

### Edge fields

- `from`, `to`: node identifiers.
- `label`: relationship, condition, payload, or message.
- `kind`: semantic hint such as `call`, `data`, `dependency`, `return`, or `causes`.
- `dashed`: optional boolean; `return` edges are dashed automatically.
- `color`: optional explicit stroke color.
- `bidirectional`: optional boolean for relationships that genuinely operate both ways.

## Composition rules

- Architecture: draw system boundaries before internal components; place external actors outside them.
- Call hierarchy: make the entry point the root; label asynchronous calls, callbacks, recursion, and skipped layers explicitly.
- Execution flow: keep the happy path visually dominant and branch failures or retries away from it.
- Sequence: use one message per edge in time order; distinguish calls from returns with line style and wording.
- Problem framing: place the problem or decision at the center, causes and evidence to the left, effects to the right, and constraints or unknowns below.
- Dependency graph: orient edges consistently as either “depends on” or “is used by”; state the chosen reading direction.
- Timeline: keep a single time direction and attach consequences or decisions to the event that caused them.

When a diagram grows beyond roughly twelve primary nodes, collapse detail into boundaries, make a second focused region, or split the artifact. Do not solve density by shrinking text until it is difficult to read.
