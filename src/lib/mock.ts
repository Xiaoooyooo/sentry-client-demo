export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  cover?: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "深入理解 React Hooks",
    summary:
      "React Hooks 改变了我们编写组件的方式，本文将从原理到实践全面解析 Hooks 的使用技巧与注意事项。",
    content: `React Hooks 自 16.8 版本引入以来，彻底改变了 React 组件的编写方式。它让我们能够在函数组件中使用状态和副作用，而不再依赖类组件。

## useState：状态管理的基础

useState 是最常用的 Hook，它允许我们在函数组件中添加本地状态：

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

每次调用 setCount 时，组件会重新渲染，新的 count 值会在渲染中体现。

## useEffect：处理副作用

useEffect 让我们能够在函数组件中执行副作用操作，比如数据获取、订阅、手动修改 DOM 等：

\`\`\`jsx
useEffect(() => {
  document.title = \`点击了 \${count} 次\`;
}, [count]);
\`\`\`

依赖数组决定了 effect 何时重新执行。空数组意味着只在挂载时执行一次。

## useCallback 与 useMemo

这两个 Hook 用于性能优化，避免不必要的重新计算和函数重建。

## 自定义 Hook

Hooks 最大的威力在于组合。我们可以将逻辑提取到自定义 Hook 中，实现逻辑复用。`,
    author: "张三",
    date: "2026-06-15",
    tags: ["React", "前端", "Hooks"],
  },
  {
    id: 2,
    title: "TypeScript 高级类型体操指南",
    summary:
      "掌握 TypeScript 的高级类型系统，让你的代码更加类型安全，开发体验更上一层楼。",
    content: `TypeScript 的类型系统远比想象中强大。除了基础的类型标注，它还支持条件类型、映射类型、模板字面量类型等高级特性。

## 条件类型

条件类型让我们能够根据类型条件做分支判断：

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<42>;      // false
\`\`\`

## 映射类型

映射类型可以基于旧类型创建新类型：

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型，让我们可以在类型层面操作字符串：

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`;
\`\`\`

## 实战技巧

在实际项目中，善用工具类型和类型推断，可以大幅减少类型标注的负担，同时保持类型安全。`,
    author: "李四",
    date: "2026-06-12",
    tags: ["TypeScript", "前端", "类型系统"],
  },
  {
    id: 3,
    title: "Vite 构建工具深度解析",
    summary:
      "Vite 为什么这么快？从 ESM 预构建到 HMR 热更新，全面解析 Vite 的核心原理。",
    content: `Vite 作为新一代前端构建工具，以其极快的开发体验赢得了广泛好评。它的核心优势来自两个关键设计。

## 开发模式：基于 ESM 的无打包

Vite 在开发模式下不需要打包，而是直接利用浏览器原生 ESM 支持。当浏览器请求一个模块时，Vite 才按需编译并返回。

这意味着无论项目多大，启动速度都极快，因为不需要等待整个项目打包完成。

## 预构建：依赖优化

对于 node_modules 中的依赖，Vite 使用 esbuild 进行预构建，将 CommonJS/UMD 模块转换为 ESM，同时将多个小文件合并以减少请求次数。

## HMR：精准热更新

Vite 的 HMR 是精确到模块级别的。当某个模块修改后，只需要重新请求该模块及其依赖链上的模块，而不需要重新加载整个页面。

## 生产构建：Rollup

生产环境下，Vite 使用 Rollup 进行打包，配合代码分割和 Tree-shaking，生成高效的生产包。`,
    author: "王五",
    date: "2026-06-08",
    tags: ["Vite", "构建工具", "前端工程化"],
  },
  {
    id: 4,
    title: "CSS 容器查询实战",
    summary:
      "容器查询让组件真正实现响应式设计，不再依赖视口宽度，而是根据父容器尺寸自适应。",
    content: `长期以来，CSS 媒体查询只能基于视口尺寸进行响应式设计。容器查询的出现改变了这一局面。

## 为什么需要容器查询？

想象一个卡片组件，它可能出现在宽屏的侧边栏，也可能出现在窄屏的主内容区。使用媒体查询，我们只能根据视口宽度调整，无法根据组件所在容器的实际宽度来适配。

## 基本用法

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}
\`\`\`

## 容器名称

可以为容器命名，在复杂布局中精确选择目标容器：

\`\`\`css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 300px) {
  /* ... */
}
\`\`\`

## 实际应用

容器查询特别适合设计系统中的组件库开发，让每个组件都能独立地响应其所在空间的尺寸变化。`,
    author: "赵六",
    date: "2026-06-03",
    tags: ["CSS", "响应式", "前端"],
  },
  {
    id: 5,
    title: "Node.js 性能优化实践",
    summary:
      "从事件循环到内存管理，分享 Node.js 服务端性能优化的实战经验与调优技巧。",
    content: `Node.js 的单线程事件驱动模型使其在高并发 I/O 场景下表现出色，但也带来了独特的性能挑战。

## 事件循环与阻塞

Node.js 的事件循环是其核心。任何阻塞事件循环的操作都会影响整个进程的响应能力。

关键原则：保持事件循环快速运转。CPU 密集型任务应该拆分到 Worker 线程或子进程中。

## 内存管理

V8 的垃圾回收机制在大多数情况下表现良好，但不当的代码可能导致内存泄漏：

- 闭包持有大对象引用
- 全局变量累积
- 事件监听器未移除

使用 \`--max-old-space-size\` 调整 V8 堆内存上限，使用 \`process.memoryUsage()\` 监控内存。

## 流式处理

对于大文件或大量数据，使用 Stream 而非一次性加载到内存：

\`\`\`javascript
const stream = fs.createReadStream('large-file.txt');
stream.pipe(response);
\`\`\`

## 集群模式

利用 \`cluster\` 模块或 PM2 充分利用多核 CPU，提升吞吐量。`,
    author: "张三",
    date: "2026-05-28",
    tags: ["Node.js", "性能优化", "后端"],
  },
];

export const profile = {
  name: "张三",
  avatar: "",
  bio: "一名热爱技术的前端工程师，专注于 React 生态和前端工程化。喜欢探索新技术，分享实践经验。",
  skills: ["React", "TypeScript", "Node.js", "Vite", "Tailwind CSS"],
  github: "https://github.com/example",
  email: "zhangsan@example.com",
};
