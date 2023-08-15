import { CaixaDaLanchonete } from './caixa-da-lanchonete';


const caixa = new CaixaDaLanchonete()

const itens = [
    {codigo: 'cafe'},
    {codigo: 'chantily', extra: 'cafe'},
    {codigo: 'suco'},
    {codigo: 'combo1'},
];

const metodoDePagamento = 'dinheiro';

const valorTotal = caixa.calcularValorDaCompra(metodoDePagamento, itens);
console.log(`valorTotal da compra: R$${valorTotal}`);