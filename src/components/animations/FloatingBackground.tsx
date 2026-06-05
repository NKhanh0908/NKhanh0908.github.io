export function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Drifting subtle blue gradient */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] -top-[10%] -left-[10%] animate-drift-slow" 
        style={{ animationDuration: '25s' }}
      />
      {/* Drifting subtle success/emerald gradient */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] bottom-[15%] -right-[5%] animate-drift-slower" 
        style={{ animationDuration: '30s' }}
      />
    </div>
  );
}
