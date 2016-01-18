var q = require('q');
var StorageService = require('le-storage-service');
var EmailService = require('le-email-service');
var JobService = require('../services/job-service.js');

<%= pascalCaseJobClassName %> = function(storageService, emailService) {
  if (!storageService || !(storageService instanceof StorageService)) {
    throw new Error('Storage service required required to create <%= camelCaseJobClassName %>');
  }
  if (!emailService || !(emailService instanceof EmailService)) {
    throw new Error('Email service required to create <%= camelCaseJobClassName %>');
  }
  var jobService = new JobService(emailService);

  this.run = function(job, complete) {
    return jobService.handleJob(job, complete, perform<%= pascalCaseJobClassName %>);
  }

  function perform<%= pascalCaseJobClassName %>(job) {
    return q.resolve();
  }
}

module.exports = <%= pascalCaseJobClassName %> ;
