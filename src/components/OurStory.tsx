import React from 'react';

const OurStory: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 bg-custom-header rounded-lg mb-16">
            {/* Título */}
            <div className="text-center mb-8">
                {/* Ícone de folhagem */}
                <div className="w-10 h-10 mx-auto mb-2">
                    <img src="https://i.postimg.cc/28S1bJ01/imagem-2025-06-06-164739601.png" alt="" />
                </div>
                <h2 className="text-xl font-serif text-center text-[#9A7B6F]">O CASAL</h2>
            </div>

            {/* Imagens do Casal */}
            <div className="flex justify-center gap-8 mb-8">
                {/* Imagem da Mulher */}
                <div className="relative w-48 h-48 overflow-hidden rounded-full border-2 border-[#D9B59D]">
                    <img
                        src="https://i.postimg.cc/nhMtkWTX/BCD4443-D-467-A-4-B9-E-817-D-684232-FBA78-E.png"
                        alt="Mulher"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Imagem do Homem */}
                <div className="relative w-48 h-48 overflow-hidden rounded-full border-2 border-[#D9B59D]">
                    <img
                        src="https://i.postimg.cc/cC1zJKbv/15-E558-CC-EECD-41-D2-8034-041-DA5-A6-D362.png"
                        alt="Homem"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Texto Descritivo */}
            <div className="text-gray-600 leading-relaxed">
                <p>
                    Histórias de amor existem, e, às vezes, nem nós mesmos acreditamos todo o tempo que já estamos juntos. Porém, o brilho intenso e apaixonado dos nossos olhares nos fazem lembrar o porquê de chegarmos até aqui sem sentir tanto o tempo passar....Vamos nos casar!
                </p>
                <p className="mt-2">
                    Estamos preparando tudo com muito carinho para curtirmos cada momento com nossos amigos e familiares queridos!
                </p>
            </div>
        </div>
    );
};

export default OurStory;