import Promise from 'ts-promise';

class <%= pascalCaseJobClassName %> {
  constructor (private jobService) {
  }

  public run (job:Object, complete:()=>void): Promise<any> {
    return this.jobService.handleJob(job, complete, this.perform<%= pascalCaseJobClassName %>);
  }

  private perform<%= pascalCaseJobClassName %>(job:Object):Promise<any> {
    return Promise.resolve();
  }
}

module.exports = <%= pascalCaseJobClassName %>;
