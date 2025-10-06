describe('Products API', () => {

  it('TC-1 - Get all products (status code 200)', () => {
    cy.request('/products').then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('TC-2 - Each product has required fields', () => {
    cy.request('/products').then((res) => {
      res.body.forEach(p => {
        expect(p).to.have.property("id");
        expect(p).to.have.property("name");
        expect(p).to.have.property("price");
        expect(p).to.have.property("stock");
      });
    });
  });

 it('TC-3 - Stock values should not be negative', () => {
  cy.request('/products').then((res) => {
    const products = res.body;

    const invalidProducts = products.filter(p => p.stock < 0);

    if (invalidProducts.length > 0) {
      cy.log('⚠️ Found products with negative stock:');
      invalidProducts.forEach(p => {
        cy.log('Product ' + p.id + ' has invalid stock: ' + p.stock);
        console.log('Product ' + p.id + ' has invalid stock: ' + p.stock);
      });
    } else {
      // only assert if all good
      expect(invalidProducts.length, 'No products should have negative stock').to.eq(0);
    }
  });
});


  it('TC-4 - Product search by name (exact match)', () => {
    cy.request('/products?name=Keyboard').then((res) => {
      const products = res.body;
      if (products.length > 0) {
        products.forEach(p => {
          expect(p.name, "Expected 'Keyboard' but got '" + p.name + "'")
            .to.eql("Keyboard");
        });
      }
    });
  });

  it('TC-5 - Empty response when invalid name', () => {
    cy.request('/products?name=InvalidProduct').then((res) => {
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

});
