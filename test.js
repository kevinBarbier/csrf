
var assert = require('assert')

var csrf = require('./')()

describe('CSRF Tokens', function () {
  var secret

  describe('.secret()', function () {
    it('should return a string', function () {
      secret = csrf.secret()
      assert.equal('string', typeof secret)
    })

    it('should create a secret asynchronously', function (done) {
      csrf.secret(function (err, secret) {
        assert.ifError(err)
        assert.equal('string', typeof secret)
        done()
      })
    })
  })

  describe('.create()', function () {
    it('should create a token synchronously', function () {
      var token = csrf.create(secret)
      assert.equal('string', typeof token)
      assert(~token.indexOf('-'))
    })
  })

  describe('.verify()', function () {
    it('should return `true` with valid tokens', function () {
      var token = csrf.create(secret)
      assert(csrf.verify(secret, token))
    })

    it('should return `false` with invalid tokens', function () {
      var token = csrf.create(secret)
      assert(!csrf.verify(csrf.secret(), token))
      assert(!csrf.verify('asdfasdfasdf', token))
    })
  })
})
