describe('httpbin tests', () => {
  const request = {
      method: 'POST',
      url: 'https://httpbin.org/post',
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
      cy.log(response.duration)
    })
  })
})

describe('check post', () => {
  const bodyData = {
    freeform: "freeform"
  };

  const request = {
      method: 'POST',
      url: 'https://httpbin.org/post',
      body: bodyData,
      failOnStatus: false
  }

  it('check if freeform', () => {
    cy.request(request).then(response => {
      const currentStatus = response.status;
      const expectedStatus = 200
      const responseData = JSON.parse(response.body.data)
      assert.notStrictEqual(bodyData, response.body.data)
      assert.equal(bodyData.freeform, responseData.freeform);
      assert.equal(expectedStatus, currentStatus);
      assert.isTrue(response.duration <= 1000)
    })
  })
})