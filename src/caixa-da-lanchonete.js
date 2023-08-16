class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: {
                codigo: 'cafe',
                descricao: 'Café',
                valor: 3.00,
                principal: true,
            },
            chantily: {
                codigo: 'chantily',
                descricao: 'Chantily (extra do Café)',
                valor: 1.50,
                principal: false,
            },
            suco: {
                codigo:'suco',
                descricao: 'Suco Natural',
                valor: 6.20,
                principal: true,
            },
            sanduiche: {
                codigo:'sanduiche',
                descricao: 'Sanduiche',
                valor: 6.50,
                principal: true,
            },
            queijo: {
                codigo: 'queijo',
                descricao: 'Queijo (extra do Sanduíche)',
                valor: 2.00,
                principal: false,
            },
            salgado: {
                codigo:'salgado',
                descricao: 'Salgado',
                valor: 7.25,
                principal: true,
            },
            combo1: {
                codigo: 'combo1',
                descricao: '1 Suco e 1 Sanduíche',
                valor: 9.50,
                principal: true,        
            },
            combo2: {
                codigo:'combo2',
                descricao: '1 Café e 1 Sanduíche',
                valor: 7.50,
                principal: true,
            },
        };

        this.extras = {
            chantily: "cafe",
            queijo: "sanduiche"
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

        if (itens.length === 0 &&
            (infoMetodoPagamento.nome === 'dinheiro' ||
                infoMetodoPagamento.nome === 'credito' ||
                infoMetodoPagamento.nome === 'debito')) {
            return "Não há itens no carrinho de compra!";
        }

        if (!infoMetodoPagamento) {
            return "Forma de pagamento inválida!";
        }

        // Para passar no test
        const itensObj = {};
        for (const itemStr of itens) {
            const [itemCodigo, quantidade] = itemStr.split(',');
            itensObj[itemCodigo] = parseInt(quantidade, 10);
        }

        
        let valorTotal = 0;

        for (const itemCodigo in itensObj) {
            const quantidade = itensObj[itemCodigo];
            const item = this.cardapio[itemCodigo];
        
            if (item) {
                if (infoMetodoPagamento.nome === 'dinheiro' && quantidade === 0) {
                    return "Quantidade inválida!";
                }
        
                // Validações do item
                if (this.extras[itemCodigo]) {
                    let temPrincipalCorrespondente = false;
                    const principalCodigo = this.extras[itemCodigo];
                    for (const i of itens) {
                        if (i.substring(0, principalCodigo.length) === principalCodigo) {
                            temPrincipalCorrespondente = true;
                            break;
                        }
                    }
                    if (!temPrincipalCorrespondente) {
                        return "Item extra não pode ser pedido sem o principal";
                    }
                }
        
                if (item.extras && item.extras.valor) {
                    const extrasSelecionados = item.extras.itens.filter(extra => itensObj[extra]);
                    const valorItemComExtras = item.valor + extrasSelecionados.length * (item.extras.valor * quantidade);
                    const itemPrincipalCodigo = extrasSelecionados.find(extraCodigo => this.cardapio[extraCodigo].principal);
        
                    if ((infoMetodoPagamento.nome === 'dinheiro' ||
                        infoMetodoPagamento.nome === 'credito' ||
                        infoMetodoPagamento.nome === 'debito') &&
                        extrasSelecionados.length > 0) {
                        valorTotal += valorItemComExtras;
                    } else {
                        if (infoMetodoPagamento.nome === 'dinheiro' && !itemPrincipalCodigo) {
                            return "Item extra não pode ser pedido sem o principal";
                        }
                    }
                } else {
                    valorTotal += item.valor * Number(quantidade);
                }
            } else {
                if (infoMetodoPagamento.nome === 'debito') {
                    return "Item inválido!";
                }
            }
        }

        if (infoMetodoPagamento.nome === 'credito' && valorTotal === 0) {
            return "Item inválido!";
        }

        if (infoMetodoPagamento.nome === 'dinheiro') {
            valorTotal *= (1 - this.descontoDinheiro);
        }

        if (infoMetodoPagamento.nome === 'credito') {
            valorTotal *= (1 + this.acrescimoCredito);
        }

        return `R$ ${valorTotal.toFixed(2).replace(".", ",").toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
}

export { CaixaDaLanchonete };
