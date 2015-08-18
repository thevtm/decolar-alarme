/**
 * Formata um numero para o formato de dinheiro.
 * @param {Number} n Número a ser transformado para Reais.
 * @param {String} prefixo Prefixo do tipo de moeda a ser utilizado.
 * @return {String} n formatado no formato de dinheiro.
 */
function formataDinheiro(n, prefixo) {
    prefixo = prefixo || "R$";
    return prefixo + " " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}
module.exports = formataDinheiro;
