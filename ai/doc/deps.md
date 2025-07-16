# Dependencies Documentation

This document contains comprehensive documentation for the key dependencies used in this project, fetched from Context7 MCP server.

## Table of Contents

1. [Next.js](#nextjs)
2. [React](#react)
3. [Tailwind CSS](#tailwind-css)
4. [Zod](#zod)
5. [React Hook Form](#react-hook-form)
6. [Other Dependencies](#other-dependencies)

---

## Next.js

Next.js is a React framework that provides production-ready features like server-side rendering, API routes, and file-based routing.

### Key Features

- **Server Components**: Efficient server-side data fetching and rendering
- **Client Components**: Interactive UI with browser APIs
- **API Routes**: Create serverless API endpoints
- **Server-Side Rendering**: Pre-render pages on the server
- **File-based Routing**: Automatic routing based on file structure
- **Built-in Optimization**: Image optimization, code splitting, font optimization
- **Streaming**: Progressive UI rendering with Suspense
- **Middleware**: Request/response processing

### App Router vs Pages Router

Next.js supports two routing systems:

#### App Router (Recommended)
- **File Convention**: `app/` directory
- **Server Components by default**
- **Layouts**: Shared UI across pages
- **Route Handlers**: `app/api/route.js`
- **Loading UI**: Built-in loading states
- **Error Handling**: `error.js` and `not-found.js`

#### Pages Router (Legacy)
- **File Convention**: `pages/` directory
- **API Routes**: `pages/api/*.js`
- **Custom Error Pages**: `pages/404.js`, `pages/500.js`

### Server Components

Server Components run on the server and can directly access databases and APIs:

```typescript
// Server Component - runs on server
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```typescript
// Database access in Server Component
import { db, posts } from '@/lib/db'

export default async function Page() {
  const allPosts = await db.select().from(posts)
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### Client Components

Client Components run in the browser and have access to browser APIs:

```typescript
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### Data Fetching Strategies

#### Static Data (like getStaticProps)
```typescript
// Cached until manually invalidated
const staticData = await fetch('https://...', { cache: 'force-cache' });
```

#### Dynamic Data (like getServerSideProps)
```typescript
// Refetched on every request
const dynamicData = await fetch('https://...', { cache: 'no-store' });
```

#### Incremental Static Regeneration (ISR)
```typescript
// Cached with revalidation
const revalidatedData = await fetch('https://...', {
  next: { revalidate: 60 } // Revalidate every 60 seconds
});
```

### Layouts

Layouts share UI across multiple pages:

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>Navigation</nav>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  )
}
```

### Route Handlers (App Router API Routes)

```typescript
// app/api/posts/route.ts
export async function GET(request: Request) {
  const posts = await getPosts();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await createPost(body);
  return Response.json(post, { status: 201 });
}
```

### Dynamic Routes

```typescript
// app/blog/[slug]/page.tsx
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  return <h1>{post.title}</h1>
}

// Generate static params
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

### Navigation

#### Link Component
```typescript
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  )
}
```

#### Programmatic Navigation
```typescript
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/dashboard')}>
      Go to Dashboard
    </button>
  )
}
```

### Loading and Error States

#### Loading UI
```typescript
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

#### Error Handling
```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Streaming with Suspense

```typescript
import { Suspense } from 'react'
import Posts from './posts'

export default function Page() {
  return (
    <div>
      <h1>Blog</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
    </div>
  )
}
```

### Middleware

```typescript
import type { NextRequest } from 'next/server';
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Add authentication logic
  if (!request.cookies.get('token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*'
};
```

### Image Optimization

```typescript
import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority // Load immediately
    />
  )
}
```

### Font Optimization

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Metadata API

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'My awesome Next.js app',
  openGraph: {
    title: 'My App',
    description: 'My awesome Next.js app',
    images: ['/og-image.jpg'],
  },
}

export default function Page() {
  return <h1>Welcome to My App</h1>
}
```

### Server Actions

```typescript
// Server Action
async function createPost(formData: FormData) {
  'use server'

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.post.create({
    data: { title, content }
  })

  redirect('/posts')
}

// Form component
export default function CreatePost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  )
}
```

### Performance Optimization

#### Bundle Analysis
```bash
npm install @next/bundle-analyzer
```

#### Dynamic Imports
```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <p>Loading...</p>,
})
```

### Production Checklist

1. **Use Server Components** for data fetching
2. **Optimize images** with Next.js Image component
3. **Implement proper error handling** with error.js files
4. **Use layouts** for shared UI
5. **Enable caching** for static data
6. **Implement loading states** with loading.js
7. **Optimize fonts** with next/font
8. **Generate sitemaps** and robots.txt
9. **Use TypeScript** for type safety
10. **Implement proper SEO** with Metadata API

---

## React

React is a JavaScript library for building user interfaces with a component-based architecture and declarative programming model.

### Core Concepts

- **Components**: Reusable UI building blocks
- **JSX**: JavaScript syntax extension for describing UI
- **Props**: Data passed to components
- **State**: Component's internal data that can change
- **Hooks**: Functions that let you use React features
- **Context**: Share data across component tree
- **Effects**: Handle side effects and lifecycle events

### React Hooks API Reference

React Hooks are functions that let you "hook into" React features from function components:

#### State Hooks
- **`useState`**: Manage local component state
- **`useReducer`**: Manage complex state with reducer pattern

#### Context Hooks
- **`useContext`**: Read and subscribe to React Context

#### Ref Hooks
- **`useRef`**: Reference DOM elements or store mutable values
- **`useImperativeHandle`**: Customize ref exposure to parent components

#### Effect Hooks
- **`useEffect`**: Perform side effects and handle lifecycle
- **`useLayoutEffect`**: Synchronous effects before browser paint
- **`useInsertionEffect`**: Effects for CSS-in-JS libraries

#### Performance Hooks
- **`useMemo`**: Memoize expensive calculations
- **`useCallback`**: Memoize function definitions
- **`useTransition`**: Mark updates as non-urgent
- **`useDeferredValue`**: Defer non-critical updates

#### Other Hooks
- **`useId`**: Generate unique IDs for accessibility
- **`useDebugValue`**: Display custom hook labels in DevTools
- **`useSyncExternalStore`**: Subscribe to external stores
- **`useActionState`**: Manage form action state
- **`useOptimistic`**: Optimistic UI updates

### useState Hook

The `useState` Hook allows functional components to manage local state:

```javascript
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me
      {' '}
      {count}
      {' '}
      times
    </button>
  );
}
```

#### useState API Reference

```javascript
const [state, setState] = useState(initialState);
```

**Parameters:**
- `initialState`: Initial value (can be a function for lazy initialization)

**Returns:**
- Array with current state and setter function

**Setter function behavior:**
- `setState(newValue)`: Updates state and triggers re-render
- `setState(prevValue => newValue)`: Functional update for state dependent on previous value

### Multiple State Variables

```javascript
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name}</i>
        {' '}
        by
        {sculpture.artist}
      </h2>
      <h3>
        (
        {index + 1}
        {' '}
        of
        {sculptureList.length}
        )
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'}
        {' '}
        details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
```

### useReducer Hook

For complex state logic, use `useReducer`:

```javascript
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
```

### useContext Hook

Share data across the component tree without prop drilling:

```javascript
import { createContext, use, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext value={theme}>
      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light');
          }}
        />
        Use dark mode
      </label>
    </ThemeContext>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = use(ThemeContext);
  const className = `panel-${theme}`;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }) {
  const theme = use(ThemeContext);
  const className = `button-${theme}`;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```

#### useContext API Reference

```javascript
const value = use(SomeContext);
```

**Parameters:**
- `SomeContext`: Context created with `createContext`

**Returns:**
- Current context value from nearest Provider above

**Important Notes:**
- Must be called at component top level
- Automatically re-renders when context value changes
- Returns `defaultValue` if no Provider found

### Context with useReducer Pattern

Combine Context with useReducer for global state management:

```javascript
// TasksContext.js
import { createContext, use, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}

export function useTasks() {
  return use(TasksContext);
}

export function useTasksDispatch() {
  return use(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  // ... reducer logic
}
```

```javascript
// TaskList.js
import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}
      >
        Delete
      </button>
    </label>
  );
}
```

### useEffect Hook

Handle side effects and component lifecycle:

```javascript
import { useEffect, useState } from 'react';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]); // Dependencies

  return (
    <>
      <label>
        Server URL:
        {' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>
        Welcome to the
        {roomId}
        {' '}
        room!
      </h1>
    </>
  );
}
```

#### useEffect API Reference

```javascript
useEffect(setup, dependencies?)
```

**Parameters:**
- `setup`: Function with effect logic, optionally returns cleanup function
- `dependencies`: Optional array of reactive values

**Effect Patterns:**
- No dependencies: Runs after every render
- Empty array `[]`: Runs once after mount
- With dependencies: Runs when dependencies change

### Custom Hooks

Extract and reuse stateful logic:

```javascript
// useFormInput.js
import { useState } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value,
    onChange: handleChange
  };

  return inputProps;
}
```

```javascript
// Form component using custom hook
import { useFormInput } from './useFormInput.js';

export default function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p>
        <b>
          Good morning,
          {firstNameProps.value}
          {' '}
          {lastNameProps.value}
          .
        </b>
      </p>
    </>
  );
}
```

### Performance Optimization

#### useMemo Hook

Memoize expensive calculations:

```javascript
import { useMemo } from 'react';

function TodoList({ todos, filter }) {
  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);

  return (
    <ul>
      {visibleTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

#### useCallback Hook

Memoize function definitions:

```javascript
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post(`/product/${productId}/buy`, {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

### Form Handling

#### Controlled Components

```javascript
import { useState } from 'react';

export default function Form() {
  const [form, setForm] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });

  return (
    <>
      <label>
        First name:
        <input
          value={form.firstName}
          onChange={(e) => {
            setForm({
              ...form,
              firstName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Last name:
        <input
          value={form.lastName}
          onChange={(e) => {
            setForm({
              ...form,
              lastName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Email:
        <input
          value={form.email}
          onChange={(e) => {
            setForm({
              ...form,
              email: e.target.value
            });
          }}
        />
      </label>
      <p>
        {form.firstName}
        {' '}
        {form.lastName}
        {' '}
        (
        {form.email}
        )
      </p>
    </>
  );
}
```

### Advanced Patterns

#### Compound Components

```javascript
function Accordion({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: activeIndex === index,
          onShow: () => setActiveIndex(index)
        }))}
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive
        ? (
            <p>{children}</p>
          )
        : (
            <button onClick={onShow}>Show</button>
          )}
    </section>
  );
}
```

#### Render Props Pattern

```javascript
function DataFetcher({ render, url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading });
}

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading }) => (
    loading ? <div>Loading...</div> : <UserList users={data} />
  )}
/>;
```

### React Rules and Best Practices

#### Rules of Hooks
1. Only call Hooks at the top level (not inside loops, conditions, or nested functions)
2. Only call Hooks from React function components or custom Hooks

#### Component Rules
1. Components must be pure functions
2. Props are read-only
3. Use JSX for component composition
4. Handle events with event handlers

#### Performance Tips
1. Use `useMemo` for expensive calculations
2. Use `useCallback` for function memoization
3. Avoid creating objects/functions in render
4. Use `React.memo` for component memoization
5. Split components to minimize re-renders

### Error Boundaries

Handle JavaScript errors in component tree:

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>;
```

---

## Tailwind CSS

Tailwind CSS is a utility-first CSS framework that rapidly builds custom designs by scanning HTML for class names and generating corresponding static CSS, offering a fast, flexible, and zero-runtime styling solution.

### Core Concepts

- **Utility-First**: Apply styles directly in HTML using single-purpose utility classes
- **Responsive Design**: Built-in responsive design with mobile-first breakpoints
- **Component-Friendly**: Works seamlessly with component-based frameworks
- **Customizable**: Highly customizable design system with theme configuration
- **Performance**: Only includes CSS for classes you actually use
- **Dark Mode**: Built-in dark mode support with `dark:` prefix
- **State Variants**: Style hover, focus, and other states with prefixes

### Installation and Setup

#### Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Configure Template Paths
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### Add Tailwind Directives
```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

```

### Layout Utilities

#### Display
```html
<!-- Block and Inline -->
<div class="block">Block element</div>
<span class="inline">Inline element</span>
<div class="inline-block">Inline-block element</div>

<!-- Flexbox -->
<div class="flex">Flexbox container</div>
<div class="inline-flex">Inline flexbox container</div>

<!-- Grid -->
<div class="grid">Grid container</div>
<div class="inline-grid">Inline grid container</div>

<!-- Hidden -->
<div class="hidden">Hidden element</div>
```

#### Position
```html
<!-- Static positioning -->
<div class="static">Static position</div>

<!-- Relative positioning -->
<div class="relative">
  <div class="absolute top-0 right-0">Absolute positioned</div>
</div>

<!-- Fixed positioning -->
<div class="fixed top-4 right-4">Fixed position</div>

<!-- Sticky positioning -->
<div class="sticky top-0">Sticky header</div>
```

#### Flexbox
```html
<!-- Flex Direction -->
<div class="flex flex-row">Horizontal flex</div>
<div class="flex flex-col">Vertical flex</div>
<div class="flex flex-row-reverse">Reverse horizontal</div>
<div class="flex flex-col-reverse">Reverse vertical</div>

<!-- Justify Content -->
<div class="flex justify-start">Start alignment</div>
<div class="flex justify-center">Center alignment</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-evenly">Space evenly</div>

<!-- Align Items -->
<div class="flex items-start">Align start</div>
<div class="flex items-center">Align center</div>
<div class="flex items-end">Align end</div>
<div class="flex items-stretch">Stretch items</div>

<!-- Flex Wrap -->
<div class="flex flex-wrap">Wrap items</div>
<div class="flex flex-nowrap">No wrap</div>

<!-- Flex Grow/Shrink -->
<div class="flex">
  <div class="flex-1">Grows to fill space</div>
  <div class="flex-none">Fixed size</div>
  <div class="flex-auto">Auto sizing</div>
</div>
```

#### Grid
```html
<!-- Grid Template Columns -->
<div class="grid grid-cols-1">1 column</div>
<div class="grid grid-cols-2">2 columns</div>
<div class="grid grid-cols-3">3 columns</div>
<div class="grid grid-cols-12">12 columns</div>

<!-- Grid Template Rows -->
<div class="grid grid-rows-2">2 rows</div>
<div class="grid grid-rows-3">3 rows</div>

<!-- Grid Column Span -->
<div class="grid grid-cols-6">
  <div class="col-span-2">Spans 2 columns</div>
  <div class="col-span-4">Spans 4 columns</div>
</div>

<!-- Grid Row Span -->
<div class="grid grid-rows-3">
  <div class="row-span-2">Spans 2 rows</div>
  <div class="row-span-1">Spans 1 row</div>
</div>

<!-- Gap -->
<div class="grid grid-cols-3 gap-4">Grid with gap</div>
<div class="grid grid-cols-3 gap-x-4 gap-y-2">Different x/y gaps</div>
```

### Spacing Utilities

#### Padding
```html
<!-- All sides -->
<div class="p-4">Padding all sides</div>
<div class="p-0">No padding</div>
<div class="p-px">1px padding</div>

<!-- Individual sides -->
<div class="pt-4">Padding top</div>
<div class="pr-4">Padding right</div>
<div class="pb-4">Padding bottom</div>
<div class="pl-4">Padding left</div>

<!-- Horizontal/Vertical -->
<div class="px-4">Horizontal padding</div>
<div class="py-4">Vertical padding</div>

<!-- Responsive padding -->
<div class="p-2 md:p-4 lg:p-8">Responsive padding</div>
```

#### Margin
```html
<!-- All sides -->
<div class="m-4">Margin all sides</div>
<div class="m-auto">Auto margin (centering)</div>

<!-- Individual sides -->
<div class="mt-4">Margin top</div>
<div class="mr-4">Margin right</div>
<div class="mb-4">Margin bottom</div>
<div class="ml-4">Margin left</div>

<!-- Negative margins -->
<div class="-mt-4">Negative margin top</div>
<div class="-mx-2">Negative horizontal margin</div>

<!-- Space between children -->
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Typography Utilities

#### Font Family
```html
<p class="font-sans">Sans-serif font</p>
<p class="font-serif">Serif font</p>
<p class="font-mono">Monospace font</p>
```

#### Font Size
```html
<p class="text-xs">Extra small text</p>
<p class="text-sm">Small text</p>
<p class="text-base">Base text</p>
<p class="text-lg">Large text</p>
<p class="text-xl">Extra large text</p>
<p class="text-2xl">2X large text</p>
<p class="text-3xl">3X large text</p>
<p class="text-4xl">4X large text</p>
<p class="text-5xl">5X large text</p>
<p class="text-6xl">6X large text</p>
```

#### Font Weight
```html
<p class="font-thin">Thin text</p>
<p class="font-light">Light text</p>
<p class="font-normal">Normal text</p>
<p class="font-medium">Medium text</p>
<p class="font-semibold">Semibold text</p>
<p class="font-bold">Bold text</p>
<p class="font-extrabold">Extra bold text</p>
<p class="font-black">Black text</p>
```

#### Text Alignment
```html
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
<p class="text-justify">Justified text</p>
```

#### Text Color
```html
<p class="text-black">Black text</p>
<p class="text-white">White text</p>
<p class="text-gray-500">Gray text</p>
<p class="text-red-500">Red text</p>
<p class="text-blue-500">Blue text</p>
<p class="text-green-500">Green text</p>
```

#### Text Decoration
```html
<p class="underline">Underlined text</p>
<p class="line-through">Strikethrough text</p>
<p class="no-underline">No underline</p>
```

#### Text Transform
```html
<p class="uppercase">UPPERCASE TEXT</p>
<p class="lowercase">lowercase text</p>
<p class="capitalize">Capitalized Text</p>
<p class="normal-case">Normal Case</p>
```

### Color System

#### Background Colors
```html
<!-- Solid backgrounds -->
<div class="bg-white">White background</div>
<div class="bg-black">Black background</div>
<div class="bg-gray-100">Light gray background</div>
<div class="bg-gray-900">Dark gray background</div>

<!-- Color palette -->
<div class="bg-red-500">Red background</div>
<div class="bg-blue-500">Blue background</div>
<div class="bg-green-500">Green background</div>
<div class="bg-yellow-500">Yellow background</div>
<div class="bg-purple-500">Purple background</div>
<div class="bg-pink-500">Pink background</div>

<!-- Color shades (50-950) -->
<div class="bg-blue-50">Very light blue</div>
<div class="bg-blue-100">Light blue</div>
<div class="bg-blue-500">Medium blue</div>
<div class="bg-blue-900">Dark blue</div>
<div class="bg-blue-950">Very dark blue</div>
```

#### Border Colors
```html
<div class="border border-gray-300">Gray border</div>
<div class="border-2 border-red-500">Red border</div>
<div class="border-t border-blue-500">Top border only</div>
<div class="border-x-2 border-green-500">Horizontal borders</div>
```

### Responsive Design

#### Breakpoints
```html
<!-- Mobile first approach -->
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text size
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

<!-- Responsive padding -->
<div class="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>

<!-- Hide/show on different screens -->
<div class="block md:hidden">Mobile only</div>
<div class="hidden md:block">Desktop only</div>
```

#### Breakpoint Reference
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

### State Variants

#### Hover States
```html
<button class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2">
  Hover me
</button>

<div class="text-gray-600 hover:text-gray-900">
  Hover to change color
</div>
```

#### Focus States
```html
<input class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2" />

<button class="bg-green-500 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
  Focus me
</button>
```

#### Active States
```html
<button class="bg-purple-500 active:bg-purple-700 px-4 py-2">
  Click me
</button>
```

#### Group Hover
```html
<div class="group border p-4 hover:bg-gray-50">
  <h3 class="group-hover:text-blue-600">Title</h3>
  <p class="group-hover:text-gray-700">Description</p>
</div>
```

### Dark Mode

#### Enable Dark Mode
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ... rest of config
};
```

#### Dark Mode Classes
```html
<!-- Toggle dark mode with class on html/body -->
<html class="dark">
  <body class="bg-white dark:bg-gray-900 text-black dark:text-white">
    <div class="bg-gray-100 dark:bg-gray-800 p-4">
      <h1 class="text-gray-900 dark:text-gray-100">Title</h1>
      <p class="text-gray-600 dark:text-gray-400">Description</p>
    </div>
  </body>
</html>
```

### Component Examples

#### Button Components
```html
<!-- Primary Button -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Primary Button
</button>

<!-- Secondary Button -->
<button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Secondary Button
</button>

<!-- Disabled Button -->
<button class="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
  Disabled Button
</button>
```

#### Card Components
```html
<!-- Basic Card -->
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="image.jpg" alt="Card image">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Card Title</div>
    <p class="text-gray-700 text-base">
      Card description goes here.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      #tag1
    </span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      #tag2
    </span>
  </div>
</div>
```

#### Form Components
```html
<!-- Form Input -->
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
    Username
  </label>
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         id="username"
         type="text"
         placeholder="Username">
</div>

<!-- Select Dropdown -->
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
    Country
  </label>
  <select class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="country">
    <option>United States</option>
    <option>Canada</option>
    <option>Mexico</option>
  </select>
</div>

<!-- Checkbox -->
<div class="mb-6">
  <label class="flex items-center">
    <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600">
    <span class="ml-2 text-gray-700">I agree to the terms and conditions</span>
  </label>
</div>
```

#### Navigation Components
```html
<!-- Navigation Bar -->
<nav class="bg-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img class="h-8 w-8" src="logo.svg" alt="Logo">
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              About
            </a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
```

### Customization

#### Extending the Theme
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1fb6ff',
        'brand-purple': '#7e5bef',
        'brand-pink': '#ff49db',
        'brand-orange': '#ff7849',
        'brand-green': '#13ce66',
        'brand-yellow': '#ffc82c',
        'brand-gray-dark': '#273444',
        'brand-gray': '#8492a6',
        'brand-gray-light': '#d3dce6',
      },
      fontFamily: {
        custom: ['Custom Font', 'sans-serif'],
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
};
```

#### Custom CSS Variables
```css
/* In your CSS file */
@theme {
  --color-regal-blue: #243c5a;
  --font-family-custom: 'Custom Font', sans-serif;
}

```

```html
<!-- Use custom colors -->
<div class="bg-regal-blue text-white p-4">
  Custom color background
</div>
```

#### Adding Custom Utilities
```css
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

```

### Performance Optimization

#### Purging Unused CSS
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  // This automatically purges unused styles
};
```

#### JIT Mode (Just-In-Time)
JIT mode is enabled by default in Tailwind CSS v3+, providing:
- Faster build times
- Smaller CSS bundle sizes
- All variants enabled by default
- Arbitrary value support

### Arbitrary Values

#### Arbitrary Properties
```html
<!-- Custom values -->
<div class="top-[117px]">Custom top position</div>
<div class="bg-[#bada55]">Custom background color</div>
<div class="text-[14px]">Custom font size</div>
<div class="before:content-['Hello']">Custom content</div>

<!-- CSS Grid -->
<div class="grid-cols-[200px_minmax(900px,_1fr)_100px]">
  Custom grid template
</div>
```

### Animation Utilities

#### Built-in Animations
```html
<div class="animate-spin">Spinning element</div>
<div class="animate-ping">Pinging element</div>
<div class="animate-pulse">Pulsing element</div>
<div class="animate-bounce">Bouncing element</div>
```

#### Transition Utilities
```html
<button class="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
  Smooth transition
</button>

<div class="transition-colors duration-200 bg-blue-500 hover:bg-blue-600">
  Color transition
</div>
```

### Best Practices

#### Component Organization
```html
<!-- Extract repeated patterns into components -->
<!-- Instead of repeating classes -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button 1
</button>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button 2
</button>

<!-- Create a reusable component -->
<Button variant="primary">Button 1</Button>
<Button variant="primary">Button 2</Button>
```

#### Using @apply for Components
```css
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }

  .card {
    @apply bg-white shadow-lg rounded-lg p-6;
  }
}

```

#### Responsive Design Strategy
```html
<!-- Mobile-first approach -->
<div class="
  text-sm        /* Mobile: small text */
  md:text-base   /* Tablet: normal text */
  lg:text-lg     /* Desktop: large text */
  xl:text-xl     /* Large desktop: extra large text */
">
  Responsive text
</div>
```

### Integration with Frameworks

#### Next.js Integration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
```

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

```

#### React Component Example
```jsx
import React from 'react';

const Card = ({ title, description, image }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">
          {title}
        </h2>
        <p className="text-gray-600 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
```

### Utility Reference

#### Spacing Scale
- `0`: 0px
- `px`: 1px
- `0.5`: 0.125rem (2px)
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 0.75rem (12px)
- `4`: 1rem (16px)
- `5`: 1.25rem (20px)
- `6`: 1.5rem (24px)
- `8`: 2rem (32px)
- `10`: 2.5rem (40px)
- `12`: 3rem (48px)
- `16`: 4rem (64px)
- `20`: 5rem (80px)
- `24`: 6rem (96px)
- `32`: 8rem (128px)

#### Color Palette
Each color comes in shades from 50 (lightest) to 950 (darkest):
- **Gray**: slate, gray, zinc, neutral, stone
- **Red**: red
- **Orange**: orange, amber
- **Yellow**: yellow, lime
- **Green**: green, emerald, teal
- **Blue**: cyan, sky, blue, indigo
- **Purple**: violet, purple, fuchsia
- **Pink**: pink, rose

---

## Zod

Zod is a TypeScript-first schema validation library with static type inference.

### Basic Schema Definition

```typescript
import * as z from 'zod';

const User = z.object({
  username: z.string(),
  age: z.number(),
});

// Extract the inferred type
type User = z.infer<typeof User>;
// { username: string; age: number }
```

### String Validation

```typescript
z.string()
  .min(5)
  .max(10)
  .email()
  .url();
```

### Number Validation

```typescript
z.number()
  .min(0)
  .max(100)
  .int()
  .positive();
```

### Array Validation

```typescript
const stringArray = z.array(z.string());

// With constraints
z.string().array().nonempty(); // [string, ...string[]]
z.string().array().min(5); // must contain 5 or more items
z.string().array().max(5); // must contain 5 or fewer items
z.string().array().length(5); // must contain 5 items exactly
```

### Object Validation

```typescript
const Person = z.object({
  name: z.string(),
  age: z.number().optional(),
  email: z.string().email(),
});

type Person = z.infer<typeof Person>;
// { name: string; age?: number; email: string }
```

### Union Types

```typescript
const stringOrNumber = z.union([z.string(), z.number()]);

// Or using .or()
const stringOrNumber = z.string().or(z.number());
```

### Custom Validation

```typescript
const px = z.custom<`${number}px`>((val) => {
  return typeof val === 'string' ? /^\d+px$/.test(val) : false;
});

px.parse('42px'); // "42px"
px.parse('42vw'); // throws
```

### Parsing Data

```typescript
const stringSchema = z.string();

stringSchema.parse('fish'); // => returns "fish"
stringSchema.parse(12); // throws error

// Safe parsing
const result = stringSchema.safeParse('fish');
if (result.success) {
  console.log(result.data); // "fish"
} else {
  console.log(result.error); // ZodError
}
```

---

## React Hook Form

React Hook Form is a library for building performant, flexible forms with easy validation.

### Basic Usage

```typescript
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />

      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
```

### Validation Rules

```typescript
export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  )
}
```

### Schema Validation with Zod

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(18, "Must be at least 18"),
})

type Schema = z.infer<typeof schema>

const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("age", { valueAsNumber: true })} type="number" />
      {errors.age && <p>{errors.age.message}</p>}

      <input type="submit" />
    </form>
  )
}
```

### useForm Options

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  mode: 'onChange', // Validation strategy
  defaultValues: {
    firstName: '',
    lastName: '',
  },
  resolver: zodResolver(schema), // Schema validation
});
```

### Controller for Custom Components

```typescript
import { useForm, Controller } from "react-hook-form"

function App() {
  const { control, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <input type="submit" />
    </form>
  )
}
```

---

## Other Dependencies

### @hookform/resolvers
- **Version**: ^5.1.1
- **Purpose**: Provides resolvers for various validation libraries (Yup, Zod, Joi, etc.)
- **Usage**: `npm install @hookform/resolvers`

### @t3-oss/env-nextjs
- **Version**: ^0.13.8
- **Purpose**: Type-safe environment variables for Next.js
- **Usage**: Validates and provides type safety for environment variables

### @sentry/nextjs
- **Version**: ^9.37.0
- **Purpose**: Error tracking and performance monitoring
- **Usage**: Integrates Sentry error tracking with Next.js applications

### @logtape/logtape
- **Version**: ^1.0.4
- **Purpose**: Logging library
- **Usage**: Structured logging for applications

### next-intl
- **Version**: ^4.3.4
- **Purpose**: Internationalization for Next.js
- **Usage**: Provides i18n support with type safety

### posthog-js
- **Version**: ^1.257.0
- **Purpose**: Product analytics
- **Usage**: Track user behavior and product metrics

### @electric-sql/pglite
- **Version**: ^0.3.4
- **Purpose**: Lightweight PostgreSQL in WebAssembly
- **Usage**: Run PostgreSQL in the browser or Node.js

### @arcjet/next
- **Version**: 1.0.0-beta.9
- **Purpose**: Security and rate limiting for Next.js
- **Usage**: Provides bot protection, rate limiting, and security features

### vite
- **Version**: ^7.0.4
- **Purpose**: Build tool and development server
- **Usage**: Fast build tool for modern web development

---

## Installation

To install these dependencies, run:

```bash
npm install @arcjet/next@1.0.0-beta.9 @electric-sql/pglite@^0.3.4 @hookform/resolvers@^5.1.1 @logtape/logtape@^1.0.4 @sentry/nextjs@^9.37.0 @t3-oss/env-nextjs@^0.13.8 next@^15.3.5 next-intl@^4.3.4 posthog-js@^1.257.0 react@19.1.0 react-dom@19.1.0 react-hook-form@^7.60.0 vite@^7.0.4 zod@^4.0.3
```

This documentation provides a comprehensive overview of the main dependencies and their usage patterns. Refer to the official documentation of each library for more detailed information and advanced use cases.
