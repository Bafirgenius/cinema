function formatRupiah(price) {
    return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},00`;
}

module.exports = formatRupiah;