export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="py-6">{children}</div>
      <div>
        <footer className="bg-purple-600 ">
            <h3 className="text-white">Aqui va el footer de events</h3>
        </footer>
      </div>
    </main>
  );
}
