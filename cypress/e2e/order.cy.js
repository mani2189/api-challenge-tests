describe('Orders API', () => {

    let response;

    before(() => {
        cy.request({
            method: 'GET',
            url: '/orders',
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            failOnStatusCode: false
        }).then((res) => {
            response = res;
        });
    });

    it('TC-1: Status code is 200 (success) or 401/403 (unauthorized)', () => {
        expect([200, 401, 403]).to.include(response.status);
    });

    it('TC-2: Response is array if status=200', () => {
        if (response.status === 200) {
            expect(response.body).to.be.an('array');
        }
    });

    it('TC-3: Orders array is not empty', () => {
        if (response.status === 200) {
            expect(response.body.length).to.be.greaterThan(0);
        }
    });

    it('TC-4: Each order has required fields', () => {
        if (response.status === 200) {
            response.body.forEach(order => {
                expect(order).to.have.property("id");
                expect(order).to.have.property("user");
                expect(order).to.have.property("products");
                expect(order).to.have.property("total");
            });
        }
    });

    it('TC-5: Orders belong to logged-in user', () => {
        if (response.status === 200) {
            response.body.forEach(order => {
                expect(order.user).to.eq(Cypress.env('dynamicEmail'));
            });
        }
    });

    it('TC-6: Products are not empty', () => {
        if (response.status === 200) {
            response.body.forEach(order => {
                expect(order.products.length).to.be.greaterThan(0);
            });
        }
    });

    it('TC-7: Total is greater than 0', () => {
        if (response.status === 200) {
            response.body.forEach(order => {
                expect(order.total).to.be.above(0);
            });
        }
    });

    it('TC-8: Error response has "error" field if unauthorized', () => {
        if (response.status === 401 || response.status === 403) {
            expect(response.body).to.have.property("error");
        }
    });

});
