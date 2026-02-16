import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { CommonMetaData } from '@/components/lib/constant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StudioLoginErrorToast from '@/components/studio/studio-login-error-toast';
import { isStudioEnabled, sanitizeStudioNextPath } from '@/lib/studio-auth';
import { isStudioAuthenticated } from '@/lib/studio-auth-server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  ...CommonMetaData,
  title: 'Studio Login',
  description: 'Sign in to access Studio editing features.',
  robots: {
    index: false,
    follow: false,
  },
};

type StudioLoginPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

export default async function StudioLoginPage(props: StudioLoginPageProps) {
  if (!isStudioEnabled) notFound();

  const searchParams = await props.searchParams;
  const nextPath = sanitizeStudioNextPath(searchParams.next);

  if (await isStudioAuthenticated()) {
    redirect(nextPath);
  }

  const hasError = searchParams.error === '1';

  return (
    <section className="mx-auto max-w-[440px] py-6">
      <StudioLoginErrorToast hasError={hasError} />
      <header className="mb-4 space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Studio Login</h1>
        <p className="text-sm text-foreground/72">Sign in with your admin credentials to enable write/edit access.</p>
      </header>

      <form method="post" action="/api/studio/auth/login" className="space-y-4 rounded-xl border border-border/70 bg-secondary/10 p-4">
        <input type="hidden" name="next" value={nextPath} />
        <button type="submit" className="sr-only" tabIndex={-1} aria-hidden>
          submit
        </button>

        <div className="space-y-1.5">
          <label htmlFor="studio-login-username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="studio-login-username"
            name="username"
            autoComplete="username"
            enterKeyHint="next"
            required
            autoFocus
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="studio-login-password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="studio-login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            enterKeyHint="go"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit" className="min-w-24">
            Sign in
          </Button>
          <Link href="/">
            <Button type="button" variant="outline">
              Home
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
