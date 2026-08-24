import * as React from 'react';
import { cn } from '../lib/utils';

export const Tabs = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('w-full', className)} {...props} />;
export const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('inline-flex h-10 items-center rounded-lg bg-muted p-1 text-muted-foreground', className)} {...props} />;
export const TabsTrigger = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button type="button" className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm', className)} {...props} />;
export const TabsContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('mt-3', className)} {...props} />;
