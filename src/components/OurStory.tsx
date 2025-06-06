import React from 'react';
import { Heart } from 'lucide-react';

const OurStory: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 mb-16">
            <div className="text-center mb-12">
                <Heart className="text-rose-500 w-8 h-8 mx-auto mb-4" />
                <h2 className="text-3xl font-serif text-gray-800 mb-4">Nossa História</h2>
                <div className="w-24 h-1 bg-rose-200 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                    <img
                        src="https://i.postimg.cc/nhMtkWTX/BCD4443-D-467-A-4-B9-E-817-D-684232-FBA78-E.png"
                        alt="Momento especial do casal"
                        className="rounded-lg shadow-lg"
                    />
                    <div className="absolute"></div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-serif text-gray-800 mb-2">Como Tudo Começou</h3>
                        <p className="font-noto text-gray-600 leading-relaxed">
                            Nosso primeiro encontro foi em uma cafeteria no centro da cidade.
                            O que era para ser apenas um café rápido se transformou em horas
                            de conversa e muitas risadas.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif text-gray-800 mb-2">Momentos Marcantes</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-16 font-light text-gray-500">2020</span>
                                <p className="font-noto text-gray-600">Primeiro encontro na cafeteria</p>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-16 font-light text-gray-500">2021</span>
                                <p className="font-noto text-gray-600">Primeira viagem juntos</p>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-16 font-light text-gray-500">2022</span>
                                <p className="font-noto text-gray-600">Mudança para nossa primeira casa</p>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-16 font-light text-gray-500">2023</span>
                                <p className="font-noto text-gray-600">O pedido de casamento</p>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif text-gray-800 mb-2">O Que Nos Une</h3>
                        <p className="font-noto text-gray-600 leading-relaxed">
                            Além do amor que sentimos um pelo outro, compartilhamos a paixão
                            por viagens, boa gastronomia e momentos em família. Cada dia é
                            uma nova aventura que vivemos juntos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStory;