import type { MDXComponents } from 'mdx/types';
import { Card } from '@/app/components/ui/Card';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-text-primary mt-10 mb-4 border-b border-obsidian-border/50 pb-2">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-text-secondary leading-relaxed mb-6">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-accent-blue hover:underline underline-offset-4">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
        {children}
      </ul>
    ),
   
    pre: ({ children, ...props }) => (
      <pre 
        {...props} 
        className="p-4 rounded-xl bg-obsidian-surface/50 border border-obsidian-border/50 overflow-x-auto mb-6 text-sm"
      >
        {children}
      </pre>
    ),
   
    code: ({ children, className }) => {
  
      if (!className) {
        return (
          <code className="px-1.5 py-0.5 rounded-md bg-accent-blue/10 text-accent-blue font-mono text-sm">
            {children}
          </code>
        );
      }
  
      return <code className={className}>{children}</code>;
    },
  
    Card,
    ...components,
  };
}