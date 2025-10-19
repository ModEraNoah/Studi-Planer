export function Kanban() {
  const sections = ["todo", "in progress", "finished"];
  return (
    <div>
      <h2 className="text-xl font-bold text-center">Kanban</h2>
      <div className="grid grid-cols-3 text-center text-m font-semibold">
        {sections.map((section) => (
          <div className="px-2">
            <p>{section.toUpperCase()}</p>
            <div className="border min-h-90"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
