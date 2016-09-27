import Promise from 'ts-promise';

class <%= pascalCaseJobClassName %> {
  constructor (private jobService) {
  }

  public run (job:any, complete:()=>void): Promise<any> {
    return this.jobService.handleJob(job, complete,(job)=>{
      return this.perform<%= pascalCaseJobClassName %>(job);
    });
  }

  private perform<%= pascalCaseJobClassName %>(job:any):Promise<any> {
    return Promise.resolve(job);
  }
}

module.exports = <%= pascalCaseJobClassName %>;
