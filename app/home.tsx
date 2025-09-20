"use client";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function HomeChoice() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <h1 className="text-3xl font-bold mb-8">Choisissez votre mode</h1>
      <div className="flex gap-8">
        <Button size="lg" className="px-8 py-4 text-xl" onClick={() => router.push('/collectif')}>Mode collectif</Button>
        <Button size="lg" className="px-8 py-4 text-xl" onClick={() => router.push('/individuel')}>Mode individuel</Button>
      </div>
    </div>
  );
}
