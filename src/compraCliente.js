import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

const caixa = new CaixaDaLanchonete();

const metodoDePagamento = 'dinheiro';
const itensSelecionados = ['queijo,1'];

const resultado = caixa.calcularValorDaCompra(metodoDePagamento, itensSelecionados);

console.log(resultado);
