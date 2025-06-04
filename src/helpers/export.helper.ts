// Import or define GiftType before using it
import { Gift } from '../types/index'; // Adjust the path as needed

export const exportToCsv = (gifts: Gift[]) => {
    const csvRows = [
        ['Nome Presente', 'Preço', 'Status', 'Reservado por'],
        ...gifts
            .filter((g) => g.status === 'reserved')
            .map((g) => [
                g.name,
                `R$ ${(g.price !== undefined ? g.price : 0).toFixed(2).replace('.', ',')}`,
                g.status === 'reserved' ? 'Reservado' : 'Disponível',
                g.reservedBy || '',
            ]),
    ]
        .map((row) => row.join(','))
        .join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'presentes-reservados.csv';
    link.click();
};