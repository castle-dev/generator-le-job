import Promise from 'ts-promise';

class <%= pascalCaseJobClassName %> {
  constructor (private jobService) {
  }

  public run (job:Object, complete:()=>void): Promise<any> {
    function perform<%= pascalCaseJobClassName %>() {
      return Promise.resolve();
    }
    return this.jobService.handleJob(job, complete, perform<%= pascalCaseJobClassName %>);
  }
}

module.exports = <%= pascalCaseJobClassName %>;
