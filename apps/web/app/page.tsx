import { Button } from '@repo/ui';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Next.js 16 + NestJS Monorepo
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A modern full-stack monorepo with Turborepo
        </p>

        {/* Test UI Package */}
        <div className="flex gap-4 justify-center mb-8">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <button className="bg-red-500">LOREM</button>

        <div className="mt-8 space-y-2">
          <p className="text-sm">
            <strong>Frontend:</strong> Next.js 16 + React 19
          </p>
          <p className="text-sm">
            <strong>Backend:</strong> NestJS 11
          </p>
          <p className="text-sm">
            <strong>Database:</strong> MySQL + Prisma
          </p>
          <p className="text-sm">
            <strong>UI:</strong> @repo/ui (Dub Components)
          </p>
        </div>
      </div>
    </main>
  );
}
