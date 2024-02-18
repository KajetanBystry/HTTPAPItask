describe('header tests', () => {
    
    const request = {
        url: 'https://httpbin.org/headers',
        headers: {
          "customHeader": "true",
          "User-Agent": "My-test-user" 
        },
        failOnStatus: false
    }

    it('check user-agent header', () =>{
      cy.request(request).then(response => {
        const currentStatus = response.status;
        const expectedStatus = 200
        const userAgentValue = response.requestHeaders['User-Agent']
        assert.equal("My-test-user", userAgentValue)
        assert.equal(expectedStatus, currentStatus);
        assert.isTrue(response.duration <= 1000)
      })
    })

    it('check custom header is set', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status);
        assert.equal("true", response.requestHeaders.customHeader);
        assert.isTrue(response.duration <= 1000)
      })
    })
  })

  describe('json body tests', () => {
    
    const request = {
        method: 'GET',
        url: 'https://httpbin.org/json',
        failOnStatus: false
    }

    it('check if author', () =>{
      cy.request(request).then(response => {
        assert.equal("Yours Truly", response.body.slideshow.author)
        assert.isTrue(response.duration <= 1000)
      })
    })
  })

  describe('test random id', () => {
    it('test random ids', () => {
    const randomId = getRandomInt(10000000);
    const request = {
        method: 'GET',
        url: 'https://httpbin.org/headers',
        id: randomId,
        failOnStatus: false
    }

      cy.request(request).then(response => {
        assert.isTrue(response.status == 200)
      })
    })
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }