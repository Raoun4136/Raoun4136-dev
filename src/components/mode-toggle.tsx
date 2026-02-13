'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ModeToggleProps = {
  align?: 'center' | 'start' | 'end';
  contentClassName?: string;
  showSelectedLabel?: boolean;
} & Pick<ButtonProps, 'className' | 'size' | 'variant'>;

const getThemeLabel = (theme: string | undefined, resolvedTheme: string | undefined) => {
  if (theme === 'system') return 'System';
  if (resolvedTheme === 'dark') return 'Dark';
  return 'Light';
};

export function ModeToggle({
  className,
  size = 'icon',
  variant = 'outline',
  align = 'end',
  contentClassName,
  showSelectedLabel = false,
}: ModeToggleProps) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const selectedLabel = getThemeLabel(theme, resolvedTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(showSelectedLabel ? 'justify-start gap-2' : 'relative', className)}
        >
          {showSelectedLabel ? (
            <>
              <span className="relative inline-flex h-4 w-4 items-center justify-center">
                <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </span>
              <span className="text-sm">{selectedLabel}</span>
            </>
          ) : (
            <>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={contentClassName}>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
