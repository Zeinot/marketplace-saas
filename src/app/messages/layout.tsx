export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  // Navbar is h-16 (4rem). This constrains the messages area to exactly the
  // remaining viewport height so the inner scrollable container works correctly.
  return (
    <div className="h-[calc(100dvh-4rem)] overflow-hidden">
      {children}
    </div>
  );
}
