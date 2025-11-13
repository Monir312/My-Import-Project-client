import ChangeMode from "./ChangeMode";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors">
      <ChangeMode />
      <main className="flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-4xl font-bold">Vite + React + DaisyUI</h1>
        <p>Click the button above to toggle Dark/Light mode.</p>
      </main>
    </div>
  );
}
