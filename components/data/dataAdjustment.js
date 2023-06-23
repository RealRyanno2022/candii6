const BrandData = require('./BrandData.tsx');

const updatedBrandData = BrandData.map((product, index) => {
  if ((index + 1) % 5 === 3) {
    return { ...product, type: 'juice' };
  }
  return product;
});

console.log(updatedBrandData);

module.exports = updatedBrandData;

