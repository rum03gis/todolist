export default function TodoListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">To-Do List</h1>
      </header>
      {children}
    </div>
  );
}
