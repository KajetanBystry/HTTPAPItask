describe('httpbin tests', () => {
  const request = {
      method: 'PATCH',
      url: 'https://httpbin.org/patch',
      failOnStatus: false
  }

  it('response code should be 200', () => {
    cy.request(request).then(response => {
      const currentStatus = response.status;
      const expectedStatus = 200

      assert.equal(expectedStatus, currentStatus);
    })
  })

  it('test duration', () => {
    cy.request(request).then(response => {
      assert.isTrue(response.duration <= 500)
    })
  })
})