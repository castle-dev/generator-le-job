var <%= pascalCaseJobClassName %> = require('../../../app/jobs/<%= paramCaseJobClassName %>.js');
var q = require('q');
var StorageService = require('le-storage-service');
var EmailService = require('le-email-service');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

var mockStorageService;
var mockEmailService;
var mockJoinedData;

describe('<%= pascalCaseJobClassName %>', function() {
  beforeEach(function() {
    var storageServicePrototype = StorageService.prototype;
    StorageService = function() {};
    StorageService.prototype = storageServicePrototype;
    mockStorageService = new StorageService();
    mockJoinedData = {};
    var mockRecord = {};
    mockRecord.join = sinon.stub().returns(q.when(mockJoinedData))
    mockStorageService.fetchRecord = sinon.stub().returns(q.when(mockRecord));

    var emailServicePrototype = EmailService.prototype;
    EmailService = function() {};
    EmailService.prototype = emailServicePrototype;
    mockEmailService = new EmailService();

  });

  it('should exist', function() {
    expect( <%= pascalCaseJobClassName %> ).to.be.ok;
  });

  it('should require a storage service', function() {
    expect(function() {
      new <%= pascalCaseJobClassName %> ()
    }).to.throw('Storage service required');
    expect(function() {
      var fakeStorageService = {};
      new <%= pascalCaseJobClassName %> (fakeStorageService)
    }).to.throw('Storage service required');
    expect(function() {
      new <%= pascalCaseJobClassName %> (mockStorageService);
    }).to.not.throw('Storage service required');
  });

  it('should require an email service', function() {
    expect(function() {
      new <%= pascalCaseJobClassName %> (mockStorageService)
    }).to.throw('Email service required');
    expect(function() {
      var fakeEmailService = {};
      new <%= pascalCaseJobClassName %> (mockStorageService, fakeEmailService)
    }).to.throw('Email service required');
    expect(function() {
      new <%= pascalCaseJobClassName %> (mockStorageService, mockEmailService)
    }).to.not.throw();
  });

  it('should have a run method', function() {
    var <%= camelCaseJobClassName %> = new <%= pascalCaseJobClassName %> (mockStorageService, mockEmailService);
    expect( <%= camelCaseJobClassName %> .run).to.be.a('function');
  });
});