import React from 'react';

const OurStory: React.FC = () => {
    return (
        <section 
            className="w-full bg-[#FAF8F5] py-24 md:py-32"
            aria-labelledby="our-story-title"
        >
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
                
                {/* Cabeçalho Simétrico e Clássico */}
                <header className="flex flex-col items-center text-center mb-16 md:mb-24">
                    <h2 
                        id="our-story-title"
                        className="text-xs md:text-sm font-['Montserrat'] text-gray-400 tracking-[0.4em] uppercase font-semibold mb-4"
                    >
                        Nossa História
                    </h2>
                    <p className="text-4xl md:text-5xl font-['Cinzel'] text-gray-800 font-medium">
                        O Casal
                    </p>
                    {/* Divisor Elegante Padrão Elementor */}
                    <div className="w-20 h-[1px] bg-gray-300 mt-8"></div>
                </header>

                {/* Composição Fotográfica Alinhada (Simetria Elementor) */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 mb-20 w-full">
                    
                    {/* Imagem da Noiva */}
                    <figure className="relative flex flex-col items-center group">
                        <div className="w-64 h-[22rem] md:w-72 md:h-[26rem] overflow-hidden rounded-t-full rounded-b-xl border-8 border-white shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-transform duration-500 hover:scale-[1.02]">
                            <img
                                src="https://i.postimg.cc/nhMtkWTX/BCD4443-D-467-A-4-B9-E-817-D-684232-FBA78-E.png"
                                alt="Retrato da Noiva"
                                className="w-full h-full object-cover filter contrast-[0.95] group-hover:contrast-100 transition-all duration-500"
                            />
                        </div>
                        <figcaption className="mt-6 text-lg font-['Cinzel'] text-gray-800 tracking-wider">
                            A Noiva
                        </figcaption>
                    </figure>

                    {/* Conector Estático e Centralizado */}
                    <div 
                        className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md text-gray-400 font-['Cinzel'] text-2xl border border-gray-100"
                        aria-hidden="true"
                    >
                        &
                    </div>

                    {/* Imagem do Noivo */}
                    <figure className="relative flex flex-col items-center group">
                        <div className="w-64 h-[22rem] md:w-72 md:h-[26rem] overflow-hidden rounded-t-full rounded-b-xl border-8 border-white shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-transform duration-500 hover:scale-[1.02]">
                            <img
                                src="https://i.postimg.cc/cC1zJKbv/15-E558-CC-EECD-41-D2-8034-041-DA5-A6-D362.png"
                                alt="Retrato do Noivo"
                                className="w-full h-full object-cover filter contrast-[0.95] group-hover:contrast-100 transition-all duration-500"
                            />
                        </div>
                        <figcaption className="mt-6 text-lg font-['Cinzel'] text-gray-800 tracking-wider">
                            O Noivo
                        </figcaption>
                    </figure>
                </div>

                {/* Tipografia e Narrativa - Bloco de Texto Limpo */}
                <article className="max-w-3xl mx-auto text-center px-4">
                    <p className="font-['Montserrat'] text-gray-600 text-base md:text-lg leading-loose font-light mb-12">
                        Histórias de amor existem, e, às vezes, nem nós mesmos acreditamos em todo o tempo que já estamos juntos. Porém, o brilho intenso e apaixonado dos nossos olhares nos faz lembrar o porquê de chegarmos até aqui sem sentir tanto o tempo passar.
                    </p>
                    
                    <div className="inline-block px-8 py-4 border border-gray-200 bg-white shadow-sm rounded-sm mb-8">
                        <p className="text-2xl md:text-3xl font-['Cinzel'] text-gray-800 tracking-widest">
                            VAMOS NOS CASAR!
                        </p>
                    </div>
                    
                    <p className="font-['Montserrat'] text-gray-500 text-xs md:text-sm leading-relaxed font-normal tracking-[0.2em] uppercase">
                        Estamos preparando tudo com muito carinho para curtirmos <br className="hidden md:block"/> cada momento com nossos amigos e familiares.
                    </p>
                </article>
            </div>
        </section>
    );
};

export default OurStory;