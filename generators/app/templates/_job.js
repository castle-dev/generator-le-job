var q = require('q');
var StorageService = require('le-storage-service');
var EmailService = require('le-email-service');
var FailedJobHandler = require('../failed-job-handler.js');

<%= pascalCaseJobClassName %> = function(storageService, emailService) {
  if (!storageService || !(storageService instanceof StorageService)) {
    throw new Error('Storage service required required to create <%= camelCaseJobClassName %>');
  }
  if (!emailService || !(emailService instanceof EmailService)) {
    throw new Error('Email service required to create <%= camelCaseJobClassName %>');
  }
  var failedJobHandler = new FailedJobHandler(emailService);

  this.run = function(job, complete) {
    return storageService.fetchRecord()
      .then(function() {
        complete();
      }, function(err) {
        failedJobHandler.handleFailedJob(job, err, complete)
      });
  }
}

module.exports = <%= pascalCaseJobClassName %> ;