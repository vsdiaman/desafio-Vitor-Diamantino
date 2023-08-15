class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: {
                codigo: 'cafe',
                descricao: 'Café',
                valor: 3.00,
                principal: true,
                extras: {
                    valor: 1.50,
                    itens: ['chantily']
                }
            },
            chantily: {
                codigo: 'chantily',
                descricao: 'Chantily (extra do Café)',
                valor: 1.50,
                principal: false,
                extras: []
            },
            suco: {
                codigo:'suco',
                descricao: 'Suco Natural',
                valor: 6.20,
                principal: true,
                extras: []
            },
            sanduiche: {
                codigo:'sanduiche',
                descricao: 'Sanduiche',
                valor: 6.50,
                principal: true,
                extras: {
                    valor: 2.50,
                    itens: ['queijo']
                }
            },
            queijo: {
                codigo: 'queijo',
                descricao: 'Queijo (extra do Sanduíche)',
                valor: 2.50,
                principal: false,
                extras: []
            },
            salgado: {
                codigo:'salgado',
                descricao: 'Salgado',
                valor: 7.25,
                principal: true,
                extras: []
            },
            combo1: {
                codigo: 'combo1',
                descricao: '1 Suco e 1 Sanduíche',
                valor: 9.50,
                principal: true,
                extras: {
                    itens: ['suco', 'sanduiche']
                }
            },
            combo2: {
                codigo:'combo2',
                descricao: '1 Café e 1 Sanduíche',
                valor: 7.50,
                principal: true,
                extras: {
                    itens: ['cafe', 'sanduiche']
                }
            },
        };

        this.metodoDePagamento = {
            dinheiro: {
                nome: 'dinheiro',
            },
            credito: {
                nome: 'credito',
            },
            debito: {
                nome: 'debito',
            }
        }
        this.descontoDinheiro = 0.05;
        this.acrescimoCredito = 0.03;
        
    }
    calcularValorDaCompra(metodoDePagamento, itens) {
        const infoMetodoPagamento = this.metodoDePagamento[metodoDePagamento];
        
        // Verifica carriho vazio em metodos de pagamento dinheiro/credito/debito
        if (Object.keys(itens).length === 0 && 
        (infoMetodoPagamento.nome === 'dinheiro' || 
        infoMetodoPagamento.nome === 'credito' || 
        infoMetodoPagamento.nome === 'debito')) {
            return "Não há itens no carrinho de compra!";
        }
        
        // Verifica se o metodo de pagamento é diferente
        if(!infoMetodoPagamento){
            return "Forma de pagamento inválida!"
        }
        var valorTotal = 0;


        for (const itemCodigo in itens) {
            const item = this.itens[itemCodigo];

    
            valorTotal += item.valor * itens[itemCodigo];
        }
    
        if (infoMetodoPagamento.nome === 'dinheiro') {
            valorTotal -= valorTotal * this.descontoDinheiro;
        }

        return `R$ ${valorTotal.toFixed(2)}`;
    }
}

export { CaixaDaLanchonete };
