export default function PageShell({ children }) {
  return (
    <div
      className="flex min-h-svh flex-col bg-bg"
      style={{
        backgroundImage:
          'radial-gradient(circle at 12% 0%, rgba(124, 92, 255, 0.10) 0%, transparent 45%), radial-gradient(circle at 88% 8%, rgba(0, 217, 192, 0.08) 0%, transparent 40%)',
      }}
    >
      {children}
    </div>
  )
}
