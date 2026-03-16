export default function Header() {
  return (
    <header className="
      w-full 
      sticky top-4 z-50 /* Mantém o header fixo no topo ao rolar */
      flex flex-col md:flex-row /* Empilha no mobile, lado a lado no desktop */
      items-center justify-between 
      p-4 md:px-8 /* Mais espaçamento lateral em telas maiores */
      bg-white/80 backdrop-blur-md /* Efeito de vidro (glassmorphism) */
      rounded-2xl md:rounded-[2.5rem] 
      shadow-sm border border-white/50 
      mb-8
    ">
      <div className="text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-bold text-blue-900 transition-all">
          Bem-vindo, <span className="text-blue-600">Dra. Mariaelly!</span>
        </h1>
        <p className="text-sm md:text-base text-blue-500/80 font-medium">
          Aqui estão as atualizações da sua clínica.
        </p>
      </div>

    </header>
  );
}